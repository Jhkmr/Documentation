//scale page

function scaleToFit() {
  const wrapper = document.querySelector('.wrapper');
  const page = document.querySelector('.spreads');

  const pageHeight = page.offsetHeight;

  const scale = window.innerHeight / pageHeight / 1.25;

  wrapper.style.transform = `scale(${scale})`;

  const pageWidth = page.offsetWidth;
  wrapper.style.left = `${(window.innerWidth - pageWidth * scale) / 2}px`;


}


window.addEventListener('load', () => {
  setTimeout(scaleToFit, 50);
});

window.addEventListener('resize', () => {
  console.log('window resize event fired');
  scaleToFit();
});

console.log('scaleToFit function defined:', typeof scaleToFit);



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

const socket = io("https://live-text-backend.onrender.com");

const input = document.getElementById("input");
const btn = document.getElementById("button");
const snap = document.getElementById("snapshot");
const copyText = document.getElementById("copyText");
const copyDate = document.getElementById("copyDate");

const choice = document.querySelector(".choice");
const change = document.querySelector(".change");
const time = document.querySelector(".time");

btn.addEventListener("click", () => {

  updateDate();

  const text = input.textContent.trim();
  const textDate = time.textContent.trim();  
  
  choice.textContent = text || ""; 
  change.textContent = text || "*";

  const p = document.createElement("p");
  p.textContent = text;

  const d = document.createElement("p");
  d.textContent = textDate;

copyText.appendChild(p);
copyDate.appendChild(d);


  socket.emit("new-entry", {
    text,
    date: textDate,
  });

});


//live server
socket.on("new-entry", ({ text, date }) => {
  const p = document.createElement("p");
  p.textContent = text;

  const d = document.createElement("p");
  d.textContent = date;

copyText.appendChild(p);
copyDate.appendChild(d);
});

socket.on("entry-history", (entries) => {
  entries.reverse().forEach(({ text, date }) => {
    const p = document.createElement("p");
    p.textContent = text;

    const d = document.createElement("p");
    d.textContent = date;

copyText.appendChild(p);
copyDate.appendChild(d);
  });
});