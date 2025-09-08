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



//cover 

const titleArray = ["⚲", ";", "∶", "_", "◆", "⋯", "⌀", "∴", "✳", "✴", "✷", "✹", "✺"]

const titleSymbols = document.querySelectorAll('.titleSymbol');

document.addEventListener('click', () => {
    titleSymbols.forEach(span => {
      const randomSymbol = titleArray[Math.floor(Math.random() * titleArray.length)];
      span.textContent = randomSymbol;
    });
  });

//page numbering

document.querySelectorAll('.page-number').forEach((el, i) => {
    const pageNum = (i + 1).toString().padStart(2, '0');
    el.textContent = `${pageNum}`;
  });

//link to page

document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const targetRect = targetEl.getBoundingClientRect();
      const absoluteRight = window.scrollX + targetRect.right;
      const centerX = absoluteRight - (window.innerWidth / 2) + (targetRect.width / 2);

      window.scrollTo({
        left: centerX,
        behavior: 'instant'
      });
    }
  });
});

//page number index

const numberIndex = document.getElementById('numberIndex');
const originalValue = numberIndex.textContent;

const numbers = ["04", "06", "08", "10"];

const contentDate = document.querySelectorAll('.date .scroll-link');
const contentTitle = document.querySelectorAll('.hTitle .scroll-link');

function attachHoverEvents(element, number) {
  element.addEventListener('mouseenter', () => {
    numberIndex.textContent = number;
  });
  element.addEventListener('mouseleave', () => {
    numberIndex.textContent = originalValue;
  });
}

numbers.forEach((number, index) => {
  const pD = contentDate[index];
  const pT = contentTitle[index];

  if (pD) attachHoverEvents(pD, number);
  if (pT) attachHoverEvents(pT, number);
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

  // Collect the updated contents of symbolCopyTwo
  const updatedCopyTwo = Array.from(symbolCopyTwoEls).map(el => el.textContent);

  // Emit the updated array to the server
  socket.emit("update-symbol-copy-two", updatedCopyTwo);
}, 10);
  }
});

//live server page 9

socket.on("update-symbol-copy-two", (newValues) => {
  newValues.forEach((val, i) => {
    if (symbolCopyTwoEls[i]) {
      symbolCopyTwoEls[i].textContent = val;
    }
  });
});

socket.on("init-symbol-copy-two", (initialValues) => {
  initialValues.forEach((val, i) => {
    if (symbolCopyTwoEls[i]) {
      symbolCopyTwoEls[i].textContent = val;
    }
  });
});




// interaction page 11

document.addEventListener('DOMContentLoaded', () => {
  const symbolOutput = document.getElementById('symbolEleven'); // blotter container
  const nameOutputs = document.querySelector('.nameSymbolEleven'); // plain label container (single element)
  const textOutputs = document.querySelectorAll('.changeTen'); // elements to get blotter effect
  const symbolOptions = document.querySelectorAll('.optionEleven p');
  let previouslySelected = null;

  const clickCounts = {};
  let blotter, blotterScope, blotterElement;

  const material = new Blotter.LiquidDistortMaterial();
  material.uniforms.uSpeed.value = 0.005;
  material.uniforms.uVolatility.value = 0.01;

  function updateBlotterText(symbol) {
    const count = clickCounts[symbol] || 0;
    material.uniforms.uSpeed.value = 0.005 + 0.005 * count;
    material.uniforms.uVolatility.value = 0.01 + 0.0025 * count;

    const blotterText = new Blotter.Text(symbol, {
      size: 700,
      fill: '#000',
    });

    // Remove old blotter canvas in #symbolEleven if exists
    if (blotterElement && blotterElement.parentNode) {
      blotterElement.parentNode.removeChild(blotterElement);
    }

    // Create and apply Blotter effect to #symbolEleven
    blotter = new Blotter(material, { texts: blotterText });
    blotterScope = blotter.forText(blotterText);
    blotterScope.appendTo(symbolOutput);
    blotterElement = symbolOutput.querySelector('canvas, svg');

    // Apply blotter effect to each .changeTen element
    textOutputs.forEach(span => {
      // Remove existing blotter canvas/svg inside span
      const existingCanvas = span.querySelector('canvas, svg');
      if (existingCanvas) existingCanvas.remove();

      // Create smaller blotter text for this span
      const smallBlotterText = new Blotter.Text(symbol, {
        size: 50,
        fill: '#000',
      });

      // Create new blotter instance for the span (using same material)
      const smallBlotter = new Blotter(material, { texts: smallBlotterText });
      const smallScope = smallBlotter.forText(smallBlotterText);

      // Append blotter canvas/svg to span
      smallScope.appendTo(span);
      span.classList.add('invisibleTen');
    });
  }

  // Handle <p> clicks
  symbolOptions.forEach(p => {
    p.addEventListener('click', () => {
      const symbol = p.childNodes[0]?.nodeValue.trim();
      const labelSpan = p.querySelector('span');
      const label = labelSpan ? labelSpan.textContent.trim() : '';

      // Update plain label text
      if (symbol) {
        nameOutputs.textContent = label;    
      }

      // Restore previously hidden option if any
      if (previouslySelected) {
        previouslySelected.classList.remove('invisible');
      }
      // Hide current clicked option
      p.classList.add('invisible');
      previouslySelected = p;

      // Emit symbol click event to server
      socket.emit('symbol-clicked', symbol);
    });
  });

  // Listen for initial click counts from server
  socket.on('click-counts', (counts) => {
    Object.assign(clickCounts, counts);
  });

  // Listen for updates and update blotter effect accordingly
  socket.on('symbol-clicks-updated', ({ symbol, count }) => {
    clickCounts[symbol] = count;
    updateBlotterText(symbol);
  });
});
