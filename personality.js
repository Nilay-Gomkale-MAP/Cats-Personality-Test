const quizData = [
    {
      q: "What’s your ideal weekend activity?",
      options: [
        { text: "Nap in the sun", value: "lazy", img: "" },
        { text: "Sneak snacks", value: "thief", img: "" },
        { text: "Climb and explore", value: "fierce", img: "" },
        { text: "Host a dinner party", value: "political", img: "" }
      ]
    },
    {
      q: "Someone takes your favorite spot. You...",
      options: [
        { text: "Find another cozy spot", value: "lazy", img: "" },
        { text: "Wait and reclaim it stealthily", value: "thief", img: "" },
        { text: "Stare them down", value: "fierce", img: "" },
        { text: "Charm them into moving", value: "political", img: "" }
      ]
    },
    {
      q: "Your dream snack is...",
      options: [
        { text: "Something sweet & soft", value: "lazy", img: "" },
        { text: "Anything I can 'borrow'", value: "thief", img: "" },
        { text: "Meat, obviously", value: "fierce", img: "" },
        { text: "A fancy treat", value: "political", img: "" }
      ]
    },
    {
      q: "Your favorite time of day?",
      options: [
        { text: "Morning naps", value: "lazy", img: "" },
        { text: "Midnight mischief", value: "thief", img: "" },
        { text: "Golden hour adventures", value: "fierce", img: "" },
        { text: "Early evening networking", value: "political", img: "" }
      ]
    },
    {
      q: "Your best quality?",
      options: [
        { text: "Calm and chill", value: "lazy", img: "" },
        { text: "Clever and sneaky", value: "thief", img: "" },
        { text: "Brave and bold", value: "fierce", img: "" },
        { text: "Charming and strategic", value: "political", img: "" }
      ]
    },
    {
      q: "How do you make friends?",
      options: [
        { text: "They come to me", value: "lazy", img: "" },
        { text: "Through gifts (sometimes stolen)", value: "thief", img: "" },
        { text: "Through mutual respect", value: "fierce", img: "" },
        { text: "Through smooth talk", value: "political", img: "" }
      ]
    },
    {
      q: "Pick your dream home:",
      options: [
        { text: "Soft couch palace", value: "lazy", img: "" },
        { text: "Cozy secret hideout", value: "thief", img: "" },
        { text: "Mountain cave with a view", value: "fierce", img: "" },
        { text: "Grand villa with guests", value: "political", img: "" }
      ]
    }
  ];

  const questionsContainer = document.getElementById("questionsContainer");

  quizData.forEach((qObj, i) => {
    const qDiv = document.createElement("div");
    qDiv.classList.add("question");
    qDiv.innerHTML = `<strong>${i + 1}. ${qObj.q}</strong>
      <div class="options">
        ${qObj.options.map((opt, idx) => `
          <input type="radio" id="q${i+1}_${idx}" name="q${i+1}" value="${opt.value}">
          <label for="q${i+1}_${idx}">
            ${opt.img ? `<img src="${opt.img}" alt="" class="option-img">` : ""}
            ${opt.text}
          </label>
        `).join('')}
      </div>`;
    questionsContainer.appendChild(qDiv);
  });

  const resultBox = document.getElementById('result');
  const errorMsg = document.getElementById('errorMsg');

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
    for (let i = 1; i <= quizData.length; i++) {
      const v = data.get('q' + i);
      if (v && counts[v] !== undefined) counts[v]++;
    }
    return counts;
  }

  function validateQuiz() {
    for (let i = 1; i <= quizData.length; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (!selected) {
        errorMsg.innerText = "Please answer all questions before proceeding.";
        errorMsg.style.display = "block";
        return false;
      }
    }
    errorMsg.style.display = "none";
    return true;
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
    if (!validateQuiz()) return;
    const email = document.getElementById('email').value.trim();
    if (!email) {
      errorMsg.innerText = "Please enter your email or skip.";
      errorMsg.style.display = "block";
      return;
    }
    errorMsg.style.display = "none";
    showResult();
  });

  document.getElementById('skipLead').addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateQuiz()) return;
    errorMsg.style.display = "none";
    showResult();
  });