const quizData = [
  {
    q: "This prolific Bengali artist, inspired by Kalighat Patua style, painted over 20,000 artworks in their lifetime—nearly 10 daily! What is their name?",
    options: [
      { text: "Jogen Chowdhury", value: "lazy", img: "" },
      { text: "Jamini Roy", value: "thief", img: "" },
      { text: "Bhupen Khakhar", value: "fierce", img: "" },
      { text: "Arpita Singh", value: "political", img: "" }
    ]
  },
  {
    q: "What small everyday item featuring sketches of cats, helped bring art to ordinary people?",
    options: [
      { text: "Perfumes", value: "lazy", img: "" },
      { text: "Vases", value: "thief", img: "" },
      { text: "Matchboxes", value: "fierce", img: "" },
      { text: "Soap bars", value: "political", img: "" }
    ]
  },
  {
    q: "Too stunned to talk! What is the common phrase used to describe this?",
    options: [
      { text: "Cats got your tongue", value: "lazy", img: "" },
      { text: "Cats out of the bag", value: "thief", img: "" },
      { text: "Curiosity killed the cat", value: "fierce", img: "" },
      { text: "Cats have nine lives", value: "political", img: "" }
    ]
  },
  {
    q: "Who is the artist?",
    options: [
      { text: "Meera Mukherjee", value: "lazy", img: "" },
      { text: "Bhuri Bai", value: "thief", img: "" },
      { text: "Arpita Singh", value: "fierce", img: "" },
      { text: "Shilpa Gupta", value: "political", img: "" }
    ]
  },
  {
    q: "This artwork is by Anand Singh Shyam, a renowned folk artist from Central India. Which art form is he famous for?",
    options: [
      { text: "Madhubani", value: "lazy", img: "" },
      { text: "Gond", value: "thief", img: "" },
      { text: "Kalamkari", value: "fierce", img: "" },
      { text: "Warli", value: "political", img: "" }
    ]
  },
  {
    q: "This bronze lion was made using Dhokra casting, an ancient lost-wax technique. Dhokra artisans are mostly found in which Indian states?",
    options: [
      { text: "Punjab, Haryana, Rajasthan", value: "lazy", img: "" },
      { text: "Kerala, Tamil Nadu, Karnataka", value: "thief", img: "" },
      { text: "Chhattisgarh, West Bengal, Odisha", value: "fierce", img: "" },
      { text: "Gujarat, Maharashtra, Goa", value: "political", img: "" }
    ]
  },
  {
    q: "Which Indian goddess is usually depicted along with a big cat?",
    options: [
      { text: "Saraswathi", value: "lazy", img: "" },
      { text: "Ganga", value: "thief", img: "" },
      { text: "Bramhini", value: "fierce", img: "" },
      { text: "Durga", value: "political", img: "" }
    ]
  },
  {
    q: "Big cats embody strength, courage, and royalty. In \"The Jungle Book,\" the friendly guardian Bagheera is a: ",
    options: [
      { text: "Tiger", value: "lazy", img: "" },
      { text: "Leopard", value: "thief", img: "" },
      { text: "Lion", value: "fierce", img: "" },
      { text: "Panther", value: "political", img: "" }
    ]
  },
  {
    q: "Below is a silver gelatin print of a black cat wearing a bowtie, a photographic process using light-sensitive paper and chemicals. Which year did this method originate?",
    options: [
      { text: "1870", value: "lazy", img: "" },
      { text: "1990", value: "thief", img: "" },
      { text: "1650", value: "fierce", img: "" },
      { text: "2005", value: "political", img: "" }
    ]
  },
  {
    q: "The book \"The Indian Cat: Stories, Paintings, Poetry, and Proverbs\" was written by which art historian?",
    options: [
      { text: "Chandana Hore", value: "lazy", img: "" },
      { text: "B.N. Goswamy", value: "thief", img: "" },
      { text: "Kavita Singh", value: "fierce", img: "" },
      { text: "KG Subramanian", value: "political", img: "" }
    ]
  }
];

const descriptions = {
  lazy: "😴 You’re the Lazy Cat — calm, cozy, and unbothered by chaos. Life is a nap between snacks.",
  thief: "🕵️ You’re the Thief Cat — mischievous, clever, and always one paw ahead of everyone.",
  fierce: "🔥 You’re the Fierce Cat — brave, loyal, and unstoppable when you set your mind to something.",
  political: "🎩 You’re the Political Cat — charming, sociable, and always working the room with grace."
};

const questionsContainer = document.getElementById("questionsContainer");

quizData.forEach((qObj, i) => {
  const qDiv = document.createElement("div");
  qDiv.classList.add("questionBox");
  // ${i + 1}. ${qObj.q}
  qDiv.innerHTML = `<strong>${qObj.q}</strong>
    <div class="optionsGrid">
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

// Elements called via ID or class
const navBack = document.getElementById('navBack');
const restartQuiz = document.getElementById('restartQuiz');
const quizHeader = document.getElementById('quizHeader');
const leadStep = document.getElementById('leadStep');
const resultBox = document.getElementById('result');
const dividerCat = document.querySelector('.dividerCat');
const errorMsg = document.querySelector('.errorMsg');
const form = document.getElementById('quizForm');

function tallyAnswers() {
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
  resultBox.innerHTML = `<h3>Your Cat Type: ${chosen.toUpperCase()}</h3><p>${descriptions[chosen]}</p>`;

  // Display adjustments
  resultBox.style.display = "block";
  quizHeader.style.display = "none";
  form.style.display = "none";
  leadStep.style.display = "flex";
  navBack.style.display = "none";
  restartQuiz.style.display = "flex";
  dividerCat.style.display = "block";
  resultBox.scrollIntoView({ behavior: "smooth" });
}

// Event Listeners
document.getElementById('getResult').addEventListener('click', () => {
  if (!validateQuiz()) return;
  errorMsg.style.display = "none";
  showResult();
});

document.getElementById('restartQuiz').addEventListener('click', () => {
  location.reload();
});

document.getElementById('submitLead').addEventListener('click', () => {
  if (!validateQuiz()) return;
  const email = document.getElementById('email').value.trim();
  if (!email) {
    errorMsg.innerText = "Please enter your email or skip.";
    errorMsg.style.display = "block";
    return;
  }
  errorMsg.style.display = "none";
});

// document.getElementById('skipLead').addEventListener('click', (e) => {
//   e.preventDefault();
//   if (!validateQuiz()) return;
//   errorMsg.style.display = "none";
//   showResult();
// });