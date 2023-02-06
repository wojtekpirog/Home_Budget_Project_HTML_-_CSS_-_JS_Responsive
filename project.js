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
  li.classList = "flex budget_list_item";

  const paragraph = document.createElement("p");
  paragraph.classList = "list_item_element list_item_data";
  paragraph.innerText = element.title;

  const span = document.createElement("span");
  span.classList = "list_item_element list_item_data";
  span.innerText = element.amount;

  const btnContainer = document.createElement("div");
  btnContainer.className = "item--buttons_container";

  const editBtn = document.createElement("button");
  editBtn.classList = "list_item_element edit_button";
  editBtn.innerText = "Edytuj";

  const removeBtn = document.createElement("button");
  removeBtn.classList = "list_item_element delete_button";
  removeBtn.innerText = "Usuń";

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(removeBtn);

  li.appendChild(paragraph);
  li.appendChild(span);
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
  const elementIndex = elements.indexOf(element);
  const targetLi = document.getElementById(`${element.id}`);
  const paragraphWithTitle = targetLi.querySelector("p");
  const spanWithValue = targetLi.querySelector("span");

  paragraphWithTitle.setAttribute("contenteditable", "true");
  spanWithValue.setAttribute("contenteditable", "true");

  const divForBtns = document.createElement("div");

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Zapisz";
  saveBtn.classList = "edit_button list_item_element";

  divForBtns.appendChild(saveBtn);

  const doNotSaveButton = document.createElement("button");
  doNotSaveButton.innerText = "Nie zapisuj";
  doNotSaveButton.classList = "delete_button list_item_element";

  divForBtns.appendChild(doNotSaveButton);

  targetLi.appendChild(divForBtns);

  const btnDiv = document.getElementsByClassName("item--buttons_container")[
    elementIndex
  ];
  targetLi.removeChild(btnDiv);

  saveBtn.addEventListener("click", function () {
    if (!Number(spanWithValue.innerText)) {
      window.alert("Podaj kwotę Twojego przychodu!");
    } else if (Number(spanWithValue.innerText) > 0) {
      if (!paragraphWithTitle.innerText) {
        alert("Podaj tytuł Twojego przychodu!");
      } else {
        element.title = paragraphWithTitle.innerText;
        element.amount = Number(spanWithValue.innerText);

        paragraphWithTitle.setAttribute("contenteditable", "false");
        spanWithValue.setAttribute("contenteditable", "false");

        targetLi.removeChild(divForBtns);
        targetLi.appendChild(btnDiv);

        renderElementsList(elements, targetUl);
        sumAll();
      }
    } else {
      window.alert("Podaj liczbę większą od zera!");
    }
  });

  doNotSaveButton.addEventListener("click", function () {
    paragraphWithTitle.setAttribute("contenteditable", "false");
    spanWithValue.setAttribute("contenteditable", "false");

    targetLi.removeChild(divForBtns);
    targetLi.appendChild(btnDiv);

    renderElementsList(elements, targetUl);
    sumAll();
  });
}

function deleteElement(elements, element, targetUl) {
  const index = elements.indexOf(element);
  elements.splice(elements[index], 1);
  renderElementsList(elements, targetUl);
  sumAll();
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
    }
  } else {
    alert("Podaj liczbę większą od zera!");
  }

  renderElementsList(expenses, expensesList);
  sumAll();
}

expensesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewExpense();
});
