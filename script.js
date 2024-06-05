document .getElementById("estimateForm") .addEventListener("submit", function (event) { 
  event.preventDefault(); 

    var errors = [];
    var name = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var ccinfo = document.getElementById("ccinfo").value;
    var ccmonth = document.getElementById("ccmonth").value;
    var ccyear = document.getElementById("ccyear").value;

    // Validation
    if (!name) {
      errors.push("Name is required.");
    }

    if (!email) {
      errors.push("Email is required.");
    }

    var ccinfoPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!ccinfoPattern.test(ccinfo)) {
      errors.push("Credit card information is not in the correct format.");
    }

    var ccmonthPattern = /^(0[1-9]|1[0-2])-(0[1-9]|1[0-2])$/;
    if (!ccmonthPattern.test(ccmonth)) {
      errors.push("Credit card expiry month is not in the correct format.");
    }

    var ccyearPattern = /^\d{4}$/;
    if (!ccyearPattern.test(ccyear)) {
      errors.push("Credit card expiry year is not in the correct format.");
    }

    var items = ["item1", "item2", "item3", "item4", "item5"];
    var itemNames = ["Water Bottle", "Caps", "Pens", "Candy bags", "Cupcakes"];
    var itemValues = [5, 20, 2, 10, 3]; // Replace these values with the actual values of your items
    for (var i = 0; i < items.length; i++) {
      var value = document.getElementById("item" + (i + 1)).value;
      if (value === "") {
        value = "0";
      }
      if (!/^\d+$/.test(value)) {
        errors.push("Item " + (i + 1) + " value is not in the correct format.");
      }
    }

    var errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";
    if (errors.length > 0) {
      errorsDiv.innerHTML = errors.join("<br>");
      return;
    }

    // Receipt generation

    function displayReceipt() {
      var receiptTable = document.getElementById("receipt");
      receiptTable.innerHTML = ""; // Clear the table

      // User information table
      var userInfoTable = document.createElement("table");
      userInfoTable.className = "user-info";
      userInfoTable.innerHTML += "<tr><td>Name</td><td>" + name + "</td></tr>";
      userInfoTable.innerHTML += "<tr><td>Email</td><td>" + email + "</td></tr>";
      userInfoTable.innerHTML += "<tr><td>Credit Card Info</td><td>****-****-****-" + ccinfo.slice(-4) + "</td></tr>";

      receiptTable.appendChild(userInfoTable);

      // Items table
      var itemsTable = document.createElement("table");
      itemsTable.innerHTML += "<tr><th>Item</th><th>Quantity</th><th>Unit Price</th><th>Total Price</th></tr>";
      var totalCost = 0;
      for (var i = 0; i < items.length; i++) {
        var quantity = document.getElementById("item" + (i + 1)).value;
        if (quantity > 0) {
          // Check if the quantity is not zero
          var itemCost = itemValues[i] * quantity;
          itemsTable.innerHTML += "<tr><td>" + itemNames[i] + "</td><td>" + quantity + "</td><td>$" + itemValues[i] + "</td><td>$" + itemCost.toFixed(2) + "</td></tr>";
          totalCost += itemCost;
        }
      }

      var donation = Math.max(10, totalCost * 0.1);
      itemsTable.innerHTML += "<tr><td></td><td>Donation</td><td>Minimum</td><td>$" + donation.toFixed(2) + "</td></tr>";
      itemsTable.innerHTML += "<tr><td></td><td></td><td>Total Cost</td><td>$" + totalCost.toFixed(2) + "</td></tr>";

      receiptTable.appendChild(itemsTable);
    }

    if (errors.length > 0) {
      errorsDiv.innerHTML = errors.join("<br>");
      return;
    }

    displayReceipt();
  });

