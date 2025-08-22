const questions = [
  { q: "2+2=?", a: ["3", "4", "5", "6"], correct: 1 },
  { q: "Capital of India?", a: ["Delhi", "Mumbai", "Kolkata", "Chennai"], correct: 0 },
  { q: "5*3=?", a: ["15", "10", "20", "8"], correct: 0 },
  { q: "Largest planet in our solar system?", a: ["Earth", "Jupiter", "Mars", "Venus"], correct: 1 },
  { q: "Who is known as the Father of Computer?", a: ["Charles Babbage", "Newton", "Einstein", "Alan Turing"], correct: 0 },
  { q: "Fastest land animal?", a: ["Tiger", "Cheetah", "Horse", "Lion"], correct: 1 },
  { q: "Which is the national flower of India?", a: ["Rose", "Lotus", "Sunflower", "Lily"], correct: 1 },
  { q: "HTML stands for?", a: ["Hyper Text Markup Language", "High Tech Machine Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correct: 0 },
  { q: "Which gas do plants release during photosynthesis?", a: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], correct: 1 },
  { q: "Who was the first Prime Minister of India?", a: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Rajendra Prasad"], correct: 1 },
  { q: "Which is the smallest prime number?", a: ["0", "1", "2", "3"], correct: 2 },
  { q: "Which programming language is known as mother of all languages?", a: ["Python", "Assembly", "C", "Java"], correct: 2 }
];


let current = 0, score = 0;

function loadQ() {
  if (current >= questions.length) {
    document.getElementById('quizQ').innerText = "🎉 Quiz Finished!";
    document.getElementById('quizOptions').innerHTML = "";
    document.getElementById('controls').style.display = "flex"; // Show Replay & Exit
    return;
  }

  const q = questions[current];
  document.getElementById('quizQ').innerText = q.q;
  const optDiv = document.getElementById('quizOptions'); 
  optDiv.innerHTML = '';

  q.a.forEach((opt, i) => {
    const btn = document.createElement('button'); 
    btn.innerText = opt;
    btn.addEventListener('click', () => {
      if (i === q.correct) score++;
      document.getElementById('score').innerText = "Score: " + score;
      current++; loadQ();
    });
    optDiv.appendChild(btn);
  });

  document.getElementById('controls').style.display = "none"; // Hide Replay/Exit while playing
}

function replayQuiz() {
  current = 0;
  score = 0;
  document.getElementById('score').innerText = "Score: 0";
  loadQ();
}

function exitQuiz() {
  document.getElementById('quizContainer').innerHTML = "<h2>🚪 You exited the quiz!</h2>";
}

loadQ();
