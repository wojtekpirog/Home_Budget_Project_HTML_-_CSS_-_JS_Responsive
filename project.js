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

function addElement(elements, element, targetUl) {
  const li = document.createElement("li");
  li.id = element.id;
  li.classList = "flex";

  const inputWithName = document.createElement("input");
  inputWithName.disabled = true;
  inputWithName.classList = "list_item_element name_input";
  inputWithName.value = element.title;

  const inputWithValue = document.createElement("input");
  inputWithValue.disabled = true;
  inputWithValue.type = "number";
  inputWithValue.classList = "list_item_element value_input";
  inputWithValue.value = element.amount;

  const btnContainer = document.createElement("div");
  btnContainer.className = "item--buttons_container";

  const editBtn = document.createElement("button");
  editBtn.classList = "list_item_element edit_button pointer";
  editBtn.innerText = "Edytuj";

  const removeBtn = document.createElement("button");
  removeBtn.classList = "list_item_element delete_button pointer";
  removeBtn.innerText = "Usuń";

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(removeBtn);

  li.appendChild(inputWithName);
  li.appendChild(inputWithValue);
  li.appendChild(btnContainer);

  targetUl.appendChild(li);

  editBtn.addEventListener("click", function () {
    editElement(elements, element, targetUl);
  });

  removeBtn.addEventListener("click", function () {
    deleteElement(elements, element, targetUl);
  });
}

function editElement(elements, element, targetUl) {
  //funkcja edytująca
  // console.log(targetUl);
  const targetLi = document.getElementById(`${element.id}`);

  const inputWithName = targetLi.getElementsByClassName("name_input")[0];
  const inputWithValue = targetLi.getElementsByClassName("value_input")[0];

  inputWithName.disabled = false;
  inputWithValue.disabled = false;

  const divForBtns = document.createElement("div");

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Zapisz";
  saveBtn.classList = "edit_button list_item_element pointer";

  divForBtns.appendChild(saveBtn);

  const doNotSaveButton = document.createElement("button");
  doNotSaveButton.innerText = "Nie zapisuj";
  doNotSaveButton.classList = "delete_button list_item_element pointer";

  divForBtns.appendChild(doNotSaveButton);

  targetLi.appendChild(divForBtns);

  const btnDiv = document.getElementsByClassName("item--buttons_container")[
    elements.indexOf(element)
  ];
  targetLi.removeChild(btnDiv);

  saveBtn.addEventListener("click", function () {
    if (!Number(inputWithValue.value)) {
      alert("Podaj kwotę Twojego przychodu!");
    } else if (Number(inputWithValue.value) > 0) {
      if (!inputWithName.value) {
        alert("Podaj tytuł Twojego przychodu!");
      } else {
        element.title = inputWithName.value;
        element.amount = Number(inputWithValue.value);

        inputWithName.disabled = true;
        inputWithValue.disabled = true;

        targetLi.removeChild(divForBtns);
        targetLi.appendChild(btnDiv);

        sumAll();
        renderElementsList(elements, targetUl);
      }
    } else {
      alert("Podaj liczbę większą od zera!");
    }
  });

  doNotSaveButton.addEventListener("click", function () {
    inputWithName.disabled = true;
    inputWithValue.disabled = true;

    targetLi.removeChild(divForBtns);
    targetLi.appendChild(btnDiv);

    sumAll();
    renderElementsList(elements, targetUl);
  });
} //koniec funkcji edytującej

function deleteElement(elements, element, targetUl) {
  elements.splice(elements.indexOf(element), 1);
  sumAll();
  renderElementsList(elements, targetUl);
}

function renderElementsList(elements, targetUl) {
  targetUl.innerHTML = "";
  elements.forEach((element) => {
    addElement(elements, element, targetUl);
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
      incomeTitle.value = "";
      incomeValue.value = "";
    }
  } else {
    alert("Podaj liczbę większą od zera!");
  }

  sumAll();
  renderElementsList(incomes, incomesList);
}

incomesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewIncome();
});

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
    balanceInfo.innerHTML = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      difference
    )} złotych.`;
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
      expenseTitle.value = "";
      expenseValue.value = "";
    }
  } else {
    alert("Podaj liczbę większą od zera!");
  }

  sumAll();
  renderElementsList(expenses, expensesList);
}

expensesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewExpense();
});
