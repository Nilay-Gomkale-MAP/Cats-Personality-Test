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

// Replace this with your published Google Apps Script Web App URL
// The web app should accept POST requests and write the fields to the sheet.
const SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyMd0hO4fbsQGjqWK6_YF2z0YZt47nFlh5OaOmwFGg8Ho5EWavbH7S9nE1PIv6S3-oUvw/exec';

function generateIdempotencyKey(){
  try{
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  }catch(e){}
  return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2,9);
}

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
    <div class="qNoCat2">
      <p>${i + 1}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="69" viewBox="0 0 65 69" fill="none">
        <path d="M31.7795 0.224306C33.9909 -0.234588 36.0612 0.0122947 37.8549 0.949688C39.6073 1.86561 40.8426 3.30662 41.6823 4.82041C43.2175 7.58818 43.6871 11.0357 43.4919 13.8937L43.4441 14.4571C43.4064 14.8278 43.3496 15.2078 43.2769 15.5944C45.1867 13.8926 47.6079 12.4744 50.2662 12.0939L50.5899 12.053C53.9312 11.6856 57.1833 13.0516 59.148 15.9843C61.3445 19.2596 60.9774 23.117 59.9168 26.1412C58.8423 29.2052 56.8567 32.0623 54.7485 33.9447L54.7478 33.9455C54.6455 34.0367 54.5419 34.1258 54.4386 34.2143L54.4446 34.2203C57.4475 33.9918 60.0925 34.6204 62.0683 36.2753C64.4193 38.2445 65.1722 41.1196 64.9681 43.7737C64.5712 48.9345 60.5558 54.5614 54.2433 56.4679C50.5447 57.5853 47.0274 57.135 44.4849 55.3154C44.6358 56.4603 44.6614 57.7197 44.4591 59.1256C43.2918 67.2165 34.8903 70.5176 28.2636 68.3503C24.6538 67.1697 22.5204 64.5548 20.9742 62.5738C19.261 60.3789 18.287 59.0562 16.8247 58.3275L16.8239 58.3268C15.5123 57.6724 14.0006 57.361 11.8729 56.8457C9.93602 56.3766 7.49846 55.7315 5.36225 54.2221L5.35845 54.2198C-0.658878 49.956 -2.0223 40.5633 3.40144 35.026C5.54051 32.8423 8.20656 32.0767 10.4211 31.6671C10.6426 31.6261 10.8676 31.5893 11.0927 31.5528C10.5752 31.3964 10.0589 31.1888 9.54823 30.9251C6.93494 29.5756 5.40232 27.0688 4.58051 24.5874C3.74645 22.069 3.50888 19.2068 3.74939 16.5037C3.98924 13.8084 4.72449 11.048 6.04294 8.78199C7.35635 6.52479 9.45879 4.43958 12.4807 3.92012L12.9479 3.85121C15.2691 3.56421 17.3414 4.15564 19.0248 5.40723C20.7266 6.67261 21.8441 8.46737 22.5734 10.2153C22.6778 10.4655 22.7755 10.7199 22.8682 10.9771C23.43 8.74092 24.3471 6.55343 25.5986 4.7303C26.9981 2.69156 29.0486 0.7902 31.7795 0.224306ZM38.8144 39.8591C38.0567 33.3273 33.75 28.6702 26.827 29.6818V29.678C23.8824 30.1095 20.2619 32.7839 17.0336 33.6804C13.197 34.748 8.5542 34.2054 5.62814 37.1923L5.44429 37.3853C1.6719 41.4853 2.65052 48.4957 7.16199 51.6923C10.3679 53.9575 14.7942 53.8459 18.2165 55.5532C22.6951 57.7851 23.9678 63.681 29.2338 65.4034C34.4175 67.0987 40.3644 64.4867 41.3359 58.9514L41.3784 58.6857C41.998 54.3818 39.9227 51.8406 39.2733 47.9571C38.8442 45.398 39.1055 42.381 38.8144 39.8591ZM53.34 53.4997C63.5028 50.4309 65.9178 35.3397 53.318 37.4823L53.3142 37.4785C50.7801 37.91 47.4994 40.4209 45.958 42.4221C41.0912 48.7495 45.3495 55.9137 53.34 53.4997ZM50.3217 15.2302C46.3178 16.0274 42.3914 20.2401 41.285 24.0059C38.5571 33.2977 45.1744 38.3264 52.6722 31.6345C56.1133 28.5619 59.42 21.9705 56.5612 17.7077C55.2362 15.7289 53.0454 14.8288 50.7092 15.1635L50.3217 15.2302ZM12.8423 7.00791C5.77918 8.47302 4.51779 24.8353 10.9795 28.1719C16.0142 30.7721 20.2397 24.8204 20.8481 20.3752C21.5162 15.48 19.7318 5.8194 13.0102 6.97611L12.8423 7.00791ZM32.107 3.33406C25.7157 5.0965 22.5316 19.853 28.4353 23.7931C34.3539 27.7404 39.6437 19.6853 40.3202 14.3942L40.3483 14.1444C40.8596 9.11521 38.7772 1.93943 32.4139 3.25985L32.107 3.33406Z" fill="black"/>
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
    <p class="share-promo">Share this Quiz with your friends and family to<br/>test their knowledge</p>
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

document.getElementById('restartQuiz').addEventListener('click', () => {
  location.reload();
});

document.getElementById('submitLead').addEventListener('click', () => {
  if (!validateQuiz()) return;

  const email = document.getElementById('email').value.trim();
  const firstName = document.getElementById('fname').value.trim();
  const gdpr = document.getElementById('gdprConsent')?.checked;
  const comms = document.getElementById('commsConsent')?.checked;

  // Validate required fields
  if (!email) {
    errorMsg.innerText = "Please enter your email to sign up.";
    errorMsg.style.display = "block";
    return;
  }
  if (!gdpr) {
    errorMsg.innerHTML = "You must consent to MAP storing your data as per the privacy policy to continue.";
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";

  // Build payload matching your sheet columns
  const payload = {
    timestamp: new Date().toISOString(),
    first_name: firstName || '',
    email: email,
    comms_consent: comms ? '1' : '0',
    gdpr_consent: gdpr ? '1' : '0',
    source: (new URLSearchParams(location.search).get('utm_source')) || document.referrer || location.hostname,
    user_agent: navigator.userAgent || '',
    idempotency_key: generateIdempotencyKey()
  };

  const submitBtn = document.getElementById('submitLead');
  submitBtn.disabled = true;
  submitBtn.innerText = 'Sending...';

  // POST to Google Apps Script Web App
  fetch(SHEET_WEBAPP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(async res => {
    if (!res.ok) throw new Error('Network response was not ok');
    // Optional: parse response if your Web App returns JSON
    const text = await res.text().catch(() => '');
    // Show a friendly confirmation and disable the lead UI
    submitBtn.innerText = 'Submitted';
    submitBtn.style.background = 'var(--Gulabi-400)';
    // Optionally hide the lead form and show success message
    const leadStepEl = document.getElementById('leadStep');
    if (leadStepEl) {
      leadStepEl.innerHTML = `<h3>Thanks — you're signed up!</h3><p style="margin-top:8px;">Check your inbox for a confirmation email. (If you don't see it, check your spam folder.)</p>`;
    }
    console.info('Lead submitted', payload, text);
  }).catch(err => {
    console.error('Lead submit failed', err);
    errorMsg.innerText = 'There was a problem submitting your signup. Please try again.';
    errorMsg.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.innerText = 'Submit';
  });
});

// document.getElementById('skipLead').addEventListener('click', (e) => {
//   e.preventDefault();
//   if (!validateQuiz()) return;
//   errorMsg.style.display = "none";
//   showResult();
// });