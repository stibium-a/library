let cardPanBtn = document.querySelector('.cardsBtn');
let saveCardBtn = document.querySelector('.saveBookCardBtn');
let searchCardBtn = document.querySelector('.searchCardBtn');
let sortCardBtn = document.querySelector('.sortCardBtn');
let newCardBtn = document.querySelector('.createNewCardBtn');
let closeModalCardBtn = document.querySelector('.closeCardTab');

let visitorSelector = document.querySelector('#selectVisitorItem');
let bookSelector = document.querySelector('#selectBookItem');

let cardsArea = document.querySelector('.cardWrapper');

let modalCard = document.querySelector('.createNewCardTab');

let cardsTableBody = document.querySelector('.cardBody');
let cardTable = document.querySelector('.cardsTable');

let cardInputItems = document.querySelectorAll('.cardSelector');

let sortCardsSelect = document.querySelector('#sortCardTabItem');

let selects = modalCard.querySelectorAll('select');

let arrayOfCardsDataArr = JSON.parse(localStorage.getItem('cardTableDatas')) || [];
let arrayOfCardTableRows = JSON.parse(localStorage.getItem('cardsRowsArray')) || [];
let cardCellStylesArr = JSON.parse(localStorage.getItem('cardCellStyles')) || [];
let cardRowsWithNumbers = [];
let arrayOfCardCellsForSearch = [1, 2];
let cardsDataArr = [];
let arrForList = [];
let cardArray = arrayOfCardsDataArr;

let sortingDate = false;
let cardsRowRegexp = '';
let currentBook = '';

let newBookID = localStorage.getItem('newBookID') || 0;


// /*----------------- CREATE NEW CARD -------------------------- */

newCardBtn.onclick = function () {

    $('.createNewCardTab').fadeIn(200);

    modalCard.classList.remove('hiddenStyle');
    modalCard.classList.add('visibleStyle');

    fillSelect(setItemsList(arrayOfVisitorsDataArr, 'visitorsList'), 1, visitorSelector);
    fillSelect(setItemsList(arrayOftablesDataArr, 'booksList'), 1, bookSelector);

    let selects1 = Array.from(selects);
    let selects2 = selects1.filter(item => !item.className.includes('settingData'));

    selects2.forEach(function (item) {
        item.selectedIndex = 0;
    });
};

function getCurrentDate() {
    let today = new Date();
    let expDate = new Date(today.setMonth(today.getMonth()));
    let returnBookDate = expDate.toLocaleDateString();
    return returnBookDate;
};

function getReturnData() {
    let sel = document.querySelector('.settingData');

    let today = new Date();
    let expDate;
    let returnBookDate;

    if (sel.selectedIndex == 1) {
        expDate = new Date(today.setMonth(today.getMonth() + 1));
        returnBookDate = expDate.toLocaleDateString();
    }
    else if (sel.selectedIndex == 2) {
        expDate = new Date(today.setMonth(today.getMonth() + 2));
        returnBookDate = expDate.toLocaleDateString();
    }
    else {
        expDate = new Date(today.setMonth(today.getMonth() + 3));
        returnBookDate = expDate.toLocaleDateString();
    }
    sel.selectedIndex = 0;

    return returnBookDate;
};

// closeModalCardBtn.addEventListener('click', closeModal(closeModalCardBtn, modalCard));

$('.closeCardTab').click(function() {
    $('.createNewCardTab').fadeOut(350);
  });


//----------------SAVING CARD ---------------------

saveCardBtn.onclick = function () {
    // newBookID++;

    // localStorage.setItem('newBookID', newBookID);

    let selects1 = Array.from(selects);
    let selects2 = selects1.filter(item => !item.className.includes('settingData'));

    selects2.forEach(function (item) {
        item.setAttribute('value', item[item.selectedIndex].innerHTML);
    });

    // tablesDataArr.push(newBookID);

    setBookQuantity('-');

    localStorage.setItem('bookTableDatas', JSON.stringify(arrayOftablesDataArr));

    saveDatas(modalCard, cardRowsWithNumbers, function () { saveTableFunc(modalCard, arrayOfCardsDataArr, 'cardTableDatas', selects2, "cardColumns", cardsTableBody, 'select') }, cardsRowRegexp, 'select');

    // toastr.success("New card has been created");
};


function setItemsList(arr, controlParam) {

    switch (controlParam) {
        case 'booksList':
            arrForList = arr.filter(elem => Number(elem[5]) > 0);
            break;
        case 'visitorsList':
            arrForList = arr;
            break;
        default:
            break;
    }
    return arrForList;
};

function fillSelect(array, valueIndex, selectName) {

    let selMas = Array.from(selectName);
    for (let i = 1; i < selMas.length; i++) {
        selMas[i].remove();
    }

    array.forEach(function (arrayItem) {
        let newOption = document.createElement('option');
        newOption.innerHTML = arrayItem[valueIndex];
        selectName.appendChild(newOption);
    });
};

function setBookQuantity(znak) {
    let bookRows = bookTableBody.getElementsByTagName("tr");

    let cardRows = cardsTableBody.getElementsByTagName("tr");
    switch (znak) {
        case '-':
            currentBook = bookSelector.getAttribute('value');
            break;

        default:
            break;
    }

    for (let i = 0; i < arrayOftablesDataArr.length; i++) {

        if (currentBook == arrayOftablesDataArr[i][1] && znak == '+') {
            arrayOftablesDataArr[i][5] = Number(arrayOftablesDataArr[i][5]) + 1;
            bookRows[i].children[5].innerHTML = arrayOftablesDataArr[i][5];
        }

        if (currentBook == arrayOftablesDataArr[i][1] && znak == '-') {
            arrayOftablesDataArr[i][5] = Number(arrayOftablesDataArr[i][5]) - 1;
            bookRows[i].children[5].innerHTML = arrayOftablesDataArr[i][5];
        }
    }
};

function setCellProperty() {
    this.classList.add('disabled');
};


//------------------------------- SEARCH IN TABLE ----------------------

searchCardBtn.addEventListener('click', function () {
    searchFunc(cardsTableBody, arrayOfCardCellsForSearch, '#searchCardItem');
});


//--------------------------SORTING TABLE ROWS-------------------------

sortCardBtn.addEventListener('click', function () {

    let cardSelectIndex = sortCardsSelect.options.selectedIndex;

    switch (cardSelectIndex) {
        case 0:
            index = 0;
            numIndex = 0;
            sortNumsOfTable(cardArray, index);
            break;
        case 1:
            index = 1;
            sortStrOfTable(cardArray, index);
            break;
        case 2:
            index = 2;
            sortStrOfTable(cardArray, index);
            break;
        case 3:
            index = 3;
            sortingDate = true;
            sortDateOfTable(cardArray, index);
            break;

        default:
            break;
    }
    sortTable(cardTable, index, numIndex);
});

