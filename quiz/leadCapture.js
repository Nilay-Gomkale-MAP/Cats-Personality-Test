(async function() {
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwvcAn55Spxz3BVEeDPE-QyB3iUdba0LGMf-ia-1pXr8xixIHnbZQ4Jnqw8RZ6DHK0xNA/exec'; // <-- replace with your Web App URL (paste exactly)
  const submitBtn = document.getElementById('submitLead');
  const emailInput = document.getElementById('email');
  const fnameInput = document.getElementById('fname');
  const gdprEl = document.getElementById('gdprConsent');
  const commsEl = document.getElementById('commsConsent');
  const errorBox = document.querySelector('#leadStep .errorMsg');

  function showMsg(text, isError = true) {
    if (errorBox) {
      errorBox.textContent = text;
      errorBox.style.color = isError ? 'crimson' : 'green';
    } else {
      alert(text);
    }
  }

  submitBtn.addEventListener('click', async function () {
    showMsg(''); // clear
    const email = (emailInput.value || '').trim();
    const firstName = (fnameInput.value || '').trim();
    const gdpr = !!gdprEl.checked;
    const comms = !!commsEl.checked;

    // Front-end validation
    if (!email) {
      showMsg('Please enter your email.');
      return;
    }
    // Simple email regex; backend will validate again
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      showMsg('Please enter a valid email address.');
      return;
    }
    if (!gdpr) {
      showMsg('Please accept the privacy policy to continue.');
      return;
    }

    const payload = {
      first_name: firstName,
      email: email,
      comms_consent: comms,
      gdpr_consent: gdpr,
      source: 'meowseum-quiz',
      quiz_id: 'meowseum-v1'
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    try {
      const resp = await fetch(ENDPOINT + '?ua=' + encodeURIComponent(navigator.userAgent), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await resp.json();
      if (json.ok) {
        const message = json.deduped ? 'You’re already registered — thanks!' : 'Thanks! Your details have been recorded.';
        showMsg(message, false);
        // Optionally clear form:
        emailInput.value = '';
        fnameInput.value = '';
        gdprEl.checked = false;
        commsEl.checked = false;
      } else {
        showMsg('Submission failed: ' + (json.error || 'Unknown error'));
      }
    } catch (err) {
      showMsg('Network error — please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  });
})();