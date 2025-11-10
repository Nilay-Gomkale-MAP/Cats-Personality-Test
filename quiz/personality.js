// Quiz Questions insert here with Options
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

// Scored Based System with Cat Archetype description and scoring ranges - also includes SM media description line
const scoreArchetypes = [
  {
    name: 'Mischievous Cat',
    range: [0,2],
    desc: "Congratulations, you’ve cleverly avoided all the right answers.",
    image: '../artwork-images/archetype-mischievous.jpg',
    socialLine:' who has cleverly avoided all the right answers!'
  },
  {
    name: 'Lazy Cat',
    range: [3,5],
    desc: "Come on! Wake up and try again, claw your way to the top.",
    image: '../artwork-images/archetype-lazy.jpg',
    socialLine:' who needs to wake up and claw my way to the top!'
  },
  {
    name: 'Fierce Cat',
    range: [6,8],
    desc: "Almost a purrr-fect score. You’re hard working and relentless, one more try and you’ll nail it.",
    image: '../artwork-images/archetype-fierce.jpg',
    socialLine:' with an almost purr-fect score!'
  },
  {
    name: 'Scholarly Cat',
    range: [9,10],
    desc: "You genius you. Witty, quick and always one paw ahead!",
    image: '../artwork-images/archetype-scholarly.jpg',
    socialLine:' who is always one paw ahead!'
  }
];

// Call for the Questions Div from the HTML file to dynamically add questions from the above arrays to the page
const questionsContainer = document.getElementById("questionsContainer");

// Render questions; attach data-correct attribute to inputs for scoring
quizData.forEach((qObj, i) => {
  const qDiv = document.createElement("div");
  qDiv.id = `question${i+1}`;
  qDiv.classList.add("questionBox");
  // ${i + 1}. ${qObj.q}
  // <strong>Question ${i+1}</strong>
  qDiv.innerHTML = `
    <div class="qNoCat">
      <p>${i + 1}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="68" viewBox="0 0 38 68" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7221 19.5801C14.9471 19.0154 15.583 16.8967 17.563 16.1699C18.9635 15.656 19.7987 15.9751 19.8362 15.9835C20.682 16.1743 22.2143 16.608 23.1748 19.4158C23.8071 21.2642 23.9071 21.8185 26.1008 23.1486C26.3113 23.2762 27.9011 24.2401 28.4527 25.1312C30.4842 28.4119 28.3583 31.1131 27.025 31.8781C26.043 32.4415 24.7739 32.9735 22.3139 32.213C21.1244 31.8454 19.7313 30.5293 18.6958 30.7283C17.2336 31.0094 15.8183 32.9625 12.8242 32.5125C9.70331 32.0434 8.9228 29.5724 8.81508 29.0563C7.94938 24.9082 11.6698 23.236 12.2145 22.9074C13.8866 21.8982 14.05 21.3206 14.7221 19.5801Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.24846 30.9371C6.26607 31.9872 6.29352 66.1832 6.2337 66.4524C6.09153 67.0936 5.04371 67.3374 4.98824 66.2625C4.95549 65.6265 5.03424 32.5059 4.94602 30.9353C4.93921 30.8145 4.73684 28.9956 4.44833 28.1155C3.18016 24.2481 1.70432 23.5765 0.882156 21.4837C0.730142 21.0967 -0.974574 17.4032 0.80435 13.7575C1.08699 13.178 1.90082 12.1101 2.61338 11.6361C2.88711 11.454 3.47851 10.9977 4.87787 10.6699C5.68357 10.4811 6.29484 10.8181 6.25547 10.1118C6.21476 9.38067 5.60198 6.24914 7.51417 3.10058C8.38177 1.67206 9.93542 0.477152 11.3024 0.210985C12.2147 0.0334146 12.7224 -0.127876 14.138 0.165741C14.5407 0.249225 16.7965 0.539624 18.3831 3.06404C18.8304 3.77584 19.0674 3.77508 19.4122 3.26906C20.4507 1.74514 21.4124 1.1367 22.6999 0.514446C22.8367 0.448188 24.4084 -0.202652 25.8967 0.0637038C26.5222 0.175585 27.0922 0.213257 28.3066 0.915967C28.6415 1.10982 29.5028 1.81726 29.9672 2.42778C30.208 2.74411 31.4317 4.31877 31.7651 7.08645C31.932 8.47237 31.7202 9.87231 31.6838 10.1116C31.5833 10.7762 32.2222 10.4681 33.0883 10.6793C33.3906 10.7532 35.4151 11.0863 36.8008 13.1922C38.3778 15.5886 38.4003 19.3894 36.4139 22.749C36.2289 23.0619 35.2754 24.339 35.045 24.7316C34.8404 25.0803 33.0332 27.8304 33.0065 31.3173C32.9992 32.279 33.0185 66.0674 32.9957 66.2508C32.8678 67.2838 31.6865 67.323 31.6714 66.0683C31.6575 64.9141 31.6585 33.7262 31.6587 32.0755C31.6589 30.5053 31.6931 27.1792 34.4663 23.2136C34.652 22.948 35.0747 22.4978 35.7047 21.2683C36.1589 20.3819 36.5424 18.9543 36.6021 18.0597C36.8643 14.1245 34.7302 12.8359 34.2552 12.5232C33.455 11.9965 32.3209 11.8485 31.5674 11.9564C31.1833 12.0115 30.2192 12.3333 30.106 11.4373C30.0783 11.2177 30.6659 9.08554 30.4554 7.46355C30.4013 7.04708 30.3294 5.19868 29.0212 3.36921C28.3339 2.40771 27.369 1.91305 27.199 1.82578C26.0073 1.2147 24.0752 0.978628 22.2506 2.2875C21.3779 2.91354 21.1551 3.13522 20.3634 4.21977C19.7357 5.0796 19.5642 6.16983 18.7272 5.88851C18.1192 5.68425 17.9969 3.99373 15.8401 2.38216C13.9927 1.00172 11.0963 0.678765 9.01065 3.27436C7.44034 5.22859 7.4553 7.80696 7.45757 8.22192C7.4748 11.1819 8.24093 11.3529 7.60618 11.9104C7.03636 12.4109 5.99214 11.3754 3.93039 12.3812C2.56737 13.0461 0.669942 15.0732 1.34142 18.0619C2.05189 21.2238 3.30018 22.8378 4.08903 24.1446C6.09815 27.4734 6.2053 30.0866 6.24808 30.9375L6.24846 30.9371Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6709 8.04946C20.723 7.84709 21.0402 6.61225 21.6146 5.6148C22.8479 3.47299 25.1344 2.37615 26.8978 3.79443C29.0799 5.5493 28.6415 8.98066 28.5815 9.55274C28.5291 10.0512 28.18 11.3775 27.8604 12.0416C25.7599 16.4079 22.1984 15.8127 20.9976 12.944C20.1179 10.8425 20.5422 8.85723 20.6709 8.04946ZM17.4345 9.16239C17.4481 9.42004 17.7457 11.6599 16.6402 13.5374C15.2503 15.8977 12.2289 15.8366 10.4339 12.7297C9.17538 10.5511 9.26605 8.24672 9.28177 7.84558C9.35143 6.07557 10.155 4.51531 10.8301 3.96102C10.98 3.83778 12.83 2.09408 15.1717 4.1702C17.0805 5.86241 17.3877 8.72642 17.4345 9.16239ZM5.46173 13.7837C5.6923 13.7678 5.94181 13.7207 6.41546 13.8097C6.49099 13.8239 6.85162 13.8916 7.31543 14.1425C10.1225 15.6599 11.4442 20.7218 9.3857 22.7616C8.18 23.9563 6.64149 23.4196 5.88596 22.9039C3.45904 21.2479 2.29593 16.9478 3.87798 14.8075C4.51727 13.9426 5.25936 13.8377 5.46173 13.7837ZM30.0655 23.4813C29.9841 23.4677 27.7997 23.3329 27.5816 20.3392C27.3805 17.5797 29.0037 15.1081 30.4257 14.2612C32.805 12.8444 34.273 14.707 34.5621 15.807C34.9509 17.287 34.8232 17.8303 34.6081 18.8248C33.9573 21.8349 31.9926 22.9783 31.5714 23.1737C30.814 23.5251 30.4581 23.4838 30.0655 23.4813Z" fill="black"/>
      </svg>
    </div>
    <strong>${qObj.q}</strong>
    ${qObj.image ? `<img class="question-image" src="${qObj.image}" alt="${qObj.q}" />` : ''}
    <div class="optionsGrid">
      ${qObj.options.map((opt, idx) => `
        <input type="radio" id="q${i+1}_${idx}" name="q${i+1}" data-correct="${opt.correct ? '1' : '0'}">
        <label for="q${i+1}_${idx}">
          ${opt.text}
        </label>
      `).join('')}
    </div>
  `;
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
  if (e.target && e.target.matches('input[type=radio]')) {
    updateProgress();

    // Auto-scroll to the next question after selection.
    // Find the current question container and the next one in DOM order.
    try {
      const currentBox = e.target.closest('.questionBox');
      if (currentBox) {
        const boxes = Array.from(document.querySelectorAll('.questionBox'));
        const idx = boxes.indexOf(currentBox);
        const next = boxes[idx + 1];
        if (next) {
          // small delay so the UI registers the checked state before moving
          setTimeout(() => {
            next.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // add highlight class for a subtle visual cue
            next.classList.add('highlight');
            setTimeout(() => next.classList.remove('highlight'), 800);
            // move focus to the first radio in the next question for keyboard users
            const firstInput = next.querySelector('input[type=radio]');
            if (firstInput) firstInput.focus({ preventScroll: true });
          }, 120);
        } else {
          // If this was the last question, scroll to the result step area
          const resultStep = document.getElementById('resultStep');
          if (resultStep) setTimeout(() => {
            resultStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
            resultStep.classList.add('highlight');
            setTimeout(() => resultStep.classList.remove('highlight'), 2000);
          }, 120);
        }
      }
    } catch (err) {
      // Don't let scrolling errors break the quiz
      console.warn('Auto-scroll failed:', err);
    }
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
const resultPageHeader = document.getElementById('resultPageHeader');
// const dividerCat = document.querySelector('.dividerCat');
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

// Check if all questions have been answered before proceeding to the result screen
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

// Result Page Function
function showResult() {
  const score = tallyAnswers();

  // Find archetype by score range
  const archetype = scoreArchetypes.find(a => score >= a.range[0] && score <= a.range[1]);
  const name = archetype ? archetype.name : 'Unknown Cat';
  const desc = archetype ? archetype.desc : '';
  const soLine = archetype ? archetype.socialLine: '';
  // Build a polished result card similar to the design reference
  const pageUrl = encodeURIComponent('https://meowseum-cat-quiz.map-india.org/');
  const shareText = encodeURIComponent(`Hey there!\n\nI just took the ‘Which Meowseum Cat Are You’ quiz and turns out I’m a ${name}${soLine}!\n\nWhat cat are you? Take the quiz and find out\n`); //Figure out how to add a line break
  const whatsapp = `https://wa.me/?text=${shareText}%20${pageUrl}`;
  const twitter = `https://twitter.com/intent/tweet?text=${shareText}%20${pageUrl}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${shareText}`;

  // Pick an archetype image from the matched archetype object (if provided)
  const imgSrc = archetype && archetype.image ? archetype.image : '';

  // Dynamic Result Page
  resultBox.innerHTML = `
    <h3 class="result-title ${name}">${name}</h3>
    <div class="result-image" aria-hidden="true">
      ${imgSrc ? `<img src="${imgSrc}" alt="${name}" />` : ''}
    </div>
    <div class="result-message">
      <p><strong>You scored ${score} out of ${quizData.length} points!</strong></p>
      <p>${desc}</p>
    </div>
    <p class="share-promo">Share this Quiz with your friends and family to test their knowledge</p>
    <div class="shareRow">
  <button id="wa-sharing" class="share-button" onclick="window.open('${whatsapp}','_blank','noopener,noreferrer')" aria-label="Share on WhatsApp">
        <span class="label">WhatsApp</span>
        <!-- Simple inline icon: using text fallback for now -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none">
          <path class="WA-share-btn" d="M0 28L1.96816 20.8098C0.753665 18.7052 0.1155 16.3193 0.116666 13.8728C0.120166 6.22417 6.34432 0 13.9918 0C17.703 0.00116667 21.1866 1.44667 23.8069 4.06933C26.4261 6.692 27.8681 10.178 27.8669 13.8857C27.8634 21.5355 21.6393 27.7597 13.9918 27.7597C11.6701 27.7585 9.38231 27.1763 7.35582 26.0703L0 28ZM7.69648 23.5585C9.65181 24.7193 11.5185 25.4147 13.9871 25.4158C20.3431 25.4158 25.5208 20.2428 25.5243 13.8833C25.5266 7.511 20.3735 2.345 13.9965 2.34267C7.63582 2.34267 2.46166 7.51567 2.45933 13.874C2.45816 16.4698 3.21883 18.4135 4.49632 20.447L3.33083 24.703L7.69648 23.5585ZM20.9813 17.1838C20.895 17.0392 20.664 16.9528 20.3163 16.779C19.9698 16.6052 18.2653 15.7663 17.9468 15.6508C17.6295 15.5353 17.3985 15.477 17.1663 15.8247C16.9353 16.1712 16.2703 16.9528 16.0685 17.1838C15.8666 17.4148 15.6636 17.444 15.3171 17.2702C14.9706 17.0963 13.853 16.7312 12.5288 15.5493C11.4986 14.63 10.8021 13.4948 10.6003 13.1472C10.3985 12.8007 10.5793 12.6128 10.752 12.4402C10.9083 12.285 11.0985 12.0353 11.2723 11.8323C11.4485 11.6317 11.5056 11.487 11.6223 11.2548C11.7378 11.0238 11.6806 10.8208 11.5931 10.647C11.5056 10.4743 10.8126 8.7675 10.5245 8.07333C10.2421 7.39783 9.95631 7.48883 9.74398 7.47833L9.07898 7.46667C8.84798 7.46667 8.47231 7.553 8.15498 7.90067C7.83765 8.24833 6.94165 9.086 6.94165 10.7928C6.94165 12.4997 8.18415 14.1482 8.35681 14.3792C8.53065 14.6102 10.801 18.1125 14.2788 19.614C15.106 19.971 15.7523 20.1845 16.2551 20.3443C17.0858 20.608 17.8418 20.5707 18.4391 20.482C19.1053 20.3828 20.4901 19.6432 20.7795 18.8335C21.0688 18.0227 21.0688 17.3285 20.9813 17.1838Z"/>
        </svg>
      </button>
  <button id="x-sharing" class="share-button" onclick="window.open('${twitter}','_blank','noopener,noreferrer')" aria-label="Share on X (Twitter)">
        <span class="label">X</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none">
          <path class="X-share-btn" d="M21.3808 2.22119H25.3165L16.7181 12.0486L26.8334 25.4215H18.9132L12.7098 17.3109L5.61169 25.4215H1.67359L10.8704 14.91L1.16675 2.22119H9.28804L14.8954 9.63458L21.3808 2.22119ZM19.9994 23.0658H22.1803L8.10304 4.45318H5.76279L19.9994 23.0658Z"/>
        </svg>
      </button>
  <button id="fb-sharing" class="share-button" onclick="window.open('${facebook}','_blank','noopener,noreferrer')" aria-label="Share on Facebook">
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
      </button>
    </div>
`;

  // Display adjustments -> Hide question page elements and show results content
  resultBox.style.display = "block";
  quizHeader.style.display = "none";
  form.style.display = "none";
  leadStep.style.display = "flex";
  navBack.style.display = "none";
  // restartQuiz.style.display = "flex";
  dividerCat.style.display = "flex";
  resultBox.scrollIntoView({ behavior: "smooth" });
  if(progressFill) progressFill.style.width = '100%';
}

// Event Listeners -> Resets the page view to the top when result button is clicked
document.getElementById('getResult').addEventListener('click', () => {
  if (!validateQuiz()) return;
  errorMsg.style.display = "none";
  // Scroll to top when user submits, then show results.
  // We call showResult after a short delay so the smooth scroll starts first.
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e) {
    // ignore (older browsers)
  }
  setTimeout(() => {
    showResult();
    // ensure viewport stays at top after results render
    setTimeout(() => { try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {} }, 220);
  }, 360);
});

//Reloads page when reset quiz is clicked
// document.getElementById('restartQuiz').addEventListener('click', () => {
//   location.reload();
// });