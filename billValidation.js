
function addRow() {

    var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
  
    var newRow = table.insertRow(table.rows.length);
    var item = newRow.insertCell(0);
    var qty = newRow.insertCell(1);
    var rate = newRow.insertCell(2);
    var totalrate = newRow.insertCell(3);
    var delbtn = newRow.insertCell(4);
  
    item.innerHTML = '<input type="text" class="item" id="item' + table.rows.length + '">';
    qty.innerHTML = '<input type="number" class="qty" id="qty' + table.rows.length + '" onkeyup="calculateTotal(this)">';
    rate.innerHTML = '<input type="number" class="rate" id="rate' + table.rows.length + '" onkeyup="calculateTotal(this)">';
    totalrate.innerHTML = '<input type="number" class="totalrate" id="totalrate' + table.rows.length + '" >';
    delbtn.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
  }
  
  //delbtn
  function deleteRow(button) {
    var row = button.closest('tr');
    row.parentNode.removeChild(row);
    calculateGrandTotal();
  
  }
  
  function calculateTotal(input) {
    var row = input.closest('tr');
    var qty = parseFloat(row.querySelector('.qty').value) || 0;
    var rate = parseFloat(row.querySelector('.rate').value) || 0;
    var total = qty * rate;
  
    row.querySelector('.totalrate').value = total.toFixed(2);
  
    calculateGrandTotal();
  
  }
  
  function calculateGrandTotal() {
    var tableRows = document.getElementById("myTable").getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var grandTotal = 0;
  
    for (var i = 0; i < tableRows.length; i++) {
      var totalrate = parseFloat(tableRows[i].querySelector('.totalrate').value) || 0;
      grandTotal += totalrate;
  
    }
  
    document.getElementById("grandTotalDisplay").value = grandTotal.toFixed(2);
  }
  
  
  