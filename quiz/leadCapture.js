// Script function for lead generation data funneling to Google Sheets API
// Append/replace your submit handler with this version that includes reCAPTCHA v3
(function () {
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxWOlzefIQB4jujwlnbkTobUG95qoRcCpiVcmQJYFh1mJV4I8eJ3ZtJXrleKnUKSOjfDQ/exec';           // <-- paste your Apps Script /exec URL here
  const RECAPTCHA_KEY = '6LcI3AcsAAAAAMVNpFDJhAwM21aaf7mosgm-UzB7'; // <-- paste your reCAPTCHA v3 site key here

  const submitBtn = document.getElementById('submitLead');

  async function showMsg(text, isError = true) {
    const errorMsg = document.querySelector('#leadStep .errorMsg');
    if (errorMsg) {
      errorMsg.style.display = 'block';
      errorMsg.classList.toggle('success', !isError);
      errorMsg.innerText = text;
    } else {
      if (isError) alert(text); else console.log(text);
    }
  }

  submitBtn.addEventListener('click', async function () {
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const gdpr = document.getElementById('gdprConsent').checked;
    const comms = document.getElementById('commsConsent').checked;

    // Basic frontend validation
    if (!email) return showMsg('Please enter your email address.');
    if (!/\S+@\S+\.\S+/.test(email)) return showMsg('Please enter a valid email address.');
    if (!gdpr) return showMsg('You must consent to data storage.');

    // Disable UI
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-disabled', 'true');
    const prevText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';

    try {
      // Get reCAPTCHA v3 token
      const token = await grecaptcha.execute(RECAPTCHA_KEY, { action: 'submit' });

      // Build url-encoded body to avoid CORS preflight
      const params = new URLSearchParams();
      params.append('first_name', fname);
      params.append('email', email);
      params.append('gdpr_consent', gdpr ? 'true' : 'false');
      params.append('comms_consent', comms ? 'true' : 'false');
      params.append('source', 'meowseum-quiz');
      params.append('quiz_id', 'meowseum-v1');
      params.append('g_recaptcha_response', token);
      params.append('ua', navigator.userAgent);

      // POST as application/x-www-form-urlencoded
      const resp = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: params.toString()
      });

      // Parse JSON response (Apps Script returns JSON)
      const json = await resp.json();

      if (resp.ok && json.ok) {
        showMsg(json.deduped ? "You're already registered — thanks!" : 'Thanks — your info was saved.', false);
        // clear form
        document.getElementById('email').value = '';
        document.getElementById('fname').value = '';
        document.getElementById('gdprConsent').checked = false;
        document.getElementById('commsConsent').checked = false;
        submitBtn.innerText = 'Submitted';
        submitBtn.disabled = true;
      } else {
        const errText = json && json.error ? json.error : 'Submission failed';
        showMsg(errText);
        submitBtn.innerText = prevText;
        submitBtn.disabled = false;
      }
    } catch (err) {
      console.error('Lead submit failed', err);
      showMsg('There was a problem submitting your signup. Please try again.');
      submitBtn.innerText = prevText;
      submitBtn.disabled = false;
    }
  });
})();