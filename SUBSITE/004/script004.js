const trigger = document.getElementById('triggerButton');

const elements = [
  document.querySelector('.one'),
  document.querySelector('.two'),
];

const classes = ['stateOne', 'stateTwo'];
let currentIndex = 0;

trigger.addEventListener('click', () => {
  // Remove all toggle classes
  elements.forEach((el, i) => {
    el.classList.remove(classes[i]);
  });

  // Add class to current element
  elements[currentIndex].classList.add(classes[currentIndex]);

  // Move to next index (loop back to 0)
  currentIndex = (currentIndex + 1) % elements.length;
});

const triggerTwo = document.getElementById('triggerButtonTwo');

const elementsTwo = [
  document.querySelector('.three'),
  document.querySelector('.four'),
];

const classesTwo = ['stateThree', 'stateFour'];
let currentIndexTwo = 0;

triggerTwo.addEventListener('click', () => {
  document.querySelector('.initial').classList.add('activate');
  // Remove all toggle classes
  elementsTwo.forEach((el, i) => {
    el.classList.remove(classesTwo[i]);
  });

  // Add class to current element
  elementsTwo[currentIndexTwo].classList.add(classesTwo[currentIndexTwo]);

  // Move to next index (loop back to 0)
  currentIndexTwo = (currentIndexTwo + 1) % elementsTwo.length;
});