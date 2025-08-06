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



