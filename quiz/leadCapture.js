(function () {
  const SITE_KEY = '6Lcw6wcsAAAAAGNxy9LRS-6wbSWPg9M8c40N42mS';                 // <- reCAPTCHA site key (public)
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbzd67x0G-hly4Er97YfQ2_khZsjb_sr6C844VrH0CARblbO05kS33uma_WwU8yrLy7wMg/exec';            // <- paste your Apps Script /exec URL

  const submitBtn = document.getElementById('submitLead');
  const showMsg = (text, isErr = true) => {
    const el = document.querySelector('#leadStep .errorMsg');
    if (el) {
      el.style.display = 'block';
      el.classList.toggle('success', !isErr);
      el.textContent = text;
    } else if (isErr) {
      alert(text);
    } else {
      console.log(text);
    }
  };

  if (!submitBtn) {
    console.error('Submit button not found (#submitLead)');
    return;
  }

  submitBtn.addEventListener('click', async function () {
    // read fields
    const fname = (document.getElementById('fname')?.value || '').trim();
    const email = (document.getElementById('email')?.value || '').trim();
    const gdpr = !!document.getElementById('gdprConsent')?.checked;
    const comms = !!document.getElementById('commsConsent')?.checked;

    // basic validation
    if (!email) return showMsg('Please enter your email address.');
    if (!/\S+@\S+\.\S+/.test(email)) return showMsg('Please enter a valid email address.');
    if (!gdpr) return showMsg('You must consent to data storage.');

    // UI lock
    const prevText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-disabled', 'true');
    submitBtn.innerText = 'Sending…';

    try {
      // Ensure grecaptcha loaded then get token
      await new Promise(resolve => grecaptcha.ready(resolve));
      const token = await grecaptcha.execute(SITE_KEY, { action: 'submit' });

      // Build FormData (do NOT set Content-Type: browser will set it)
      const form = new FormData();
      form.append('first_name', fname);
      form.append('email', email);
      form.append('gdpr_consent', gdpr ? 'true' : 'false');
      form.append('comms_consent', comms ? 'true' : 'false');
      form.append('source', 'meowseum-quiz');
      form.append('quiz_id', 'meowseum-v1');
      form.append('g_recaptcha_response', token);
      form.append('ua', navigator.userAgent);

      // Send POST (FormData => avoids preflight)
      const resp = await fetch(ENDPOINT, {
        method: 'POST',
        body: form
      });

      // Attempt to parse JSON response
      const json = await resp.json(); // will fail if server response blocked by CORS
      if (resp.ok && json.ok) {
        showMsg(json.deduped ? "You're already registered — thanks!" : 'Thanks — your info was saved.', false);
        // optional: clear form
        document.getElementById('email').value = '';
        document.getElementById('fname').value = '';
        document.getElementById('gdprConsent').checked = false;
        document.getElementById('commsConsent').checked = false;
        submitBtn.innerText = 'Submitted';
        submitBtn.disabled = true;
      } else {
        console.error('Server returned error:', json);
        showMsg(json.error || 'Submission failed — please try again.');
        submitBtn.innerText = prevText;
        submitBtn.disabled = false;
      }
    } catch (err) {
      console.error('Lead submit failed', err);
      // Typical: CORS response blocked (no Access-Control-Allow-Origin) or network error
      showMsg('There was a problem submitting your signup. Please try again.');
      submitBtn.innerText = prevText;
      submitBtn.disabled = false;
    }
  });
})();