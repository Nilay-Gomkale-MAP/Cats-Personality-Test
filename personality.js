const resultBox = document.getElementById('result');
const descriptions = {
    lazy: "😴 You love comfort and naps. Sunbeams are your best friend.",
    thief: "🕵️ Clever and sneaky, always up to playful mischief.",
    fierce: "💪 Bold and brave, a true adventurer and protector.",
    political: "🎩 Charming and strategic, you navigate life smoothly."
};

function tallyAnswers() {
    const data = new FormData(document.getElementById('quizForm'));
    const counts = { lazy:0, thief:0, fierce:0, political:0 };
    for(let i=1;i<=6;i++){
    const v = data.get('q'+i);
    if(v && counts[v]!==undefined) counts[v]++;
    }
    return counts;
}

function showResult(){
    const counts = tallyAnswers();
    const entries = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
    const topScore = entries[0][1];
    const topCats = entries.filter(e=>e[1]===topScore).map(e=>e[0]);

    const chosen = topCats[Math.floor(Math.random()*topCats.length)];
    resultBox.innerHTML = `<h3>Your Cat Type: ${chosen}</h3><p>${descriptions[chosen]}</p><p class="muted">Scores: ${JSON.stringify(counts)}</p>`;

    resultBox.style.display='block';
    resultBox.scrollIntoView({behavior:'smooth', block:'center'});
}

// Lead form handlers
document.getElementById('submitLead').addEventListener('click',()=>{
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    if(!email){ alert("Enter valid email or skip."); return; }
    console.log("Lead Submitted:", {name,email});
    showResult();
});

document.getElementById('skipLead').addEventListener('click',()=>{
    showResult();
});