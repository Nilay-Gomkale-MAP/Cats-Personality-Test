const resultBox = document.getElementById('result');

  const descriptions = {
    lazy: "😴 You’re the Lazy Cat — calm, cozy, and unbothered by chaos. Life is a nap between snacks.",
    thief: "🕵️ You’re the Thief Cat — mischievous, clever, and always one paw ahead of everyone.",
    fierce: "🔥 You’re the Fierce Cat — brave, loyal, and unstoppable when you set your mind to something.",
    political: "🎩 You’re the Political Cat — charming, sociable, and always working the room with grace."
  };

  function tallyAnswers() {
    const form = document.getElementById('quizForm');
    const data = new FormData(form);
    const counts = { lazy: 0, thief: 0, fierce: 0, political: 0 };
    for (let i = 1; i <= 7; i++) {
      const v = data.get('q' + i);
      if (v && counts[v] !== undefined) counts[v]++;
    }
    return counts;
  }

  function showResult() {
    const counts = tallyAnswers();
    const entries = Object.entries(counts);
    entries.sort((a, b) => b[1] - a[1]);
    const topScore = entries[0][1];
    const topCats = entries.filter(e => e[1] === topScore).map(e => e[0]);
    const chosen = topCats[Math.floor(Math.random() * topCats.length)];
    resultBox.innerHTML = `<h3>Your Cat Type: ${chosen.toUpperCase()}</h3><p>${descriptions[chosen]}</p><p class="muted">Scores: ${JSON.stringify(counts)}</p>`;
    resultBox.style.display = "block";
    resultBox.scrollIntoView({ behavior: "smooth" });
  }

  document.getElementById('submitLead').addEventListener('click', () => {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!email) {
      alert("Please enter your email or skip.");
      return;
    }
    console.log("Lead captured:", { name, email }); // Replace with API call later
    showResult();
  });

  document.getElementById('skipLead').addEventListener('click', (e) => {
    e.preventDefault();
    showResult();
  });