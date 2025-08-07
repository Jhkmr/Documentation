//page numbering

document.querySelectorAll('.page-number').forEach((el, i) => {
    const pageNum = (i + 1).toString().padStart(2, '0'); // Convert to 2-digit string
    el.textContent = `p. ${pageNum}`;
  });

function updateDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const allDateBlocks = document.querySelectorAll('.date.header');

  allDateBlocks.forEach(block => {
    const dayEl = block.querySelector('.day');
    const monthEl = block.querySelector('.month');
    const yearEl = block.querySelector('.year');

    if (dayEl) dayEl.textContent = day.toString().padStart(2, '0');
    if (monthEl) monthEl.textContent = months[month];
    if (yearEl) yearEl.textContent = year;
  });
}

updateDate();

//interaction
const page = document.querySelector('.spreads');

const mainEl = document.querySelector('.main');
const textContent = mainEl.textContent.trim();

const material = new Blotter.ChannelSplitMaterial();

material.uniforms.uOffset.value = 0.02;
material.uniforms.uRotation.value = 50;
material.uniforms.uApplyBlur.value = 1; // 0 false, 1 true
material.uniforms.uAnimateNoise.value = .3;

const mainText = new Blotter.Text(textContent, {
  family: 'Publico',
  size: 1000,
  fill: 'black',
});

const mainBlotter = new Blotter(material, { 
  texts: mainText 
});
const mainScope = mainBlotter.forText(mainText);


mainEl.innerHTML = ' ';
mainScope.appendTo(mainEl);

let isFrozen = false;

function moveIt(event) {
  if (isFrozen) return;

  material.uniforms.uRotation.value = event.clientX * 0.1;
  material.uniforms.uOffset.value = event.clientY * 0.0001;
}

document.addEventListener('mousemove', moveIt);

document.addEventListener('click', () => {
  isFrozen = !isFrozen;
});

// Clone
const changeEls = document.querySelectorAll('.change');
changeEls.forEach((el) => {
  el.innerHTML = ' ';

  const text = new Blotter.Text(textContent, {
    family: 'Publico',
    size: 30,
    fill: 'black',
  });

  const blotter = new Blotter(material, { texts: text });
  const scope = blotter.forText(text);
  scope.appendTo(el);
});
