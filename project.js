import { v4 as uuidv4 } from "https://jspm.dev/uuid";
const incomesList = document.querySelector("#incomesList"); //lista ul z przychodami
const expensesList = document.querySelector("#expensesList"); //lista ul z wydatkami
const incomesForm = document.querySelector("#incomesForm"); //formularz do podawania przychodu
const expensesForm = document.querySelector("#expensesForm"); //formularz do podawania wydatków
const incomeTitle = document.querySelector("#incomeTitle"); //tytuł przychodu
const expenseTitle = document.querySelector("#expenseTitle"); //tytuł wydatku
const incomeValue = document.querySelector("#incomeValue"); //wartość przychodu
const expenseValue = document.querySelector("#expenseValue"); //wartość wydatku
const incomesSumSpan = document.querySelector("#incomes_value"); //span do "wyplucia sumy dochodów"
const expensesSumSpan = document.querySelector("#expenses_value"); //span do "wyplucia sumy wydatków"
const balanceInfo = document.getElementById("balance_info"); //Informacja o stanie konta

const incomes = []; //W tej tablicy będą zapisywane dochody
const expenses = []; //W tej tablicy będą zapisywane wydatki

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

  incomeTitle.value = "";
  incomeValue.value = "";

  editBtn.addEventListener("click", function () {
    editIncome(income);
  });

  removeBtn.addEventListener("click", function () {
    deleteIncome();
  });
}

function editIncome(income) {

  const targetLi = document.getElementById(`${income.id}`); //income.id = li.id (identyfikator elementu listy)
  const paragraphWithTitle = targetLi.querySelector("p"); //złapanie paragrafu, w którym jest tytuł przychodu
  const spanWithValue = targetLi.querySelector("span"); //złapanie span, w którym jest kwota przychodu

  paragraphWithTitle.setAttribute("contenteditable", "true"); 
  spanWithValue.setAttribute("contenteditable", "true"); 

  const divForBtns = document.createElement("div");

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Zapisz";
  saveBtn.classList.add("edit_button", "list_item_button");

  divForBtns.appendChild(saveBtn);

  const doNotSaveButton = document.createElement("button");
  doNotSaveButton.innerText = "Nie zapisuj";
  doNotSaveButton.classList.add("delete_button", "list_item_button");

  divForBtns.appendChild(doNotSaveButton);

  targetLi.appendChild(divForBtns);

  const btnDiv = document.getElementsByClassName("item--buttons_container")[0]; 
  btnDiv.setAttribute("style", "display: none;");

  saveBtn.addEventListener("click", function () {

    income.title = paragraphWithTitle.innerText;
    income.amount = Number(spanWithValue.innerText); 

    paragraphWithTitle.setAttribute("contenteditable", "false"); 
    spanWithValue.setAttribute("contenteditable", "false");

    targetLi.removeChild(divForBtns);
    btnDiv.setAttribute("style", "display: block;");

    renderIncomesList();
    sumAll();         
  });

  // doNotSaveButton.addEventListener("click", () => {

  // })
}

function deleteIncome() {
  incomes.filter((income) => {
    incomes.splice(income, 1);
  });
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
    deleteExpense();
  });
}

function editExpense(expense) {
  const targetLi = document.getElementById(`${expense.id}`);
  const paragraphWithTitle = targetLi.querySelector("p");
  const spanWithValue = targetLi.querySelector("span");
  const editBtn = document.getElementsByClassName("edit_button")[0];
  const deleteBtn = document.getElementsByClassName("delete_button")[0];

  paragraphWithTitle.setAttribute("contenteditable", "true");
  spanWithValue.setAttribute("contenteditable", "true");

  const divForBtns = document.createElement("div"); 

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Zapisz";
  saveBtn.classList.add("edit_button", "list_item_button");

  divForBtns.appendChild(saveBtn);

  const doNotSaveButton = document.createElement("button");
  doNotSaveButton.innerText = "Nie zapisuj";
  doNotSaveButton.classList.add("delete_button", "list_item_button");

  divForBtns.appendChild(doNotSaveButton);

  targetLi.appendChild(divForBtns);

  editBtn.setAttribute("style", "display: none");
  deleteBtn.setAttribute("style", "display: none");

  const btnDiv = document.getElementsByClassName("item--buttons_container")[0];
  btnDiv.setAttribute("style", "display: none;");

  saveBtn.addEventListener("click", () => {

    expense.title = paragraphWithTitle.innerText;
    expense.amount = Number(spanWithValue.innerText);

    paragraphWithTitle.setAttribute("contenteditable", "false");
    spanWithValue.setAttribute("contenteditable", "false");

    targetLi.removeChild(divForBtns);
    btnDiv.setAttribute("style", "display: block;");

  })

  // doNotSaveButton.addEventListener("click", () => {

  // })
}

function deleteExpense() {
  expenses.filter((expense) => {
    expenses.splice(expense, 1);
  });

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