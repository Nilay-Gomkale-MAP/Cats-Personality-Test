const quizData = [
  {
    q: "This prolific Bengali artist, inspired by Kalighat Patua style, painted over 20,000 artworks in their lifetime—nearly 10 daily! What is their name?",
    options: [
      { text: "Jogen Chowdhury", value: "lazy", img: "", correct: false },
      { text: "Jamini Roy", value: "thief", img: "", correct: true },
      { text: "Bhupen Khakhar", value: "fierce", img: "", correct: false },
      { text: "Arpita Singh", value: "political", img: "", correct: false }
    ]
  },
  {
    q: "What small everyday item featuring sketches of cats, helped bring art to ordinary people?",
    options: [
      { text: "Perfumes", value: "lazy", img: "", correct: false },
      { text: "Vases", value: "thief", img: "", correct: false },
      { text: "Matchboxes", value: "fierce", img: "", correct: true },
      { text: "Soap bars", value: "political", img: "", correct: false }
    ]
  },
  {
    q: "Too stunned to talk! What is the common phrase used to describe this?",
    options: [
      { text: "Cat got your tongue", value: "lazy", img: "", correct: true },
      { text: "Cats out of the bag", value: "thief", img: "", correct: false },
      { text: "Curiosity killed the cat", value: "fierce", img: "", correct: false },
      { text: "Cats have nine lives", value: "political", img: "", correct: false }
    ]
  },
  {
    q: "Who is the artist?",
    options: [
      { text: "Meera Mukherjee", value: "lazy", img: "", correct: false },
      { text: "Bhuri Bai", value: "thief", img: "", correct: false },
      { text: "Arpita Singh", value: "fierce", img: "", correct: true },
      { text: "Shilpa Gupta", value: "political", img: "", correct: false }
    ]
  },
  {
    q: "This artwork is by Anand Singh Shyam, a renowned folk artist from Central India. Which art form is he famous for?",
    options: [
      { text: "Madhubani", value: "lazy", img: "", correct: false },
      { text: "Gond", value: "thief", img: "", correct: true },
      { text: "Kalamkari", value: "fierce", img: "", correct: false },
      { text: "Warli", value: "political", img: "", correct: false }
    ]
  },
  {
    q: "This bronze lion was made using Dhokra casting, an ancient lost-wax technique. Dhokra artisans are mostly found in which Indian states?",
    options: [
      { text: "Punjab, Haryana, Rajasthan", value: "lazy", img: "", correct: false },
      { text: "Kerala, Tamil Nadu, Karnataka", value: "thief", img: "", correct: false },
      { text: "Chhattisgarh, West Bengal, Odisha", value: "fierce", img: "", correct: true },
      { text: "Gujarat, Maharashtra, Goa", value: "political", img: "", correct: false }
    ]
  },
  {
    q: "Which Indian goddess is usually depicted along with a big cat?",
    options: [
      { text: "Saraswathi", value: "lazy", img: "", correct: false },
      { text: "Ganga", value: "thief", img: "", correct: false },
      { text: "Bramhini", value: "fierce", img: "", correct: false },
      { text: "Durga", value: "political", img: "", correct: true }
    ]
  },
  {
    q: "Big cats embody strength, courage, and royalty. In \"The Jungle Book,\" the friendly guardian Bagheera is a: ",
    options: [
      { text: "Tiger", value: "lazy", img: "", correct: false },
      { text: "Leopard", value: "thief", img: "", correct: false },
      { text: "Lion", value: "fierce", img: "", correct: false },
      { text: "Panther", value: "political", img: "", correct: true }
    ]
  },
  {
    q: "Below is a silver gelatin print of a black cat wearing a bowtie, a photographic process using light-sensitive paper and chemicals. Which year did this method originate?",
    options: [
      { text: "1870", value: "lazy", img: "", correct: true },
      { text: "1990", value: "thief", img: "", correct: false },
      { text: "1650", value: "fierce", img: "", correct: false },
      { text: "2005", value: "political", img: "", correct: false }
    ]
  },
  {
    q: "The book \"The Indian Cat: Stories, Paintings, Poetry, and Proverbs\" was written by which art historian?",
    options: [
      { text: "Chandana Hore", value: "lazy", img: "", correct: false },
      { text: "B.N. Goswamy", value: "thief", img: "", correct: true },
      { text: "Kavita Singh", value: "fierce", img: "", correct: false },
      { text: "KG Subramanian", value: "political", img: "", correct: false }
    ]
  }
];

// New descriptions for score-based archetypes
const scoreArchetypes = [
  { name: 'Mischievous Cat', range: [0,2], desc: "🐾 Mischievous Cat — playful, unpredictable, and full of surprises." },
  { name: 'Lazy Cat', range: [3,5], desc: "😴 Lazy Cat — relaxed, unhurried, and content with cozy comforts." },
  { name: 'Fierce Cat', range: [6,8], desc: "🔥 Fierce Cat — bold, determined, and brave when it matters." },
  { name: 'Scholarly Cat', range: [9,10], desc: "📚 Scholarly Cat — knowledgeable, curious, and thoughtful." }
];

const questionsContainer = document.getElementById("questionsContainer");

// Render questions; attach data-correct attribute to inputs for scoring
quizData.forEach((qObj, i) => {
  const qDiv = document.createElement("div");
  qDiv.classList.add("questionBox");
  // ${i + 1}. ${qObj.q}
  qDiv.innerHTML = `<strong>${qObj.q}</strong>
    <div class="optionsGrid">
      ${qObj.options.map((opt, idx) => `
        <input type="radio" id="q${i+1}_${idx}" name="q${i+1}" value="${opt.value}" data-correct="${opt.correct ? '1' : '0'}">
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

// New tally: count correct answers (score out of quizData.length)
function tallyAnswers() {
  let correctCount = 0;
  for (let i = 1; i <= quizData.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.dataset && selected.dataset.correct === '1') correctCount++;
  }
  return correctCount;
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
  const score = tallyAnswers();

  // Find archetype by score range
  const archetype = scoreArchetypes.find(a => score >= a.range[0] && score <= a.range[1]);
  const name = archetype ? archetype.name : 'Unknown Cat';
  const desc = archetype ? archetype.desc : '';

  resultBox.innerHTML = `<h3>Your Score: ${score} / ${quizData.length}</h3><h4>${name}</h4><p>${desc}</p>`;

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