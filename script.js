const sentences = Array.from(document.querySelectorAll('.sentence-item')).map(item => ({
  english: item.getAttribute('data-english'),
  sinhala: item.getAttribute('data-sinhala')
}));

let currentSentence = 0;
let shuffledWords = [];
let selectedWords = [];

// Get the sentence and shuffle the words
function newSentence() {
  // Clear the display of selected words from the previous sentence
  clearSelectedWordsDisplay();

  selectedWords = [];
  const sentence = sentences[currentSentence];
  const english = sentence.english;
  const sinhala = sentence.sinhala;
  document.querySelector('.sentence .english').textContent = english;
  document.querySelector('.sentence .sinhala').textContent = sinhala;

  // Shuffle the words
  shuffledWords = english.split(' ').sort(() => Math.random() - 0.5);
  document.querySelector('.words').innerHTML = '';
  shuffledWords.forEach(word => {
    const div = document.createElement('div');
    div.className = 'word';
    div.textContent = word;
    div.addEventListener('click', selectWord);
    document.querySelector('.words').appendChild(div);
  });
}

function clearSelectedWordsDisplay() {
  const selectedWordsElement = document.querySelector('.selected-words');
  selectedWordsElement.innerHTML = ''; // Clear the existing content
}

// Select a word and add it to the selected words array
function selectWord() {
  if (!selectedWords.includes(this.textContent)) {
    selectedWords.push(this.textContent);
    this.style.backgroundColor = '#537FE7';
    this.style.color = 'white';
    // Display the selected words above the game area
    updateSelectedWordsDisplay();
  }
}

// Update the display of selected words
function updateSelectedWordsDisplay() {
  const selectedWordsElement = document.querySelector('.selected-words');
  selectedWordsElement.innerHTML = ''; // Clear the existing content
  selectedWords.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    selectedWordsElement.appendChild(span);
    // Add a space if it's not the last word
    if (index < selectedWords.length - 1) {
      selectedWordsElement.appendChild(document.createTextNode(' '));
    }
  });
}

// Show the correct answer
function showAnswer() {
  const sentence = sentences[currentSentence];
  const english = sentence.english;
  document.querySelector('.result').textContent = english;
  document.querySelector('.result').style.color = '#666';
}

// Check the answer and display the result
function checkAnswer() {
  const sentence = sentences[currentSentence];
  const english = sentence.english;
  const selected = selectedWords.join(' ');
  const resultElement = document.querySelector('.result');

  if (selected === english) {
    resultElement.textContent = 'Correct!\u2705';
    resultElement.style.color = '#4CAF50';
    resultElement.classList.add('show'); // Add show class to display with transition
    currentSentence++;
    if (currentSentence === sentences.length) {
      document.querySelector('.game').style.display = 'none';
      document.querySelector('.selected-words').style.display = 'none';
      document.querySelector('.submit').style.display = 'none';
      resultElement.textContent = 'Congratulations!';
      resultElement.style.color = '#537FE7';
      document.querySelector('.congrats').style.display = 'block';
      document.querySelector('.bar').style.display = 'none';
      document.querySelector('.congrats').style.display = 'block';
    } else {
      setTimeout(() => {
        resultElement.classList.remove('show'); // Hide result after timeout
        setTimeout(newSentence, 500); // Delay showing new sentence to allow transition
      }, 2000); // Adjust timing as needed
    }
  } else {
    resultElement.textContent = 'Incorrect \u274E';
    resultElement.style.color = '#FF0000';
    resultElement.classList.add('show'); // Add show class to display with transition
    selectedWords = [];
    shuffledWords.forEach(word => {
      const div = document.createElement('div');
      div.className = 'word';
      div.textContent = word;
      div.addEventListener('click', selectWord);
      document.querySelector('.words').appendChild(div);
    });
  }
}

// Reset the selection of words
function resetSelection() {
  selectedWords = [];
  const wordElements = document.querySelectorAll('.word');
  wordElements.forEach(wordElement => {
    wordElement.style.backgroundColor = '#f0f0f0';
    wordElement.style.color = '';
  });
  // Also clear the display of selected words
  clearSelectedWordsDisplay();
}

// Start the game
newSentence();
const restartBtn = document.getElementById("restart-btn");

restartBtn.addEventListener("click", function() {
  location.reload();
});
