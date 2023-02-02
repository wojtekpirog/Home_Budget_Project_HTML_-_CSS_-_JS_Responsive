import { v4 as uuidv4 } from "https://jspm.dev/uuid";
const incomesList = document.querySelector("#incomesList"); 
const expensesList = document.querySelector("#expensesList"); 
const incomesForm = document.querySelector("#incomesForm"); 
const expensesForm = document.querySelector("#expensesForm"); 
const incomeTitle = document.querySelector("#incomeTitle"); 
const expenseTitle = document.querySelector("#expenseTitle"); 
const incomeValue = document.querySelector("#incomeValue"); 
const expenseValue = document.querySelector("#expenseValue"); 
const incomesSumSpan = document.querySelector("#incomes_value"); 
const expensesSumSpan = document.querySelector("#expenses_value"); 
const balanceInfo = document.getElementById("balance_info"); 

const incomes = []; 
const expenses = [];

/*** DODAWANIE DOCHODÓW ***/

function addIncome(income) {
  const li = document.createElement("li");
  li.id = income.id;
  li.classList = "flex budget_list_item";

  const paragraph = document.createElement("p");
  paragraph.innerText = income.title;

  const span = document.createElement("span");
  span.innerText = income.amount;

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("item--buttons_container");

  const editBtn = document.createElement("button");
  editBtn.classList = "list_item_button edit_button";
  editBtn.innerText = "Edytuj";

  const removeBtn = document.createElement("button");
  removeBtn.classList = "list_item_button delete_button";
  removeBtn.innerText = "Usuń";

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(removeBtn);

  li.appendChild(paragraph);
  li.appendChild(span);
  li.appendChild(btnContainer);

  incomesList.appendChild(li);

  editBtn.addEventListener("click", function () {
    editIncome(income);
  });

  removeBtn.addEventListener("click", function () {
    deleteIncome(income);
  });
}

function editIncome(income) {
  const incomeIndex = incomes.indexOf(income); 

  const targetLi = document.getElementById(`${income.id}`); 
  const paragraphWithTitle = targetLi.querySelector("p"); 
  const spanWithValue = targetLi.querySelector("span"); 

  paragraphWithTitle.setAttribute("contenteditable", "true"); 
  spanWithValue.setAttribute("contenteditable", "true"); 

  const divForBtns = document.createElement("div");

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Zapisz";
  saveBtn.classList = "edit_button list_item_button";

  divForBtns.appendChild(saveBtn);

  const doNotSaveButton = document.createElement("button");
  doNotSaveButton.innerText = "Nie zapisuj";
  doNotSaveButton.classList = "delete_button list_item_button";

  divForBtns.appendChild(doNotSaveButton);

  targetLi.appendChild(divForBtns);
 
  const btnDiv = document.getElementsByClassName("item--buttons_container")[incomeIndex];
  targetLi.removeChild(btnDiv); 

  saveBtn.addEventListener("click", function () {
    income.title = paragraphWithTitle.innerText;
    income.amount = Number(spanWithValue.innerText); 

    paragraphWithTitle.setAttribute("contenteditable", "false"); 
    spanWithValue.setAttribute("contenteditable", "false");

    targetLi.removeChild(divForBtns);
    targetLi.appendChild(btnDiv);

    renderIncomesList();
    sumAll();         
  });

  doNotSaveButton.addEventListener("click", function () {
    paragraphWithTitle.setAttribute("contenteditable", "false"); 
    spanWithValue.setAttribute("contenteditable", "false"); 
    
    targetLi.removeChild(divForBtns);
    targetLi.appendChild(btnDiv);

    renderIncomesList();
    sumAll();    
  })
}

function deleteIncome(income) {
  const index = incomes.indexOf(income);
  incomes.splice(incomes[index], 1);
  renderIncomesList();
  sumAll();
}

function renderIncomesList() {
  incomesList.innerHTML = "";
  incomes.forEach((income) => {
    addIncome(income);
  });
}

function addNewIncome() {
  const newIncome = {
    title: incomeTitle.value,
    amount: Number(incomeValue.value),
    id: uuidv4(),
  };

  if (!newIncome.amount) {
    alert("Podaj kwotę przychodu!");
  } else if (newIncome.amount > 0) {
    if (!newIncome.title) {
      alert("Podaj tytuł Twojego przychodu!");
    } else {
      incomes.push(newIncome); 
    }
  } else {
    alert("Podaj liczbę większą od zera!");
  }

  sumAll();
  renderIncomesList();
}

incomesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewIncome();
});

/*** DODAWANIE WYDATKÓW ***/

function addExpense(expense) {
  const li = document.createElement("li");
  li.id = expense.id;
  li.classList = "flex budget_list_item";

  const paragraph = document.createElement("p");
  paragraph.innerText = expense.title;

  const span = document.createElement("span");
  span.innerText = expense.amount;

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("item--buttons_container");

  const editBtn = document.createElement("button");
  editBtn.classList = "list_item_button edit_button";
  editBtn.innerText = "Edytuj";

  const removeBtn = document.createElement("button");
  removeBtn.classList = "list_item_button delete_button";
  removeBtn.innerText = "Usuń";

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(removeBtn);

  li.appendChild(paragraph);
  li.appendChild(span);
  li.appendChild(btnContainer);

  expensesList.appendChild(li);

  editBtn.addEventListener("click", function () {
    editExpense(expense);
  });

  removeBtn.addEventListener("click", function () {
    deleteExpense(expense);
  });
}

function editExpense(expense) {
  const expenseIndex = expenses.indexOf(expense); 

  const targetLi = document.getElementById(`${expense.id}`);
  const paragraphWithTitle = targetLi.querySelector("p");
  const spanWithValue = targetLi.querySelector("span");

  paragraphWithTitle.setAttribute("contenteditable", "true");
  spanWithValue.setAttribute("contenteditable", "true");

  const divForBtns = document.createElement("div"); 

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Zapisz";
  saveBtn.classList = "edit_button list_item_button";

  divForBtns.appendChild(saveBtn);

  const doNotSaveButton = document.createElement("button");
  doNotSaveButton.innerText = "Nie zapisuj";
  doNotSaveButton.classList = "delete_button list_item_button";

  divForBtns.appendChild(doNotSaveButton);

  targetLi.appendChild(divForBtns);

  const btnDiv = document.getElementsByClassName("item--buttons_container")[expenseIndex];
  targetLi.removeChild(btnDiv);

  saveBtn.addEventListener("click", function () {
    expense.title = paragraphWithTitle.innerText;
    expense.amount = Number(spanWithValue.innerText);

    paragraphWithTitle.setAttribute("contenteditable", "false");
    spanWithValue.setAttribute("contenteditable", "false");

    targetLi.removeChild(divForBtns);
    targetLi.appendChild(btnDiv);

    renderExpensesList();
    sumAll();    
  })

  doNotSaveButton.addEventListener("click", function () {
    paragraphWithTitle.setAttribute("contenteditable", "false");
    spanWithValue.setAttribute("contenteditable", "false");

    targetLi.removeChild(divForBtns);
    targetLi.appendChild(btnDiv);

    renderExpensesList();
    sumAll();
  })
}

function deleteExpense(expense) {
  const index = expenses.indexOf(expense);
  expenses.splice(expenses[index], 1); 
  renderExpensesList();
  sumAll();
}

function renderExpensesList() {
  expensesList.innerHTML = "";
  expenses.forEach((expense) => {
    addExpense(expense);
  });
  expenseTitle.value = "";
  expenseValue.value = "";
}

function sumAll() {
  let sumOfIncomes = 0; 

  incomes.forEach((income) => {
    sumOfIncomes += income.amount;
    return sumOfIncomes;    
  });
  incomesSumSpan.innerText = sumOfIncomes;

  let sumOfExpenses = 0;

  expenses.forEach((expense) => {
    sumOfExpenses += expense.amount;
    return sumOfExpenses;    
  });
  expensesSumSpan.innerText = sumOfExpenses;

  const difference = calculateDifference(sumOfIncomes, sumOfExpenses);

  toggleText(difference);
}

function calculateDifference(sumOfIncomes, sumOfExpenses) {
  return sumOfIncomes - sumOfExpenses;
}

function toggleText(difference) {
  if (difference > 0) {
    balanceInfo.classList = "text-center state positive";
    balanceInfo.innerHTML = `Możesz jeszcze wydać ${difference} złotych.`;   
  } else if (difference === 0) {
    balanceInfo.classList = "text-center state zero";
    balanceInfo.innerHTML = "Bilans wynosi zero.";   
  } else {
    balanceInfo.innerHTML = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(difference)} złotych.`;
    balanceInfo.classList = "text-center state negative";
  }
}

function addNewExpense() {
  const newExpense = {
    title: expenseTitle.value,
    amount: Number(expenseValue.value),
    id: uuidv4(), 
  };

  if (!newExpense.amount) {
    alert("Podaj kwotę wydatku!");
  } else if (newExpense.amount > 0) {
    if (!newExpense.title) {
      alert("Podaj tytuł Twojego wydatku!");
    } else {
      expenses.push(newExpense);
    }
  } else {
    alert("Podaj liczbę większą od zera!");
  }

  renderExpensesList();
  sumAll();
}

expensesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewExpense();
});