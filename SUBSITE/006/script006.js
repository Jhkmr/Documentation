const socket = io("https://your-backend.onrender.com"); // Replace with your backend URL
    const grid = document.getElementById("grid");
    const input = document.getElementById("hiddenInput");

    let cursor = { x: 0, y: 0 };

    // Style hidden input
    input.style.position = 'absolute';
    input.style.opacity = '0';
    input.style.left = '0';
    input.style.top = '0';

    socket.on('init', data => {
      for (let pos in data) drawChar(pos, data[pos]);
    });

    socket.on('edit', data => {
      drawChar(data.position, data.char);
    });

    function drawChar(pos, char) {
      const [x, y] = pos.split(',').map(Number);
      let el = document.getElementById(pos);
      if (!el) {
        el = document.createElement('div');
        el.className = 'char';
        el.id = pos;
        el.style.position = 'absolute';
        el.style.left = `${x * 10}px`;
        el.style.top = `${y * 16}px`;
        el.style.fontFamily = 'monospace';
        el.style.fontSize = '14px';
        el.textContent = char;
        grid.appendChild(el);
      } else {
        el.textContent = char;
      }
    }

    grid.addEventListener('click', (e) => {
      cursor.x = Math.floor(e.clientX / 10);
      cursor.y = Math.floor(e.clientY / 16);
      input.focus();
    });

    input.addEventListener('input', (e) => {
      const chars = e.target.value;
      for (let i = 0; i < chars.length; i++) {
        const pos = `${cursor.x},${cursor.y}`;
        drawChar(pos, chars[i]);
        socket.emit('edit', { position: pos, char: chars[i] });
        cursor.x += 1; // Move cursor to right
      }
      e.target.value = '';
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        cursor.x = Math.max(0, cursor.x - 1);
        const pos = `${cursor.x},${cursor.y}`;
        drawChar(pos, ' ');
        socket.emit('edit', { position: pos, char: ' ' });
        e.preventDefault();
      } else if (e.key === 'Enter') {
        cursor.x = 0;
        cursor.y += 1;
        e.preventDefault();
      }
    });
