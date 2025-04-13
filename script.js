document.addEventListener('DOMContentLoaded', function () {
  // Function to remove and add alt row classes
  let updateAltRowClasses = function () {
    let rows = document.querySelectorAll('tbody tr');
    rows.forEach(function(row, index) {
      row.classList.remove('table-row-odd'); // remove all alt row classes
      if (index % 2 !== 0) {
        row.classList.add('table-row-odd'); // add class to alt rows
      }
    });
  };

  updateAltRowClasses(); // Run function to add classes to alternating table rows

  // Toggle-able row functionality (only on clicking td except the one with class "desc")
  let tableRows = document.querySelectorAll('tbody tr');
  tableRows.forEach(function(row) {
    row.addEventListener('click', function (event) {
      // Check if the clicked element is a td that is not the one with class "desc"
      if (event.target && !event.target.classList.contains('desc') && event.target.tagName === 'TD') {
        let hiddenRow = row.nextElementSibling;
        let rowExists = hiddenRow && hiddenRow.classList.contains('hidden-row');

        if (rowExists) {
          // Hide all other open toggle-able rows
          document.querySelectorAll('tbody .hidden-row').forEach(function(hidden) {
            if (hidden !== hiddenRow) {
              hidden.style.display = 'none';
            }
          });
          // Toggle the row on and off
          hiddenRow.style.display = hiddenRow.style.display === 'none' ? '' : 'none';
        } else {
          // Grab this row's hidden content
          let expRowContent = row.querySelector('.hide').innerHTML;
          let newExpRow = document.createElement('tr');
          newExpRow.classList.add('hidden-row');
          newExpRow.style.display = 'none';
          let newCell = document.createElement('td');
          newCell.setAttribute('colspan', '5');
          newCell.innerHTML = expRowContent;
          newExpRow.appendChild(newCell);
          row.parentNode.insertBefore(newExpRow, row.nextElementSibling);

          // Hide all open toggle-able rows
          document.querySelectorAll('tbody .hidden-row').forEach(function(hidden) {
            if (hidden !== newExpRow) {
              hidden.style.display = 'none';
            }
          });
          // Toggle the new row
          newExpRow.style.display = '';
        }
      }
    });
  });

  // Initialize list.js functionality for sorting
  let options = {
    valueNames: ['numb', 'name', 'type', 'desc'],
    page: 100, // to avoid pagination, set to a large number or remove it entirely
    searchClass: 'search' // adds search functionality if needed
  };

  let userList = new List('breeze-transaction-list', options);

  // Update alternate row classes after every new sort
  userList.on('updated', updateAltRowClasses);
});
