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

const feImage = document.querySelector('#bloatFilter feImage');
const main = document.querySelector('.main');
const radius = 100; 

// Create a radial gradient canvas
const size = radius * 2;
const canvas = document.createElement('canvas');
canvas.width = size;
canvas.height = size;
const ctx = canvas.getContext('2d');


const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
gradient.addColorStop(0, 'rgb(128,128,255)'); // Center: Blue (displace outward)
gradient.addColorStop(1, 'rgb(128,128,128)'); // Edges: Neutral

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, size, size);


const url = canvas.toDataURL();
feImage.setAttribute('href', url);
feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', url); 

main.addEventListener('mousemove', (e) => {
	const rect = main.getBoundingClientRect();
	const x = e.clientX - rect.left - radius;
	const y = e.clientY - rect.top - radius;

	feImage.setAttribute('x', x);
	feImage.setAttribute('y', y);
	feImage.setAttribute('width', size);
	feImage.setAttribute('height', size);
});


