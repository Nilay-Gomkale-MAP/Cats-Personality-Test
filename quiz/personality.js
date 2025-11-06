const quizData = [
  {
    q: "This prolific Bengali artist, inspired by Kalighat Patua style, painted over 20,000 artworks in their lifetime—nearly 10 daily! What is their name?",
    image: "",
    options: [
      { text: "Jogen Chowdhury", correct: false },
      { text: "Jamini Roy", correct: true },
      { text: "Bhupen Khakhar", correct: false },
      { text: "Arpita Singh", correct: false }
    ]
  },
  {
    q: "What small everyday items featuring cats helped bring art to the masses?",
    image: "",
    options: [
      { text: "Perfumes", correct: false },
      { text: "Vases", correct: false },
      { text: "Matchboxes", correct: true },
      { text: "Soap bars", correct: false }
    ]
  },
  {
    q: "Too stunned to talk! What is the common phrase used to describe this?",
    image: "",
    options: [
      { text: "Cat got your tongue", correct: true },
      { text: "Cats out of the bag", correct: false },
      { text: "Curiosity killed the cat", correct: false },
      { text: "Cats have nine lives", correct: false }
    ]
  },
  {
    q: "This work featuring cats and women is by a modernist painter known for her canvases that blend personal memory with social commentary. Who is she?",
    image: "../artwork-images/Q4-img.png",
    options: [
      { text: "Meera Mukherjee", correct: false },
      { text: "Bhuri Bai", correct: false },
      { text: "Arpita Singh", correct: true },
      { text: "Shilpa Gupta", correct: false }
    ]
  },
  {
    q: "This artwork is by Anand Singh Shyam from Madhya Pradesh.. Which art form is he known for?",
    image: "../artwork-images/Q5-img.png",
    options: [
      { text: "Madhubani", correct: false },
      { text: "Gond", correct: true },
      { text: "Kalamkari", correct: false },
      { text: "Warli", correct: false }
    ]
  },
  {
    q: "This bronze lion is a Dhokra sculpture, created using an ancient lost-wax technique. Where was this created?",
    image: "../artwork-images/Q6-img.png",
    options: [
      { text: "Punjab", correct: false },
      { text: "Kerala", correct: false },
      { text: "Chhattisgarh", correct: true },
      { text: "Gujarat", correct: false }
    ]
  },
  {
    q: "Which Indian goddess is usually depicted along with a big cat?",
    image: "",
    options: [
      { text: "Saraswati", correct: false },
      { text: "Ganga", correct: false },
      { text: "Bramhini", correct: false },
      { text: "Durga", correct: true }
    ]
  },
  {
    q: "Big cats embody strength, courage, and royalty. In \"The Jungle Book,\" the friendly guardian Bagheera is a:",
    image: "",
    options: [
      { text: "Tiger", correct: false },
      { text: "Leopard", correct: false },
      { text: "Lion", correct: false },
      { text: "Panther", correct: true }
    ]
  },
  {
    q: "The postcard below is a silver gelatin print, a photographic process using light-sensitive paper and chemicals. In which time period was the silver gelatin process first developed?",
    image: "../artwork-images/Q9-img.png",
    options: [
      { text: "1870s", correct: true },
      { text: "1990s", correct: false },
      { text: "1650s", correct: false },
      { text: "2000s", correct: false }
    ]
  },
  {
    q: "The book \"The Indian Cat: Stories, Paintings, Poetry, and Proverbs\" was written by which art historian?",
    image: "",
    options: [
      { text: "Chandana Hore", correct: false },
      { text: "Prof. B.N. Goswamy ", correct: true },
      { text: "Dr. Kavita Singh", correct: false },
      { text: "KG Subramanian", correct: false }
    ]
  }
];

// New descriptions for score-based archetypes
const scoreArchetypes = [
  {
    name: 'Mischievous Cat',
    range: [0,2],
    desc: "Congratulations, you’ve cleverly avoided all the right answers.",
    image: '../artwork-images/archetype-mischievous.jpg'
  },
  {
    name: 'Lazy Cat',
    range: [3,5],
    desc: "Come on! Wake up and try again, claw your way to the top.",
    image: '../artwork-images/archetype-lazy.jpg'
  },
  {
    name: 'Fierce Cat',
    range: [6,8],
    desc: "Almost a purrr-fect score. You’re hard working and relentless, one more try and you’ll nail it.",
    image: '../artwork-images/archetype-fierce.jpg'
  },
  {
    name: 'Scholarly Cat',
    range: [9,10],
    desc: "Genius you. Witty, quick and always one paw ahead!",
    image: '../artwork-images/archetype-scholarly.jpg'
  }
];

const questionsContainer = document.getElementById("questionsContainer");

// Render questions; attach data-correct attribute to inputs for scoring
quizData.forEach((qObj, i) => {
  const qDiv = document.createElement("div");
  qDiv.classList.add("questionBox");
  // ${i + 1}. ${qObj.q}
  qDiv.innerHTML = `<strong>${qObj.q}</strong>
    ${qObj.image ? `<img class="question-image" src="${qObj.image}" alt="${qObj.q}" />` : ''}
    <div class="optionsGrid">
      ${qObj.options.map((opt, idx) => `
        <input type="radio" id="q${i+1}_${idx}" name="q${i+1}" data-correct="${opt.correct ? '1' : '0'}">
        <label for="q${i+1}_${idx}">
          ${opt.text}
        </label>
      `).join('')}
    </div>`;
  questionsContainer.appendChild(qDiv);
});

// Progress bar handling
const progressFill = document.getElementById('progressFill');
function updateProgress(){
  const total = quizData.length;
  const answered = Array.from(document.querySelectorAll('input[type=radio]'))
    .filter(i => i.checked)
    .map(i => i.name)
    .filter((v, idx, arr) => arr.indexOf(v) === idx).length; // unique questions answered
  const pct = Math.round((answered / total) * 100);
  if(progressFill) progressFill.style.width = pct + '%';
}

// Attach change listeners to update progress as user answers
document.addEventListener('change', (e) => {
  if(e.target && e.target.matches('input[type=radio]')){
    updateProgress();
  }
});

// initialize progress
updateProgress();

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
  // Build a polished result card similar to the design reference
  const pageUrl = encodeURIComponent(location.href);
  const shareText = encodeURIComponent(`I scored ${score}/${quizData.length} on the Meowseum quiz — ${name}!`);
  const whatsapp = `https://wa.me/?text=${shareText}%20${pageUrl}`;
  const twitter = `https://twitter.com/intent/tweet?text=${shareText}%20${pageUrl}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${shareText}`;

  // Pick an archetype image from the matched archetype object (if provided)
  const imgSrc = archetype && archetype.image ? archetype.image : '';

  resultBox.innerHTML = `
    <h3 class="result-title">${name}</h3>
    <div class="result-image" aria-hidden="true">
      ${imgSrc ? `<img src="${imgSrc}" alt="${name}" />` : ''}
    </div>
    <div class="result-message">
      <p><strong>You scored ${score} out of ${quizData.length} points!</strong></p>
      <p>${desc}</p>
    </div>
    <p class="share-promo">Share this Quiz with your friends and family to test their knowledge</p>
    <div class="shareRow">
      <a class="share-button" href="${whatsapp}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">
        <span class="label">WhatsApp</span>
        <!-- Simple inline icon: using text fallback for now -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none">
          <path class="WA-share-btn" d="M0 28L1.96816 20.8098C0.753665 18.7052 0.1155 16.3193 0.116666 13.8728C0.120166 6.22417 6.34432 0 13.9918 0C17.703 0.00116667 21.1866 1.44667 23.8069 4.06933C26.4261 6.692 27.8681 10.178 27.8669 13.8857C27.8634 21.5355 21.6393 27.7597 13.9918 27.7597C11.6701 27.7585 9.38231 27.1763 7.35582 26.0703L0 28ZM7.69648 23.5585C9.65181 24.7193 11.5185 25.4147 13.9871 25.4158C20.3431 25.4158 25.5208 20.2428 25.5243 13.8833C25.5266 7.511 20.3735 2.345 13.9965 2.34267C7.63582 2.34267 2.46166 7.51567 2.45933 13.874C2.45816 16.4698 3.21883 18.4135 4.49632 20.447L3.33083 24.703L7.69648 23.5585ZM20.9813 17.1838C20.895 17.0392 20.664 16.9528 20.3163 16.779C19.9698 16.6052 18.2653 15.7663 17.9468 15.6508C17.6295 15.5353 17.3985 15.477 17.1663 15.8247C16.9353 16.1712 16.2703 16.9528 16.0685 17.1838C15.8666 17.4148 15.6636 17.444 15.3171 17.2702C14.9706 17.0963 13.853 16.7312 12.5288 15.5493C11.4986 14.63 10.8021 13.4948 10.6003 13.1472C10.3985 12.8007 10.5793 12.6128 10.752 12.4402C10.9083 12.285 11.0985 12.0353 11.2723 11.8323C11.4485 11.6317 11.5056 11.487 11.6223 11.2548C11.7378 11.0238 11.6806 10.8208 11.5931 10.647C11.5056 10.4743 10.8126 8.7675 10.5245 8.07333C10.2421 7.39783 9.95631 7.48883 9.74398 7.47833L9.07898 7.46667C8.84798 7.46667 8.47231 7.553 8.15498 7.90067C7.83765 8.24833 6.94165 9.086 6.94165 10.7928C6.94165 12.4997 8.18415 14.1482 8.35681 14.3792C8.53065 14.6102 10.801 18.1125 14.2788 19.614C15.106 19.971 15.7523 20.1845 16.2551 20.3443C17.0858 20.608 17.8418 20.5707 18.4391 20.482C19.1053 20.3828 20.4901 19.6432 20.7795 18.8335C21.0688 18.0227 21.0688 17.3285 20.9813 17.1838Z"/>
        </svg>
      </a>
      <a class="share-button" href="${twitter}" target="_blank" rel="noopener" aria-label="Share on X (Twitter)">
        <span class="label">X</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none">
          <path class="X-share-btn" d="M21.3808 2.22119H25.3165L16.7181 12.0486L26.8334 25.4215H18.9132L12.7098 17.3109L5.61169 25.4215H1.67359L10.8704 14.91L1.16675 2.22119H9.28804L14.8954 9.63458L21.3808 2.22119ZM19.9994 23.0658H22.1803L8.10304 4.45318H5.76279L19.9994 23.0658Z"/>
        </svg>
      </a>
      <a class="share-button" href="${facebook}" target="_blank" rel="noopener" aria-label="Share on Facebook">
        <span class="label">Facebook</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none">
          <g clip-path="url(#clip0_200_672)">
          <path class="FB-share-btn" d="M14 0C6.26808 0 0 6.26808 0 14C0 20.5654 4.52032 26.0747 10.6182 27.5878V18.2784H7.73136V14H10.6182V12.1565C10.6182 7.39144 12.7747 5.1828 17.453 5.1828C18.34 5.1828 19.8705 5.35696 20.4966 5.53056V9.40856C20.1662 9.37384 19.5922 9.35648 18.8793 9.35648C16.5838 9.35648 15.6968 10.2262 15.6968 12.4869V14H20.2698L19.4841 18.2784H15.6968V27.8975C22.629 27.0603 28.0006 21.1579 28.0006 14C28 6.26808 21.7319 0 14 0Z"/>
          </g>
          <defs>
            <clipPath id="clip0_200_672">
              <rect width="28" height="28" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
`;

  // Display adjustments
  resultBox.style.display = "block";
  quizHeader.style.display = "none";
  form.style.display = "none";
  leadStep.style.display = "flex";
  navBack.style.display = "none";
  restartQuiz.style.display = "flex";
  dividerCat.style.display = "block";
  resultBox.scrollIntoView({ behavior: "smooth" });
  if(progressFill) progressFill.style.width = '100%';
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