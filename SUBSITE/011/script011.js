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

const mainEl = document.querySelector('.main');
const textContent = mainEl.textContent.trim();

const material = new Blotter.LiquidDistortMaterial();

material.uniforms.uSpeed.value = 0.5;
material.uniforms.uVolatility.value = 0.5;
material.uniforms.uSeed.value = 15;

const mainText = new Blotter.Text(textContent, {
  family: 'Plain',
  size: 1000,
  fill: 'black',
});

const mainBlotter = new Blotter(material, { texts: mainText });
const mainScope = mainBlotter.forText(mainText);


mainEl.innerHTML = ' ';
mainScope.appendTo(mainEl);

// hover
function animateUniform(key, toValue, speed = 0.1) {
  function step() {
    const current = material.uniforms[key].value;
    const delta = toValue - current;
    if (Math.abs(delta) > 0.002) {
      material.uniforms[key].value += delta * speed;
      requestAnimationFrame(step);
    } else {
      material.uniforms[key].value = toValue;
    }
  }
  step();
}

mainEl.addEventListener('mouseenter', () => {
  animateUniform('uSpeed', 0);
  animateUniform('uVolatility', 0);
});

mainEl.addEventListener('mouseleave', () => {
  animateUniform('uSpeed', 0.5);
  animateUniform('uVolatility', 0.5);
});

// Clone
const changeEls = document.querySelectorAll('.change');
changeEls.forEach((el) => {
  el.innerHTML = ' ';

  const text = new Blotter.Text(textContent, {
    family: 'Plain',
    size: 50,
    fill: 'black',
  });

  const blotter = new Blotter(material, { texts: text });
  const scope = blotter.forText(text);
  scope.appendTo(el);
});
