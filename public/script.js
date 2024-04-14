let score = 0;

function fetchTrivia() {
  fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayTrivia(data.results[0]);
    })
    .catch(error => {
      console.error('Fetching trivia failed:', error);
      fetchreload();
    });
}

function displayTrivia(data) {
  const questionElement = document.getElementById('trivia');
  const answersElement = document.getElementById('Choices');

  questionElement.innerHTML = data.question;
  answersElement.innerHTML = '';

  const answers = [...data.incorrect_answers];
  const correctAnswerIndex = Math.floor(Math.random() * (answers.length + 1));
  answers.splice(correctAnswerIndex, 0, data.correct_answer);

  answers.forEach(answer => {
    const li = document.createElement('li');
    li.classList.add('Choices');
    li.innerHTML = answer;
    li.addEventListener('click', () => {
      if (answer === data.correct_answer) {
        li.classList.add('correct');
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
      } else {
        li.classList.add('wrong');
      }
      fetchTrivia(); // Fetch new trivia after answering
    });
    answersElement.appendChild(li);
  });
}

function fetchreload() {
  fetchTrivia();
}

fetchTrivia();
