const socket = io("https://live-text-backend.onrender.com");
    const grid = document.getElementById('grid');

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
        el.style.left = `${x * 10}px`;
        el.style.top = `${y * 16}px`;
        grid.appendChild(el);
      }
      el.textContent = char;
    }

    grid.addEventListener('click', e => {
      const x = Math.floor(e.clientX / 10);
      const y = Math.floor(e.clientY / 16);
      const char = prompt("Enter a character:");
      if (char && char.length > 0) {
        const pos = `${x},${y}`;
        drawChar(pos, char[0]);
        socket.emit('edit', { position: pos, char: char[0] });
      }
    });