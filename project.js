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
const balanceInfo = document.querySelector("#balanceInfo"); //Informacja o stanie konta

const incomes = []; //W tej tablicy będą zapisywane dochody
const expenses = []; //W tej tablicy będą zapisywane wydatki

/*** DODAWANIE DOCHODÓW ***/

//Funkcja tworząca wizualny element listy (i wstawiająca do do listy ul z przychodami):
function addIncome(income) {
  //zadaniem tej funkcji będzie tworzenie elementów listy (tutaj argument 'income' jest obiektem w tablicy 'incomes')
  const li = document.createElement("li");
  li.id = income.id;
  li.classList = "flex budget_list_item";

  const paragraph = document.createElement("p");
  paragraph.innerText = income.title;

  const span = document.createElement("span");
  span.innerText = income.amount;

  const btnContainer = document.createElement("div");

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
  //funkcja do edytowania elementu listy incomesList
  editBtn.addEventListener("click", function () {
    editItem(income);
  });
  //funkcja do usuwania elementu listy incomesList
  removeBtn.addEventListener("click", function () {
    deleteItem();
  });
}

function editItem(income) {
  console.log(income);
}

function deleteItem() {
  incomes.filter((income) => {
    incomes.splice(income, 1);
  });

  renderIncomesList();
  sumIncomes();
}

// function deleteItem(income) {
//   console.log(income);
//   incomes.filter((item) => {
//     return income.id !== item.id;
//   });
//   renderIncomesList();
//   sumIncomes();
// }

//funkcja sumująca wszystkie income.amount z incomes i dodająca je do zmiennej sumOfIncomes

function sumIncomes() {
  let sumOfIncomes = 0; // zmienna pomocnicza - przechowuje sumę przychodów
  incomes.forEach((income) => {
    sumOfIncomes += income.amount;
  });
  incomesSumSpan.innerText = sumOfIncomes;
}
//funkcja renderująca listę (wyświetlająca listę w body)
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
      incomes.push(newIncome); //Dodanie obiektu do tablicy
    }
  } else {
    alert("Podaj liczbę większą od zera!");
  }
  //Teraz newIncome (jako obiekt) jest już w tablicy incomes
  //Za każdym razem, gdy zostanie dodany nowy przychód do Array, należy wyrenderować listę, a następnie zsumować wartości.
  sumIncomes();
  renderIncomesList();
}

incomesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewIncome();
});

/*** DODAWANIE WYDATKÓW ***/

function addExpense(expense) {
  //zadaniem tej funkcji będzie tworzenie elementów listy (tutaj argument 'expense' jest obiektem w tablicy 'expenses')
  const li = document.createElement("li");
  li.id = expense.id;
  li.classList = "flex budget_list_item";

  const paragraph = document.createElement("p");
  paragraph.innerText = expense.title;

  const span = document.createElement("span");
  span.innerText = expense.amount;

  const btnContainer = document.createElement("div");

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

  editBtn.addEventListener("click", () => {
    editItem(expense);
  });

  removeBtn.addEventListener("click", function () {
    removeItem();
  });
}

function removeItem() {
  expenses.filter((expense) => {
    expenses.splice(expense, 1);
  });

  renderExpensesList();
  sumExpenses();
}

// const editItem = (expense) => {
//   console.log(expense);
// }

function renderExpensesList() {
  expensesList.innerHTML = "";
  expenses.forEach((expense) => {
    addExpense(expense);
  });
  expenseTitle.value = "";
  expenseValue.value = "";
}

function sumExpenses() {
  let sumOfExpenses = 0;
  expenses.forEach((expense) => {
    sumOfExpenses += expense.amount;
  });
  expensesSumSpan.innerText = sumOfExpenses;
  console.log(sumOfExpenses);
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
  //Teraz newExpense znajduje się w tablicy expenses = [newExpense, newExpense, ...]
  //Za każdym razem, gdy zostanie dodany nowy expense, należy wyrenderować listę, a następnie zsumować wartości
  renderExpensesList();
  sumExpenses();
}

expensesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewExpense();
});

/* SPRAWDZENIE CO WIĘKSZE */
// let IncomesSumSpanAsNumber = Number(incomesSumSpan.innerText);
// console.log(sumOfIncomes);
// let ExpensesSumSpanAsNumber = Number(expensesSumSpan.innerText);
// console.log(ExpensesSumSpanAsNumber);

// if (IncomesSumSpanAsNumber > ExpensesSumSpanAsNumber) {
//   balanceInfo.innerText = `Możesz jeszcze wydać ${
//     IncomesSumSpanAsNumber - ExpensesSumSpanAsNumber
//   } złotych`;
// }
// else if(IncomesSumSpanAsNumber < ExpensesSumSpanAsNumber) {
//   balanceInfo.innerText = `Bilans jest ujemny. Jesteś na minusie ${IncomesSumSpanAsNumber-ExpensesSumSpanAsNumber} złotych`;
// }
// else {
//   balanceInfo.innerText = "Bilans wynosi zero";
// }
