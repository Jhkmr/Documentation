let originalWrapper = null;
let originalSpreads = null;
let originalParent = null;
let originalNextSibling = null;
let unwrappedNodes = [];

// -------------------------------
// 1. SCALE TO FIT SCREEN
// -------------------------------
function scaleToFit() {
  const wrapper = document.querySelector('.wrapper');
  const page = document.querySelector('.spreads');

  if (!wrapper || !page) return;

  const pageHeight = page.offsetHeight;
  const scale = window.innerHeight / pageHeight / 1.25;

  wrapper.style.transform = `scale(${scale})`;

  const pageWidth = page.offsetWidth;
  wrapper.style.left = `${(window.innerWidth - pageWidth * scale) / 2}px`;
}

// On page load and resize
window.addEventListener('load', () => {
  setTimeout(scaleToFit, 50);
});

window.addEventListener('resize', () => {
  scaleToFit();
});

// -------------------------------
// 2. BEFORE PRINT: Remove wrapper + spreads
// -------------------------------
function beforePrint() {
  originalWrapper = document.querySelector('.wrapper');
  if (!originalWrapper) return;

  originalSpreads = originalWrapper.querySelector('.spreads');
  originalParent = originalWrapper.parentNode;
  originalNextSibling = originalWrapper.nextSibling;

  // Move all children from spreads out into the DOM
  while (originalSpreads.firstChild) {
    const child = originalSpreads.firstChild;
    unwrappedNodes.push(child);
    originalParent.insertBefore(child, originalWrapper);
  }

  // Remove the entire wrapper
  originalWrapper.remove();
}

// -------------------------------
// 3. AFTER PRINT: Restore wrapper + spreads and scale
// -------------------------------
function afterPrint() {
  if (!originalParent || unwrappedNodes.length === 0) return;

  const newWrapper = document.createElement('div');
  newWrapper.className = 'wrapper';

  const newSpreads = document.createElement('div');
  newSpreads.className = 'spreads';

  // Re-insert saved children
  unwrappedNodes.forEach((node) => {
    newSpreads.appendChild(node);
  });

  newWrapper.appendChild(newSpreads);
  originalParent.insertBefore(newWrapper, originalNextSibling);

  // Force reflow to fix any layout glitches
  void document.body.offsetHeight;

  // Reapply scaling
  scaleToFit();

  // Reset saved state
  originalWrapper = null;
  originalSpreads = null;
  originalParent = null;
  originalNextSibling = null;
  unwrappedNodes = [];
}

// -------------------------------
// 4. HANDLE PRINT EVENTS
// -------------------------------
if (window.matchMedia) {
  const mediaQueryList = window.matchMedia('print');
  mediaQueryList.addEventListener('change', (mql) => {
    if (mql.matches) {
      beforePrint();
    } else {
      afterPrint();
    }
  });
}

window.addEventListener('beforeprint', beforePrint);
window.addEventListener('afterprint', afterPrint);

//page numbering

document.querySelectorAll('.page-number').forEach((el, i) => {
    const pageNum = (i + 1).toString().padStart(2, '0'); //2 digits
    el.textContent = `${pageNum}`;
  });

//date

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

  const allDateBlocks = document.querySelectorAll('.date.mono, .line.time');

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