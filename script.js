
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Add new expense
function addExpense() {
    let name = document.getElementById("expenseName").value;
    let amount = document.getElementById("expenseAmount").value;
    let category = document.getElementById("expenseCategory").value;

    if (name === "" || amount === "") {
        document.getElementById("errorMessage").innerHTML =
            "Please enter expense name and amount.";
        return;
    }

    if (Number(amount) <= 0) {
        document.getElementById("errorMessage").innerHTML =
            "Please enter a valid amount.";
        return;
    }

    let expense = {
        name: name,
        amount: Number(amount),
        category: category
    };

    expenses.push(expense);

    // Save expenses in browser history storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
    clearFields();
}

// Display expense history
function displayExpenses() {
    let list = document.getElementById("expenseList");
    let total = 0;

    list.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;

        list.innerHTML += `
            <tr>
                <td>${expenses[i].name}</td>
                <td>₹${expenses[i].amount}</td>
                <td>${expenses[i].category}</td>
                <td>
                    <button onclick="deleteExpense(${i})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("total").innerHTML = total;
}

// Delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);

    // Update saved history
    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}

// Clear input fields
function clearFields() {
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseCategory").value = "Food";
    document.getElementById("errorMessage").innerHTML = "";
}

// Show previous entries when page opens
displayExpenses();
