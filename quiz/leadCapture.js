document.getElementById('submitLead').addEventListener('click', async function() {
  const endpoint = 'https://script.google.com/macros/s/AKfycbxc59TziX6bZE7QhuPSkN4vrvOKbOvfiJ12hHcXXSFvNnfF2XtP4QCh70f0N7PRH1lkFw/exec'; // Paste your copied URL here

  const fname = document.getElementById('fname').value.trim();
  const email = document.getElementById('email').value.trim();
  const gdpr = document.getElementById('gdprConsent').checked;
  const comms = document.getElementById('commsConsent').checked;
  // Scope the message element to the lead step so we don't accidentally
  // update the quiz/result message container earlier in the DOM.
  const errorMsg = document.querySelector('#leadStep .errorMsg');
  if (errorMsg) {
    errorMsg.style.display = 'none';
    errorMsg.classList.remove('success');
    errorMsg.innerText = '';
  }

  if (!email) {
    if (errorMsg) {
      errorMsg.innerText = 'Please enter your email address';
      errorMsg.style.display = 'block';
    }
    return;
  }

  // basic email format sanity check
  const emailOk = /\S+@\S+\.\S+/.test(email);
  if (!emailOk) {
    if (errorMsg) {
      errorMsg.innerText = 'Please enter a valid email address';
      errorMsg.style.display = 'block';
    }
    return;
  }

  if (!gdpr) {
    if (errorMsg) {
      errorMsg.innerText = 'You must consent to data storage.';
      errorMsg.style.display = 'block';
    }
    return;
  }

  // Build data to send
  const params = new URLSearchParams();
  params.append('first_name', fname);
  params.append('email', email);
  params.append('gdpr_consent', gdpr);
  params.append('comms_consent', comms);
  params.append('source', 'meowseum-quiz');
  params.append('ua', navigator.userAgent);

  // Send data to Google Sheet
  const submitBtn = document.getElementById('submitLead');
  submitBtn.disabled = true;
  submitBtn.setAttribute('aria-disabled', 'true');
  const prevText = submitBtn.innerText;
  submitBtn.innerText = 'Sending...';

  fetch(endpoint, {
    method: 'POST',
    body: params
  })
  .then((res) => {
    // treat non-2xx as an error
    if (!res.ok) throw new Error('Network response was not ok');
    // show success message in the lead form (scoped)
    if (errorMsg) {
      errorMsg.classList.add('success');
      errorMsg.innerText = 'Thanks — your info was saved.';
      errorMsg.style.display = 'block';
    }
    submitBtn.innerText = 'Submitted';
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-disabled', 'true');
    // optionally collapse the lead form after a moment
    setTimeout(() => {
      const leadStep = document.getElementById('leadStep');
      if (leadStep) leadStep.style.opacity = '0.98';
    }, 400);
  })
  .catch((err) => {
    console.error('Lead submit failed', err);
    errorMsg.classList.remove('success');
    errorMsg.innerText = 'There was a problem submitting your signup. Please try again.';
    errorMsg.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.innerText = prevText;
  });
});
