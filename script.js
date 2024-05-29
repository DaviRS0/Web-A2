document.getElementById('estimateForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission event
  
    var errors = [];
    var name = document.getElementById('fname').value;
    var email = document.getElementById('email').value;
    var ccinfo = document.getElementById('ccinfo').value;
    var ccmonth = document.getElementById('ccmonth').value;
    var ccyear = document.getElementById('ccyear').value;
  
    // Validation
    if (!name) {
      errors.push('Name is required.');
    }
  
    if (!email) {
      errors.push('Email is required.');
    }
  
    var ccinfoPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!ccinfoPattern.test(ccinfo)) {
      errors.push('Credit card information is not in the correct format.');
    }
  
    var ccmonthPattern = /^(0[1-9]|1[0-2])-(0[1-9]|1[0-2])$/;
    if (!ccmonthPattern.test(ccmonth)) {
      errors.push('Credit card expiry month is not in the correct format.');
    }
  
    var ccyearPattern = /^\d{4}$/;
    if (!ccyearPattern.test(ccyear)) {
      errors.push('Credit card expiry year is not in the correct format.');
    }
  
    var items = ['item1', 'item2', 'item3', 'item4', 'item5'];
    var itemNames = ['Water Bottle', 'Caps', 'Pens', 'Candy bags', 'Cupcakes'];
    for (var i = 0; i < items.length; i++) {
      var value = document.getElementById('item' + (i + 1)).value;
      if (!/^\d+$/.test(value)) {
        errors.push('Item ' + (i + 1) + ' value is not in the correct format.');
      }
    }
  
    var errorsDiv = document.getElementById('errors');
    errorsDiv.innerHTML = '';
    if (errors.length > 0) {
      errorsDiv.innerHTML = errors.join('<br>');
      return;
    }
  
    // Receipt generation

    function displayReceipt() {
    var receiptTable = document.getElementById('receipt');
    receiptTable.innerHTML = ''; // Clear the table
  
    receiptTable.innerHTML += '<tr><td>Name</td><td>' + name + '</td></tr>';
    receiptTable.innerHTML += '<tr><td>Email</td><td>' + email + '</td></tr>';
    receiptTable.innerHTML += '<tr><td>Credit Card Info</td><td>****-****-****-' + ccinfo.slice(-4) + '</td></tr>';
  
    var totalCost = 0;
  for (var i = 0; i < items.length; i++) {
    var quantity = document.getElementById('item' + (i + 1)).value;
    if (quantity) {
      receiptTable.innerHTML += '<tr><td>' + itemNames[i] + '</td><td>' + quantity + '</td></tr>';
      totalCost += Number(quantity); // Add the quantity to the total cost
    }
    }
  
    var donation = Math.max(10, totalCost * 0.1);
    receiptTable.innerHTML += '<tr><td>Total Cost</td><td>$' + totalCost.toFixed(2) + '</td></tr>';
    receiptTable.innerHTML += '<tr><td>Donation</td><td>$' + donation.toFixed(2) + '</td></tr>';
}

if (errors.length > 0) {
    errorsDiv.innerHTML = errors.join('<br>');
    return;
  }

  displayReceipt();
});

//Missing features 
//Seaparte items - quantity - unit price - total price