let originalWrapper = null;
let originalSpreads = null;
let originalParent = null;
let originalNextSibling = null;
let unwrappedNodes = [];

//fit screen

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

window.addEventListener('load', () => {
  setTimeout(scaleToFit, 50);
});

window.addEventListener('resize', () => {
  scaleToFit();
});

//remove wrapper class

function beforePrint() {
  originalWrapper = document.querySelector('.wrapper');
  if (!originalWrapper) return;

  originalSpreads = originalWrapper.querySelector('.spreads');
  originalParent = originalWrapper.parentNode;
  originalNextSibling = originalWrapper.nextSibling;


  while (originalSpreads.firstChild) {
    const child = originalSpreads.firstChild;
    unwrappedNodes.push(child);
    originalParent.insertBefore(child, originalWrapper);
  }


  originalWrapper.remove();
}

//restore wrapper and children

function afterPrint() {
  if (!originalParent || unwrappedNodes.length === 0) return;

  const newWrapper = document.createElement('div');
  newWrapper.className = 'wrapper';

  const newSpreads = document.createElement('div');
  newSpreads.className = 'spreads';

  unwrappedNodes.forEach((node) => {
    newSpreads.appendChild(node);
  });

  newWrapper.appendChild(newSpreads);
  originalParent.insertBefore(newWrapper, originalNextSibling);

  void document.body.offsetHeight;

  scaleToFit();

  originalWrapper = null;
  originalSpreads = null;
  originalParent = null;
  originalNextSibling = null;
  unwrappedNodes = [];
}


//print

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

  return `${day.toString().padStart(2, '0')}-${months[month]}-${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}

updateDate();

//interaction page 6

const socket = io("https://live-text-backend.onrender.com");

const input = document.getElementById("inputSix");
const btn = document.getElementById("buttonSix");

const copyTextSix = document.getElementById("copyTextSix");
const copyDateSix = document.getElementById("copyDateSix");

const changeSix = document.querySelectorAll(".changeSix");

function submitEntry() {
  const text = input.textContent.trim();
  if (!text) return;

  const timestamp = updateDate();

  changeSix.forEach(el => {
    el.textContent = text || "*";
  })

  const textElSix = document.createElement("p");
  textElSix.textContent = text;
  copyTextSix.prepend(textElSix);

  const dateElSix = document.createElement("p");
  dateElSix.textContent = timestamp;
  copyDateSix.prepend(dateElSix);


  socket.emit("new-entry-6", {
    text,
    date: timestamp,
  });


  input.textContent = "";
}

btn.addEventListener("click", submitEntry);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    submitEntry();
  }
});

//live server page 6
socket.on("new-entry-6", ({ text, date }) => {
  const textElSix = document.createElement("p");
  textElSix.textContent = text;
  copyTextSix.prepend(textElSix);

  const dateElSix = document.createElement("p");
  dateElSix.textContent = date;
  copyDateSix.prepend(dateElSix);
});

socket.on("entry-history-6", (history) => {
  history.forEach(({ text, date }) => {
    const textElSix = document.createElement("p");
    textElSix.textContent = text;
    copyTextSix.appendChild(textElSix);

    const dateElSix = document.createElement("p");
    dateElSix.textContent = date;
    copyDateSix.appendChild(dateElSix);
  });
});


//interaction page eight

const symbolEl = document.getElementById("symbol");
const symbolCopyEls = document.querySelectorAll(".symbolCopy");
const symbolCopyTwoEls = document.querySelectorAll(".symbolCopyTwo");

const characters = ["✛", "✲", "✳", "✴", "✶", "✷", "✹", "✺"];

const pageEight = document.querySelector(".pageEight");
const pageNine = document.querySelector(".pageNine");

function getCombinedBounds() {
  const rectEight = pageEight.getBoundingClientRect();
  const rectNine = pageNine.getBoundingClientRect();

  const left = Math.min(rectEight.left, rectNine.left);
  const right = Math.max(rectEight.right, rectNine.right);
  const width = right - left;

  return { left, right, width };
}

window.addEventListener("mousemove", (event) => {
  const { left, right, width } = getCombinedBounds();
  const mouseX = event.clientX;

  if (mouseX >= left && mouseX <= right) {
    const relativeX = mouseX - left;
    const index = Math.floor((relativeX / width) * characters.length);
    const clampedIndex = Math.min(index, characters.length - 1);

    symbolEl.textContent = characters[clampedIndex];
  }
});

window.addEventListener("mousedown", (event) => {
  if (pageEight.contains(event.target) || pageNine.contains(event.target)) {
    symbolCopyTwoEls.forEach((el, i) => {
      const copyEl = symbolCopyEls[i];
      if (copyEl) {
        el.textContent = copyEl.textContent;
      }
    });

    setTimeout(() => {
      symbolCopyEls.forEach((el) => {
        el.textContent = symbolEl.textContent;
      });
    }, 10);
  }
});
