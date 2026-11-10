
// ========================================
// A / AN QUIZ - COMPLETE JAVASCRIPT
// ========================================


// ========================================
// ALL QUESTIONS
// ========================================

const QUESTIONS = [

  {type:"Choose the correct answer", visual:"🍎", text:"I have ___ apple.", options:["a","an","the"], answer:"an"},

  {type:"Choose the correct answer", visual:"🐶", text:"This is ___ dog.", options:["a","an","are"], answer:"a"},

  {type:"Complete the sentence", visual:"🐘", text:"It is ___ elephant.", options:["a","an","the"], answer:"an"},

  {type:"Choose the correct answer", visual:"☂️", text:"She has ___ umbrella.", options:["a","an","am"], answer:"an"},

  {type:"Choose the correct answer", visual:"📚", text:"He is ___ teacher.", options:["a","an","the"], answer:"a"},

  {type:"True or False", visual:"🐜", text:"“An ant” is correct.", options:["True","False"], answer:"True"},

  {type:"Choose the correct answer", visual:"🍊", text:"I eat ___ orange.", options:["a","an","the"], answer:"an"},

  {type:"Complete the sentence", visual:"🚗", text:"This is ___ car.", options:["a","an","the"], answer:"a"},

  {type:"Choose the correct answer", visual:"🥚", text:"There is ___ egg.", options:["a","an","the"], answer:"an"},

  {type:"Choose the correct answer", visual:"🏠", text:"It is ___ house.", options:["a","an","are"], answer:"a"},

  {type:"Find the correct phrase", visual:"🐙", text:"Choose the correct phrase.", options:["a octopus","an octopus","the octopus"], answer:"an octopus"},

  {type:"True or False", visual:"🍌", text:"“An banana” is correct.", options:["True","False"], answer:"False"},

  {type:"Choose the correct answer", visual:"✏️", text:"I have ___ pencil.", options:["a","an","is"], answer:"a"},

  {type:"Complete the sentence", visual:"🦉", text:"I can see ___ owl.", options:["a","an","the"], answer:"an"},

  {type:"Choose the correct answer", visual:"⚽", text:"This is ___ ball.", options:["a","an","am"], answer:"a"},

  {type:"Find the correct phrase", visual:"🐘", text:"Choose the correct phrase.", options:["a elephant","an elephant","an elephants"], answer:"an elephant"},

  {type:"Choose the correct answer", visual:"🍦", text:"She wants ___ ice cream.", options:["a","an","the"], answer:"an"},

  {type:"True or False", visual:"🚌", text:"“A bus” is correct.", options:["True","False"], answer:"True"},

  {type:"Complete the sentence", visual:"⌚", text:"It is ___ watch.", options:["a","an","are"], answer:"a"},

  {type:"Choose the correct answer", visual:"🎁", text:"This is ___ gift.", options:["a","an","the"], answer:"a"},

  {type:"Choose the correct answer", visual:"🐍", text:"I see ___ snake.", options:["a","an","the"], answer:"a"},

  {type:"Find the correct phrase", visual:"🍇", text:"Choose the correct phrase.", options:["a grapes","an grapes","some grapes"], answer:"some grapes"},

  {type:"Complete the sentence", visual:"🧁", text:"She ate ___ cupcake.", options:["a","an","the"], answer:"a"},

  {type:"Choose the correct answer", visual:"🦁", text:"It is ___ lion.", options:["a","an","the"], answer:"a"},

  {type:"Final challenge", visual:"⭐", text:"___ honest man (silent h).", options:["A","An","The"], answer:"An"}

];


// ========================================
// ELEMENTS
// ========================================

const $ = (id) => document.getElementById(id);


// ========================================
// QUIZ VARIABLES
// ========================================

let current = 0;
let score = 0;
let selected = null;
let locked = false;

let remaining = 20 * 60;
let timerId = null;
let finished = false;


// ========================================
// STUDENT NAME
// ========================================

function getStudentName() {

  const savedName = sessionStorage.getItem("studentName");

  return savedName && savedName.trim()
    ? savedName.trim()
    : "Wonderful Student";

}


// ========================================
// RENDER QUESTION
// ========================================

function renderQuestion() {

  const q = QUESTIONS[current];

  selected = null;
  locked = false;

  $("questionTab").textContent =
    `Question ${current + 1}`;

  $("questionType").textContent = q.type;

  $("questionVisual").textContent = q.visual;

  $("questionText").textContent = q.text;

  $("progressCount").textContent =
    `${current + 1} / ${QUESTIONS.length}`;

  $("progressFill").style.width =
    `${(current / QUESTIONS.length) * 100}%`;

  $("score").textContent = score;

  $("feedback").textContent = "";

  $("submitBtn").hidden = false;

  $("nextBtn").hidden = true;

  $("answers").innerHTML = "";


  // Create answer buttons

  q.options.forEach((option) => {

    const btn = document.createElement("button");

    btn.type = "button";

    btn.className = "answer-btn";

    btn.textContent = option;

    btn.setAttribute("aria-pressed", "false");


    btn.addEventListener("click", () => {

      if (locked || finished) return;

      selected = option;

      document.querySelectorAll(".answer-btn").forEach(b => {

        b.classList.remove("selected");

        b.setAttribute("aria-pressed", "false");

      });

      btn.classList.add("selected");

      btn.setAttribute("aria-pressed", "true");

    });


    $("answers").appendChild(btn);

  });

}


// ========================================
// FORMAT TIMER
// ========================================

function formatTime(seconds) {

  const m = Math.floor(seconds / 60);

  const s = seconds % 60;

  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

}


// ========================================
// UPDATE TIMER
// ========================================

function updateTimer() {

  $("timer").textContent = formatTime(remaining);

  if (remaining <= 60) {

    $("timer").style.color = "#d71920";

  }

  if (remaining <= 0) {

    finishQuiz(true);

  }

}


// ========================================
// START TIMER
// ========================================

function startTimer() {

  clearInterval(timerId);

  updateTimer();

  if (finished) return;

  timerId = setInterval(() => {

    remaining--;

    updateTimer();

  }, 1000);

}


// ========================================
// SUBMIT ANSWER
// ========================================

function submitAnswer() {

  if (locked || finished) return;


  if (selected === null) {

    $("feedback").textContent =
      "🌟 Choose an answer first!";

    $("feedback").style.color = "#b56b13";

    return;

  }


  locked = true;

  const q = QUESTIONS[current];

  const correct =
    selected.toLowerCase() === q.answer.toLowerCase();


  if (correct) {

    score++;

    $("feedback").textContent =
      "🎉 Excellent! That's correct!";

    $("feedback").style.color = "#169b25";

  } else {

    $("feedback").textContent =
      `💡 Good try! Correct answer: ${q.answer}`;

    $("feedback").style.color = "#c53b36";

  }


  // Show correct and wrong answers

  document.querySelectorAll(".answer-btn").forEach(btn => {

    btn.disabled = true;

    if (
      btn.textContent.toLowerCase() ===
      q.answer.toLowerCase()
    ) {

      btn.classList.add("correct");

    } else if (btn.textContent === selected) {

      btn.classList.add("wrong");

    }

  });


  $("score").textContent = score;

  $("submitBtn").hidden = true;

  $("nextBtn").hidden = false;


  $("nextBtn").textContent =
    current === QUESTIONS.length - 1
      ? "See My Result 🏆"
      : "Next Question ➜";

}


// ========================================
// NEXT QUESTION
// ========================================

function nextQuestion() {

  if (!locked || finished) return;


  if (current < QUESTIONS.length - 1) {

    current++;

    renderQuestion();

  } else {

    finishQuiz(false);

  }

}


// ========================================
// FINISH QUIZ
// ========================================

function finishQuiz(timeUp) {

  if (finished) return;

  finished = true;

  clearInterval(timerId);


  $("progressFill").style.width = "100%";

  $("progressCount").textContent =
    `${QUESTIONS.length} / ${QUESTIONS.length}`;


  $("resultScreen").hidden = false;

  $("finalScore").textContent = score;


  const percent = Math.round(
    score / QUESTIONS.length * 100
  );


  $("resultPercent").textContent = `${percent}%`;


  $("resultTitle").textContent =
    percent >= 80
      ? "Amazing Work!"
      : percent >= 50
        ? "Good Job!"
        : "Keep Practising!";


  $("resultMessage").textContent =
    timeUp
      ? "Time is up! Here is your result."
      : "You finished the quiz!";


  $("submitBtn").hidden = true;

  $("nextBtn").hidden = true;

}


// ========================================
// SHOW CERTIFICATE
// ========================================

function showCertificate() {

  if (!finished) return;

  const name = getStudentName();

  const percent = Math.round(
    score / QUESTIONS.length * 100
  );


  // Student name

  $("certStudent").textContent = name;


  // Score number only
  // The background already contains /25

  $("certScoreNumber").textContent = score;


  // Percentage number only
  // The background already contains %

  $("certPercentNumber").textContent = percent;


  // Exam date

  $("certDate").textContent =
    new Date().toLocaleDateString("en-GB");


  // Show certificate

  $("certificate").classList.add("visible");

}


// ========================================
// DOWNLOAD CERTIFICATE AS PNG
// ========================================

async function downloadCertificate() {

  const certificateElement = $("certificateCapture");

  const downloadBtn = $("downloadCertificateBtn");

  if (!certificateElement) {

    alert("Certificate element was not found.");

    return;

  }


  if (typeof html2canvas === "undefined") {

    alert("Please check your internet connection and try again.");

    return;

  }


  downloadBtn.disabled = true;

  downloadBtn.textContent = "⏳ Preparing Certificate...";


  try {

    // Wait for fonts

    if (document.fonts && document.fonts.ready) {

      await document.fonts.ready;

    }


    // Wait for certificate background image

    const backgroundImage =
      certificateElement.querySelector(".certificate-background");

    if (backgroundImage) {

      if (!backgroundImage.complete) {

        await new Promise((resolve, reject) => {

          backgroundImage.onload = resolve;

          backgroundImage.onerror = reject;

        });

      }

      if (backgroundImage.decode) {

        await backgroundImage.decode();

      }

    }


    // Create high quality canvas

    const canvas = await html2canvas(certificateElement, {

      scale: 3,

      useCORS: true,

      allowTaint: false,

      backgroundColor: "#ffffff",

      logging: false

    });


    // Convert canvas to PNG

    const image = canvas.toDataURL("image/png");


    // Safe student name for file

    const studentName = getStudentName()

      .replace(/[^\p{L}\p{N}\s-]/gu, "")

      .trim()

      .replace(/\s+/g, "_");


    // Download

    const link = document.createElement("a");

    link.download =
      `English_Certificate_${studentName || "Student"}.png`;

    link.href = image;

    document.body.appendChild(link);

    link.click();

    link.remove();


  } catch (error) {

    console.error("Certificate download error:", error);

    alert(
      "Sorry! Certificate download failed. Please check the certificate image and try again."
    );

  } finally {

    downloadBtn.disabled = false;

    downloadBtn.textContent =
      "⬇ Download Certificate PNG";

  }

}


// ========================================
// RESTART QUIZ
// ========================================

function restart() {

  clearInterval(timerId);


  current = 0;

  score = 0;

  selected = null;

  locked = false;

  remaining = 20 * 60;

  finished = false;


  $("timer").style.color = "";


  $("resultScreen").hidden = true;

  $("certificate").classList.remove("visible");


  renderQuestion();

  startTimer();

}


// ========================================
// BUTTON EVENTS
// ========================================

$("submitBtn").addEventListener(
  "click",
  submitAnswer
);


$("nextBtn").addEventListener(
  "click",
  nextQuestion
);


$("certificateBtn").addEventListener(
  "click",
  showCertificate
);


$("downloadCertificateBtn").addEventListener(
  "click",
  downloadCertificate
);


$("restartBtn").addEventListener(
  "click",
  restart
);


$("backToResultBtn").addEventListener(
  "click",
  () => {

    $("certificate").classList.remove("visible");

  }

);


// ========================================
// START QUIZ
// ========================================

renderQuestion();

startTimer();
