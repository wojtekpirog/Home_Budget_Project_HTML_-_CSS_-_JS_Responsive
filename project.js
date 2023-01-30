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
  btnContainer.classList = "buttons_container"; //Ta klasa jest w CSS

  const editBtn = document.createElement("button");
  editBtn.classList = "list_item_button edit_button"; //Te klasy są w CSS...
  editBtn.innerText = "Edytuj";

  const removeBtn = document.createElement("button");
  removeBtn.classList = "list_item_button delete_button"; //...I te również :-)
  removeBtn.innerText = "Usuń";

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(removeBtn);

  li.appendChild(paragraph);
  li.appendChild(span);
  li.appendChild(btnContainer);

  incomesList.appendChild(li);

  editBtn.addEventListener("click", () => {
    editItem(income);
  });

  removeBtn.addEventListener("click", () => {
    incomesList.removeChild(li);
  });
}

function editItem(income) {
  console.log(income);
}

// function deleteItem(incomes) {
//   console.log(incomes);
// }

// function deleteItem(income) {
//   console.log(income);

//   incomes.filter((item) => {
//     return income.id !== item.id;
//   });

//   renderIncomesList();
//   sumIncomes();
// }

//funkcja renderująca listę (wyświetlająca listę w body)
function renderIncomesList() {
  incomesList.innerHTML = "";
  incomes.forEach((income) => {
    addIncome(income);
  });
  incomeTitle.value = "";
  incomeValue.value = "";
}

function sumIncomes() {
  let sumOfIncomes = 0; // zmienna pomocnicza - przechowuje sumę przychodów
  incomes.forEach((income) => {
    sumOfIncomes += income.amount;
  });
  incomesSumSpan.innerText = sumOfIncomes;
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
  //Teraz newIncome (jako obiekt) jest już w tablicy incomes
  //Za każdym razem, gdy zostanie dodany nowy income do Array, należy zsumować wyrenderować listę, a następnie zsumować wartości.
  renderIncomesList();
  sumIncomes();
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
  btnContainer.className = "buttons_container";

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

  removeBtn.addEventListener("click", () => {
    removeItem(expense);
  });
}

// const editItem = (expense) => {
//   console.log(expense);
// }

// function removeItem(expense) {
//   console.log(expense);
//   expenses.forEach((item) => console.log(item.id === expense.id));
// }

function removeItem(expense) {
  console.log(expense);
  const deleted = expenses.filter((item) => {
    return item.id !== expense.id;
  });
  console.log(deleted);
}

const renderExpensesList = () => {
  expensesList.innerHTML = "";
  expenses.forEach((expense) => {
    addExpense(expense);
  });
  expenseTitle.value = "";
  expenseValue.value = "";
};

const sumExpenses = () => {
  let sumOfExpenses = 0;
  expenses.forEach((expense) => {
    sumOfExpenses += expense.amount;
  });
  expensesSumSpan.innerHTML = sumOfExpenses;
};

const addNewExpense = () => {
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
};

expensesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewExpense();
});

/* SPRAWDZENIE CO WIĘKSZE */
// let IncomesSumSpanAsNumber = Number(incomesSumSpan.innerText);
// let ExpensesSumSpanAsNumber = Number(expensesSumSpan.innerText);

// if(IncomesSumSpanAsNumber > ExpensesSumSpanAsNumber) {
//   balanceInfo.innerText = `Możesz jeszcze wydać ${IncomesSumSpanAsNumber-ExpensesSumSpanAsNumber} złotych`;
// } else if(IncomesSumSpanAsNumber < ExpensesSumSpanAsNumber) {
//   balanceInfo.innerText = `Bilans jest ujemny. Jesteś na minusie ${IncomesSumSpanAsNumber-ExpensesSumSpanAsNumber} złotych`;
// }
// else {
//   balanceInfo.innerText = "Bilans wynosi zero";
// }
