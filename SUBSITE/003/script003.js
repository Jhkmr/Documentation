document.querySelectorAll('.underline').forEach(elem => {
  elem.addEventListener('click', () => {
    elem.classList.toggle('underlineOne');
  });
});


/*const trigger = document.getElementById('trigger');

trigger.addEventListener('click', () => {
  document.querySelector('.between').classList.toggle('underlineBetween');
});*/


const trigger = document.getElementById('trigger');

trigger.addEventListener('click', () => {
  document.querySelector('.between').classList.toggle('underlineBetween');

  
  const betweenAdd = document.querySelector('.betweenAdd');
  betweenAdd.classList.add('underlineBetweenAdd');

  const clone = betweenAdd.cloneNode(true);
  betweenAdd.parentNode.insertBefore(clone, betweenAdd.nextSibling);

});

const triggerTwo = document.getElementById('triggerTwo');
let clickCount = 0;

triggerTwo.addEventListener('click', () => {
  document.querySelector('.betweenTwo').classList.toggle('underlineBetweenTwo');
  clickCount++;

  // Trigger on the 1st, 3rd, 5th... clicks (odd numbers)
  if (clickCount % 2 === 1) {
    const betweenAddTwo = document.querySelector('.betweenAddTwo');
    betweenAddTwo.classList.add('underlineBetweenAddTwo');

    const clone = betweenAddTwo.cloneNode(true);
    betweenAddTwo.parentNode.insertBefore(clone, betweenAddTwo.nextSibling);
  }
});
