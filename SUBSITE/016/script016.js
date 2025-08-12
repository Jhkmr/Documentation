//page numbering

document.querySelectorAll('.page-number').forEach((el, i) => {
    const pageNum = (i + 1).toString().padStart(2, '0'); // Convert to 2-digit string
    el.textContent = `p. ${pageNum}`;
  });

function updateDate() {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();


  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];

  const allDateBlocks = document.querySelectorAll('.date.header, .line.time');

  allDateBlocks.forEach(block => {
    const dayEl = block.querySelector('.day');
    const monthEl = block.querySelector('.month');
    const yearEl = block.querySelector('.year');
    const hourEl = block.querySelector('.hour');
    const minuteEl = block.querySelector('.minute');
    const secondEl = block.querySelector('.second');

    if (dayEl) dayEl.textContent = day.toString().padStart(2, '0');
    if (monthEl) monthEl.textContent = months[month];
    if (yearEl) yearEl.textContent = year;
    if (hourEl) hourEl.textContent = hour.toString().padStart(2, '0');
    if (minuteEl) minuteEl.textContent = minute.toString().padStart(2, '0');
    if (secondEl) secondEl.textContent = second.toString().padStart(2, '0');
  });
}

updateDate();

//interaction
