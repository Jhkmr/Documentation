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
const textContent = mainEl.textContent;

const text = new Blotter.Text(textContent, {
  family: 'Publico',
  size: 1200,
  fill : "black",
});

const material = new Blotter.FliesMaterial();

material.uniforms.uPointCellWidth.value = 0.05;
material.uniforms.uPointRadius.value = 1;
material.uniforms.uSpeed.value = 0.1;

const blotter = new Blotter(material, {
  texts: text,
});

const scope = blotter.forText(text);

mainEl.innerHTML = '';
scope.appendTo(mainEl);

function animateUniform(key, toValue, speed = 0.5) {
  function step() {
    const current = material.uniforms[key].value;
    const delta = toValue - current;
    if (Math.abs(delta) > 0.0001) {
      material.uniforms[key].value += delta * speed;
      requestAnimationFrame(step);
    } else {
      material.uniforms[key].value = toValue;
    }
  }
  step();
}

mainEl.addEventListener('mouseenter', () => {
  animateUniform('uPointCellWidth', 0.001);
  animateUniform('uPointRadius', 0.8);
  animateUniform('uSpeed', 1);

});

mainEl.addEventListener('mouseleave', () => {
  animateUniform('uPointCellWidth', 0.05);
  animateUniform('uPointRadius', 1);
  animateUniform('uSpeed', 0.1);
});


