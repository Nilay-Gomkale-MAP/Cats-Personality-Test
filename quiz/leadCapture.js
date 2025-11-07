document.getElementById('submitLead').addEventListener('click', async function() {
  const endpoint = 'https://script.google.com/macros/s/AKfycbxc59TziX6bZE7QhuPSkN4vrvOKbOvfiJ12hHcXXSFvNnfF2XtP4QCh70f0N7PRH1lkFw/exec'; // Paste your copied URL here

  const fname = document.getElementById('fname').value.trim();
  const email = document.getElementById('email').value.trim();
  const gdpr = document.getElementById('gdprConsent').checked;
  const comms = document.getElementById('commsConsent').checked;

  if (!email) {
    alert('Please enter your email.');
    return;
  }

  if (!gdpr) {
    alert('You must consent to data storage.');
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
  fetch(endpoint, {
    method: 'POST',
    body: params
  })
  .then(() => alert('Thanks! Your info was saved.'))
  .catch(() => alert('Something went wrong — please try again.'));
});
