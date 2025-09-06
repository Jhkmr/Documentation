document.addEventListener('DOMContentLoaded', function () {
  // Function to remove and add alt row classes
  let updateAltRowClasses = function () {
    let rows = document.querySelectorAll('tbody tr');
    rows.forEach(function(row, index) {
      row.classList.remove('table-row-odd');
      if (index % 2 !== 0) {
        row.classList.add('table-row-odd');
      }
    });
  };

  updateAltRowClasses(); 


  let tableRows = document.querySelectorAll('tbody tr');
  tableRows.forEach(function(row) {
    row.addEventListener('click', function (event) {
      if (event.target && event.target.tagName === 'A' && event.target.closest('.description')) {
        let hiddenRow = row.nextElementSibling;
        let rowExists = hiddenRow && hiddenRow.classList.contains('hidden-row');

        if (rowExists) {
          document.querySelectorAll('tbody .hidden-row').forEach(function(hidden) {
            if (hidden !== hiddenRow) {
              hidden.style.display = 'none';
            }
          });
          // toggle row
          hiddenRow.style.display = hiddenRow.style.display === 'none' ? '' : 'none';
        } else {
          let expRowContent = row.querySelector('.hide').innerHTML;
          let newExpRow = document.createElement('tr');
          newExpRow.classList.add('hidden-row');
          newExpRow.style.display = 'none';
          let newCell = document.createElement('td');
          newCell.classList.add('buffer');
          newCell.setAttribute('colspan', '7');
          newCell.innerHTML = expRowContent;
          newExpRow.appendChild(newCell);
          row.parentNode.insertBefore(newExpRow, row.nextElementSibling);

          // hide all rows
          document.querySelectorAll('tbody .hidden-row').forEach(function(hidden) {
            if (hidden !== newExpRow) {
              hidden.style.display = 'none';
            }
          });
          newExpRow.style.display = '';
        }
      }
    });
  });

  document.querySelectorAll('.clickable-row').forEach(row => {
    row.addEventListener('click', function (event) {
      if (event.target.closest('.toggle')) {
        return;
      }

      const href = row.dataset.href;
      if (href) {
        window.open(href, '_blank');
      }
    });
  });

  // Initialize list.js functionality for sorting
  let options = {
    valueNames: ['numb', 'name', 'typeOne', 'typeTwo','typeThree','typeFour', 'description'],
    page: 100, // to avoid pagination, set to a large number or remove it entirely
    searchClass: 'search' // adds search functionality if needed
  };

  let userList = new List('filter-list', options);

  // Update alternate row classes after every new sort
  userList.on('updated', updateAltRowClasses);
});
