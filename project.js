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

  const inputWithTitle = document.createElement("input");
  inputWithTitle.disabled = true;
  inputWithTitle.classList = "list_item_element name_input";
  inputWithTitle.value = element.title;

  const inputWithAmount = document.createElement("input");
  inputWithAmount.disabled = true;
  inputWithAmount.type = "number";
  inputWithAmount.classList = "list_item_element value_input";
  inputWithAmount.value = element.amount;

  const btnContainer = document.createElement("div");
  btnContainer.classList = `item--buttons_container`;

  const editBtn = document.createElement("button");
  editBtn.classList = "edit_button list_item_element  pointer";
  editBtn.innerText = "Edytuj";

  const removeBtn = document.createElement("button");
  removeBtn.classList = "delete_button list_item_element  pointer";
  removeBtn.innerText = "Usuń";

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(removeBtn);

  li.appendChild(inputWithTitle);
  li.appendChild(inputWithAmount);
  li.appendChild(btnContainer);

  targetUl.appendChild(li);

  function editElement() {
    inputWithTitle.disabled = false;
    inputWithAmount.disabled = false;

    const saveBtn = document.createElement("button");
    saveBtn.classList = "edit_button list_item_element  pointer";
    saveBtn.innerText = "Zapisz";

    const doNotSaveBtn = document.createElement("button");
    doNotSaveBtn.classList = "delete_button list_item_element  pointer";
    doNotSaveBtn.innerText = "Nie zapisuj";

    btnContainer.removeChild(editBtn);
    btnContainer.removeChild(removeBtn);

    btnContainer.appendChild(saveBtn);
    btnContainer.appendChild(doNotSaveBtn);

    saveBtn.addEventListener("click", () => {
      if (!Number(inputWithAmount.value)) {
        alert("Podaj kwotę Twojej transakcji!");
      } else if (Number(inputWithAmount.value) > 0) {
        if (!inputWithTitle.value) {
          alert("Podaj tytuł Twojej transakcji!");
        } else {
          element.title = inputWithTitle.value;
          element.amount = Number(inputWithAmount.value);

          inputWithTitle.disabled = true;
          inputWithAmount.disabled = true;

          btnContainer.removeChild(saveBtn);
          btnContainer.removeChild(doNotSaveBtn);

          btnContainer.appendChild(editBtn);
          btnContainer.appendChild(removeBtn);

          sumAll();
          renderElementsList(elements, targetUl);
        }
      } else {
        alert("Podaj dodatnią kwotę Twojej transakcji!");
      }
    });

    doNotSaveBtn.addEventListener("click", () => {
      inputWithTitle.disabled = true;
      inputWithAmount.disabled = true;

      btnContainer.removeChild(saveBtn);
      btnContainer.removeChild(doNotSaveBtn);

      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(removeBtn);

      sumAll();
      renderElementsList(elements, targetUl);
    });
  }

  function removeElement() {
    elements.splice(elements.indexOf(element), 1);
    sumAll();
    renderElementsList(elements, targetUl);
  }

  editBtn.addEventListener("click", editElement);
  removeBtn.addEventListener("click", removeElement);
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
    alert("Podaj kwotę Twojego przychodu!");
  } else if (newIncome.amount > 0) {
    if (!newIncome.title) {
      alert("Podaj tytuł Twojego przychodu!");
    } else {
      incomes.push(newIncome);
      incomeTitle.value = "";
      incomeValue.value = "";
    }
  } else {
    alert("Podaj dodatnią kwotę Twojej transakcji!");
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
    alert("Podaj kwotę Twojego wydatku!");
  } else if (newExpense.amount > 0) {
    if (!newExpense.title) {
      alert("Podaj tytuł Twojego wydatku!");
    } else {
      expenses.push(newExpense);
      expenseTitle.value = "";
      expenseValue.value = "";
    }
  } else {
    alert("Podaj dodatnią kwotę Twojej transakcji!");
  }

  sumAll();
  renderElementsList(expenses, expensesList);
}

expensesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewExpense();
});
