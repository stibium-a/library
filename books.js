let booksPanBtn = document.querySelector('.booksBtn');
let saveBookBtn = document.querySelector('.saveBookBtn');
let newBookBtn = document.querySelector('.newBookBtn');
let saveEditBookBtn = document.querySelector('.editBookBtn');
let closeModalBookBtn = document.querySelector('.closeBookTab');
let closeEditModalBookBtn = document.querySelector('.closeEditBookTab');
let sortBookBtn = document.querySelector('.sortBookBtn');
let searchBookBtn = document.querySelector('.searchBookBtn');

let container = document.querySelector('.container');

let pages = document.querySelectorAll('.libHeaderItem');

let bookTableBody = document.querySelector('.bookBody');
let sortBooksSelect = document.querySelector('#sortitem');

let booksArea = document.querySelector('.bookWrapper');
let contentAreas = document.querySelectorAll('.wrapper');

let modalBook = document.querySelector('.modal');
let modalEditBook = document.querySelector('.modalEditBook');

let bookTable = document.querySelector('.booksTable');
let booksHeaderTable = document.querySelector(".booksHeaderTable");
let bookID = document.querySelector('.bookID');
let bookTitle = document.querySelector('.bookTitle');
let bookAuthor = document.querySelector('.bookAuthor');
let bookYear = document.querySelector('.bookYear');

let inputItems = document.querySelectorAll('.inputItem');
let editInputItems = document.querySelectorAll('.editInputItem');

let tablesDataArr = [];
let booksCellArr = [];
let r1Arr = [];
let arrayOftablesDataArr = JSON.parse(localStorage.getItem('bookTableDatas')) || [];
let arrayOfBookCellsForSearch = [1, 2, 3];
let rowsWithNumbers = [0, 4, 5];
let deleteServiceArray = [];
let delServiceArrForRowindex = [];
let array = [];

let noInvalidNumber = false;
let pageFlag = false;
let tableName = '';
let bookColumnsQuantity = 0;
let tableColumnsQuantity = 0;
let count = 0;
let numIndex = 0;
let rowInd;
let numberRowsRegexp = /^[0-9]+/i;

let arrowPicForTable = "<img src='img/arrow.png' style='height:26px; padding-right:25px; vertical-align:sub;'/>";
let editPictureForTables = "<img src='img/img2.png' width='26'/>";
let contentForDeleteCells = "<input type='checkbox' style='width:18px; height:18px;'>";
let itemsBlueHilight = "4px solid #14e4c1";
let borderStyle = {
    'border-width': '2px',
    'border-style': 'inset',
    'border-color': '-internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))',
    'border-image': 'initial'
}



function setHiddenStyle(arrayOfElements) {
    for (let c = 0; c < arrayOfElements.length; c++) {
        arrayOfElements[c].classList.add('hiddenStyle');
    }
};

//------SET PANEL UNDERLINE MODE & FUNCTION TO GET DATA ABOUT TABLE-----------------

pages.forEach(function (item) {

    setHiddenStyle(contentAreas);

    item.addEventListener('click', function () {
        pageFlag = true;
        localStorage.setItem('pageFlag', pageFlag);

        if (item.className.includes('booksBtn')) {
            btnPressFunc(booksPanBtn, 'tabName', tableColumnsQuantity, 'tableColumns');
            item.setAttribute('id', "books");
            setHiddenStyle(contentAreas);
            booksArea.classList.remove('hiddenStyle');
        }
        else if (item.className.includes('visitorsBtn')) {
            btnPressFunc(visitorPanBtn, 'tabName', tableColumnsQuantity, 'visitorColumns');
            item.setAttribute('id', "visitors");
            setHiddenStyle(contentAreas);
            visitorsArea.classList.remove('hiddenStyle');
        }
        else if (item.className.includes('cardsBtn')) {
            btnPressFunc(cardPanBtn, 'tabName', tableColumnsQuantity, 'cardColumns');
            item.setAttribute('id', "cards");
            setHiddenStyle(contentAreas);
            cardsArea.classList.remove('hiddenStyle');
        }
        else {
            btnPressFunc(statPanBtn, 'tabName', tableColumnsQuantity, 'statColumns');
            item.setAttribute('id', "stat");
            setHiddenStyle(contentAreas);
            statArea.classList.remove('hiddenStyle');
        }

        localStorage.setItem('buttonID', item.getAttribute('id'));

        let localPageFlag = localStorage.getItem('pageFlag');
        if (pageFlag || localPageFlag) {
            pages.forEach(function (item) {
                // item.style.cssText = `
                //     border-width: 2px;
                //     border-style: outset;
                //     border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
                //     border-image: initial;
                //     `
            })
            // item.style.borderBottom = "4px solid #14e4c1";
            // item.style.borderBottom = itemsBlueHilight;
        }

        let btnStatus = localStorage.getItem('buttonID');
        if (item.id == btnStatus) {
            // item.style.borderBottom = "4px solid #14e4c1";
            item.style.borderBottom = itemsBlueHilight;
        }
    });
});

function btnPressFunc(panelBtnName, currentTabName, tableColumnsQuantity, tableColumns) {

    tableColumnsQuantity = panelBtnName.dataset.columns;

    tableName = panelBtnName.value || localStorage.getItem(currentTabName);
    localStorage.setItem(currentTabName, tableName);
    localStorage.setItem(tableColumns, JSON.stringify(tableColumnsQuantity));
};

function closeModal(winBtnName, panelName) {
    winBtnName.addEventListener('click', function () {
        panelName.classList.remove('visibleStyle');
        panelName.classList.add('hiddenStyle');
    });
};

// closeModalBookBtn.addEventListener('click', closeModal(closeModalBookBtn, modalBook));
closeEditModalBookBtn.addEventListener('click', closeModal(closeEditModalBookBtn, modalEditBook));

$('.closeBookTab').click(function () {
    $('.modalNewBook').fadeOut(350);
})

$('.closeEditBookTab').click(function () {
    $('.modalEditBook').fadeOut(350);
})


newBookBtn.onclick = function () {

    $('.modalNewBook').fadeIn(250);

    modalBook.classList.remove('hiddenStyle');
    modalBook.classList.add('visibleStyle');
};

//----------SAVING DATA FROM MODAL WINDOW TO TABLE------------------

let checkEmpty = false;
// let checkNum = false;

saveBookBtn.onclick = function () {
    // checkEmptyRows(modalBook, function () { saveTableFunc(modalBook, arrayOftablesDataArr, 'bookTableDatas', inputItems, "tableColumns", bookTableBody, 'input', modalEditBook, editInputItems) }, 'input');
    checkEmptyRows(modalBook, 'input');
    checkNumberRows(rowsWithNumbers, numberRowsRegexp, modalBook);

    if (checkEmpty && noInvalidNumber) {
        saveTableFunc(modalBook, arrayOftablesDataArr, 'bookTableDatas', inputItems, "tableColumns", bookTableBody, 'input', modalEditBook, editInputItems);
    }

    checkEmpty = false;
    noInvalidNumber = false;
};

function checkEmptyRows(modalWindName, dataFields) {

    let emptyArr = [];
    let inp = modalWindName.querySelectorAll(dataFields);
    let inputsArr = Array.from(inp);

    inputsArr.forEach(function (item) {
        item.style = borderStyle;
    });

    if (dataFields == 'input') {
        emptyArr = inputsArr.filter(item => item.value == "");
    }
    else {
        emptyArr = inputsArr.filter(item => item.getAttribute('value') == "");
    }

    if (emptyArr.length > 0) {
        emptyArr.forEach(function (item) {
            // item.style.border = "4px solid #14e4c1";
            item.style.border = itemsBlueHilight;
        });
        // alert('Fill the fucking empty rows!')
        toastr.error("Fill the empty rows!");

        return false;
    }
    checkEmpty = true;
};

function checkNumberRows(numRowsArr, bookRegexp, modalWindName) {

    let inp = modalWindName.querySelectorAll('input');
    let inputsArr = Array.from(inp);

    if (numRowsArr.length > 0) {
        noInvalidNumber = false;
        let negativeNums = numRowsArr.filter(item => !bookRegexp.test(Number(inputsArr[item].value)));

        if (negativeNums.length > 0) {
            toastr.error("Invald number!");

            negativeNums.forEach(function (item) {
                inputsArr[item].style.border = itemsBlueHilight;
                inputsArr[item].focus();
            });
            return false;
        }
        else {
            noInvalidNumber = true;
        }
    }
    noInvalidNumber = true;
}

function saveTableFunc(modalWindName, arrayOfArraysWithTableData, bookTableDatas, inputsName, tableColumns, tableBodyName, dataFields, modalEditWindName, inputItemsName) {

    $(modalWindName).fadeOut(350);

    modalWindName.classList.add('hiddenStyle');
    modalWindName.classList.remove('visibleStyle');

    getDataForTable(inputsName, tablesDataArr, arrayOfArraysWithTableData, dataFields);
    localStorage.setItem(bookTableDatas, JSON.stringify(arrayOfArraysWithTableData));

    createTable(tableBodyName, arrayOfArraysWithTableData, tableColumns);
};

function getDataForTable(inputsName, arrayOfTableDatas, arrayOfArrays, dataFields) {

    if (dataFields === 'select') {
        newBookID++;
        localStorage.setItem('newBookID', newBookID);
        // console.log(newBookID);
        tablesDataArr.push(newBookID);
    }

    inputsName.forEach(function (item) {
        if (dataFields === 'input') {
            arrayOfTableDatas.push(item.value);
            item.value = '';
        }
        else {
            arrayOfTableDatas.push(item.getAttribute('value'));
        }
    });

    if (dataFields === 'select') {

        arrayOfTableDatas.push(getCurrentDate());
        // arrayOfTableDatas.push("<img src='img/arrow.png' style='height:26px; padding-right:25px; vertical-align:sub;'/>" + " Till: " + getReturnData());
        arrayOfTableDatas.push(arrowPicForTable + " Till: " + getReturnData());
    }

    arrayOfArrays.push(tablesDataArr);

    tablesDataArr = [];
};

//-------CREATING TABLE ROWS & FLL ROWS DATA GETTED FROM MODAL WINDOW----------------------

/// it will be "createTable"
function createTable(tableBodyName, arrayOfArraysWithTableData, tableColumns) {

    tableBodyName.innerHTML = '';

    let klm = JSON.parse(localStorage.getItem(tableColumns));
    let klmp = parseInt(klm);

    let newRow;

    for (let i = 0; i < arrayOfArraysWithTableData.length; i++) {

        newRow = document.createElement('tr');

        for (let i = 0; i < klmp; i++) {
            let newCell = document.createElement('td');
            newCell.classList.add('bookCell');
            booksCellArr.push(newCell);
            newRow.appendChild(newCell);

            // newRow.style.background = 'yellow';
        }
        tableBodyName.appendChild(newRow);
    }
    fillRows(bookTableBody, arrayOftablesDataArr, editPictureForTables, contentForDeleteCells);
};

function fillRows(tBodyName, arrayOfArraysWithTableData, editCellContent, deleteCellCOntent) {

    // let klm = JSON.parse(localStorage.getItem(tableColumns));
    // let klmp = parseInt(klm);

    let tableBody = tBodyName;
    let rows = tableBody.getElementsByTagName('tr');

    // console.log(rows.length);
    // for (let i = 0; i < arrayOfArraysWithTableData.length; i++) {
    for (let i = 0; i < rows.length; i++) {

        for (let j = 0; j < arrayOfArraysWithTableData[i].length; j++) {
            rows[i].children[j].innerHTML = arrayOfArraysWithTableData[i][j];
        }
    }
    // if (dataFields === 'input') {
    if (tableBody.className.includes("editable")) {

        for (let i = 0; i < rows.length; i++) {

            rows[i].children[arrayOfArraysWithTableData[i].length].innerHTML = editCellContent;

            rows[i].children[arrayOfArraysWithTableData[i].length + 1].innerHTML = deleteCellCOntent;
        }

        prettyCells(tBodyName, arrayOfArraysWithTableData);
        // readyToEdit(bookTableBody, modalEditBook, editInputItems, 'tableColumns', arrayOfArraysWithTableData);
        readyToEdit(bookTableBody, modalEditBook, editInputItems, 'tableColumns', arrayOftablesDataArr);
    }
    // }
};

function prettyCells(tBodyName, arrayOfArraysWithTableData) {
    let tableBody = tBodyName;
    let rows = tableBody.getElementsByTagName('tr');

    if (tBodyName.className.includes('editable')) {
        for (let i = 0; i < rows.length; i++) {

            rows[i].children[arrayOfArraysWithTableData[i].length].onmouseover = function () {
                this.classList.add('prettyEdit');
            }

            rows[i].children[arrayOfArraysWithTableData[i].length].onmouseleave = function () {
                this.classList.remove('prettyEdit');
            }
        }
    }
    else {
        for (let i = 0; i < rows.length; i++) {
            rows[i].children[arrayOfArraysWithTableData[i].length - 1].onmouseover = function () {
                this.classList.add('prettyEdit');
            }

            rows[i].children[arrayOfArraysWithTableData[i].length - 1].onmouseleave = function () {
                this.classList.remove('prettyEdit');
            }
        }
    }

};

// fillRows(bookTableBody, arrayOftablesDataArr, "tableColumns");

// for (let j = 0; j < arrayOfArraysWithTableData[i].length; j++) {
//     newRow.children[j].innerHTML = arrayOfArraysWithTableData[i][j];
// }

// }
// };

// if (dataFields === 'input') {

//     newRow.children[arrayOfArraysWithTableData[i].length].innerHTML = preLastCellContent;

//     newRow.children[arrayOfArraysWithTableData[i].length + 1].innerHTML = lastCellCOntent;

//     //------KRASOTA-------------------------------
//     newRow.children[arrayOfArraysWithTableData[i].length].onmouseover = function () {
//         this.classList.add('prettyEdit');
//     }

//     newRow.children[arrayOfArraysWithTableData[i].length].onmouseleave = function () {
//         this.classList.remove('prettyEdit');
//     }
// }
// };
//             //--------------------
// readyToEdit(bookTableBody, modalEditBook, editInputItems, 'tableColumns');

function readyToEdit(tableBodyName, modalEditWindName, inputItemsName, tableColumns, arrayOfArrays) {
    if (tableBodyName.className.includes('editable')) {

        let klm = JSON.parse(localStorage.getItem(tableColumns));
        let klmp = parseInt(klm);

        for (let i = 0; i < tableBodyName.childElementCount; i++) {
            tableBodyName.children[i].children[klmp - 2].onclick = function () {
                console.log('ok');
                rowInd = this.parentElement.rowIndex - 1;
                // rowInd = this.parentElement.rowIndex;
                console.log(rowInd);

                $(modalEditWindName).fadeIn(250);

                modalEditWindName.classList.remove('hiddenStyle');
                modalEditWindName.classList.add('visibleStyle');

                console.log(inputItems.length);

                for (let i = 0; i < inputItemsName.length; i++) {
                    // console.log(arrayOfArraysWithTableData[rowInd][i])
                    inputItemsName[i].value = arrayOfArrays[rowInd][i];
                    // inputItemsName[i].value = arrayOftablesDataArr[rowInd][i];
                    // inputItemsName[i].value = 'hello!'
                }
            }
        }
    }
}

// if (dataFields === 'select') {

//     //------KRASOTA-------------------------------
//     newRow.children[arrayOfArraysWithTableData[i].length - 1].onmouseover = function () {
//         this.classList.add('prettyEdit');
//     }

//     newRow.children[arrayOfArraysWithTableData[i].length - 1].onmouseleave = function () {
//         this.classList.remove('prettyEdit');
//     }
//----------------------------

//             for (let i = 0; i < tableBodyName.childElementCount; i++) {
//                 tableBodyName.children[i].children[klmp - 1].onclick = function () {
//                     currentBook = this.parentElement.children[2].innerHTML;

//                     setBookQuantity('+');

//                     console.log('card online!');
//                     this.innerHTML = getCurrentDate();
//                     rowInd = this.parentElement.rowIndex - 1;

//                     arrayOfArraysWithTableData[this.parentElement.rowIndex - 1][4] = tableBodyName.children[i].children[klmp - 1].innerHTML;

//                     localStorage.setItem('cardTableDatas', JSON.stringify(arrayOfArraysWithTableData));

//                     setCellProperty.call(tableBodyName.children[i].children[klmp - 1]);
//                     cardCellStylesArr.push(this.parentElement.children[0].innerHTML);

//                     localStorage.setItem('cardCellStyles', JSON.stringify(cardCellStylesArr));
//                 }

//                 for (let j = 0; j < cardCellStylesArr.length; j++) {
//                     if (tableBodyName.children[i].children[0].innerHTML == cardCellStylesArr[j]) {
//                         tableBodyName.children[i].children[klmp - 1].classList.add('disabled');
//                     }
//                 }
//             }
//         };
//     }

//     if (tableBodyName == bookTableBody) {
//         toastr.success("New book has been added");
//     }
//     else if (tableBodyName == visitorsTableBody) {
//         toastr.success("New visitor has been added");
//     }
//     else {
//         toastr.success("New card has been added");
//     }
// };

//------------EDITING OF TABLE ROWS---------------------------------

saveEditBookBtn.onclick = function () {
    checkEmptyRows(modalEditBook, function () { saveEditTable(bookTableBody, arrayOftablesDataArr, modalEditBook, editInputItems, 'bookTableDatas') }, 'input');
};

function saveEditTable(tableBodyName, arrayOfArraysWithTableData, modalWindName, inputItemsName, bookTableDatas) {

    modalWindName.classList.add('hiddenStyle');
    modalWindName.classList.remove('visibleStyle');

    for (let k = 0; k < inputItemsName.length; k++) {
        arrayOfArraysWithTableData[rowInd][k] = inputItemsName[k].value;
        tableBodyName.children[rowInd].children[k].innerHTML = inputItemsName[k].value;
    }

    toastr.info("Changes saved");

    localStorage.setItem(bookTableDatas, JSON.stringify(arrayOfArraysWithTableData));
};

//---------DELETING OF TABLE ROWS------------------------------------

booksHeaderTable.rows[0].children[7].onclick = function () {
    deleteRows.call(bookTable.rows[0].children[7], bookTableBody, arrayOftablesDataArr, 'bookTableDatas', 7);

    // toastr.success("Checked books has been deleted");
};

function deleteRows(tBodyName, arrayOfArraysWithTableData, bookTableDatas, cellIndex) {
    deleteServiceArray = [];
    delServiceArrForRowindex = [];
    let table = tBodyName;
    let rows = table.getElementsByTagName("TR");
    let chkBox;
    let counter2 = 0;

    for (let i = 1; i <= rows.length; i++) {
        chkBox = rows[i - 1].getElementsByTagName("TD")[cellIndex].children[0];
        if (chkBox.checked) {

            let ri = this.closest('table').children[1].children[i - 1].rowIndex;
            this.closest('table').children[1].children[i - 1].setAttribute('id', `${ri}`);

            delServiceArrForRowindex.push(ri);

            deleteServiceArray.push(chkBox);
        }

    }

    for (let m = 0; m < delServiceArrForRowindex.length; m++) {

        delServiceArrForRowindex[m] = delServiceArrForRowindex[m] - counter2;
        table.deleteRow(delServiceArrForRowindex[m] - 1);

        arrayOfArraysWithTableData.splice(delServiceArrForRowindex[m] - 1, 1);

        counter2++;
    }

    if (deleteServiceArray.length == 0) {
        toastr.error("No checked items!");
    }
    else {
        toastr.success("Checked books has been deleted");
    }


    // toastr.success("Checked books has been deleted");
    localStorage.setItem(bookTableDatas, JSON.stringify(arrayOfArraysWithTableData));
};

//-------SEARCH IN TABLE---------------------------------------------

searchBookBtn.addEventListener('click', function () {
    searchFunc(bookTableBody, arrayOfBookCellsForSearch, '#searchItem');
});

function searchFunc(tBodyName, searchColsArray, searchInputID) {
    let table = tBodyName;
    let rows = table.getElementsByTagName("TR");
    let searchInput = document.querySelector(searchInputID);
    let searchValue = searchInput.value.toLowerCase();
    let searchRegexp = new RegExp(searchValue, 'i');

    for (let i = 0; i < rows.length; i++) {
        for (let k = 0; k < searchColsArray.length; k++) {
            rows[i].cells[searchColsArray[k]].style.color = '#000';
        }
    }

    for (let i = 0; i < rows.length; i++) {
        for (let k = 0; k < searchColsArray.length; k++) {
            if ((searchRegexp.test(rows[i].cells[searchColsArray[k]].innerHTML))) {
                rows[i].style.display = '';
                rows[i].cells[searchColsArray[k]].style.color = 'red';
                break;
            }
            else {
                rows[i].style.display = "none";
            }
        }
    }
};

//-------SORTING TABLE ROWS-----------------------------------------

sortBookBtn.addEventListener('click', function () {

    let selectIndex = sortBooksSelect.options.selectedIndex;

    switch (selectIndex) {
        case 0:
            index = 1;
            array = arrayOftablesDataArr;
            sortStrOfTable(array, index);
            break;
        case 1:
            index = 2;
            array = arrayOftablesDataArr;
            sortStrOfTable(array, index);
            break;
        case 2:
            index = 5;
            numIndex = 5;
            array = arrayOftablesDataArr;
            sortNumsOfTable(array, index);
            break;

        default:
            index = 0;
            numIndex = 0;
            array = arrayOftablesDataArr;
            sortNumsOfTable(array, index);
            break;
    }
    sortTable(bookTable, index, numIndex);
});

function sortTable(tableName, index, numIndex) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = tableName;
    switching = true;

    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[index];
            y = rows[i + 1].getElementsByTagName("TD")[index];

            if (index == numIndex) {
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }

            }
            else if (sortingDate) {
                if (new Date(x.innerHTML).getTime() > new Date(y.innerHTML).getTime()) {
                    shouldSwitch = true;
                    break;
                }
            }
            else {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
};

function sortNumsOfTable(arrOfComparingArrays, index) {

    arrOfComparingArrays.sort(function (a, b) {
        if (Number(a[index]) > Number(b[index])) {
            return 1;
        }
        if (Number(a[index]) < Number(b[index])) {
            return -1;
        }
        return 0;
    });
};

function sortStrOfTable(arrName, itemIndex) {

    arrName.sort(function (a, b) {
        if (a[itemIndex].toLowerCase() > b[itemIndex].toLowerCase()) {
            return 1;
        }
        if (a[itemIndex].toLowerCase() < b[itemIndex].toLowerCase()) {
            return -1;
        }
        return 0;

    });
};

function sortDateOfTable(arrName, itemIndex) {

    arrName.sort(function (a, b) {

        if (new Date(a[itemIndex]).getTime() > new Date(b[itemIndex]).getTime()) {
            return 1;
        }
        if (new Date(a[itemIndex]).getTime() < new Date(b[itemIndex]).getTime()) {
            return -1;
        }
        return 0;
    });
    sortingDate = false;
};

//---------------SAVING DATA AFTER RELOADING PAGE---------------------------

window.onload = function () {
    let btnStatus = localStorage.getItem('buttonID');

    createTable(bookTableBody, arrayOftablesDataArr, 'tableColumns');
    fillRows(bookTableBody, arrayOftablesDataArr, editPictureForTables, contentForDeleteCells);

    readyToEdit(bookTableBody, modalEditBook, editInputItems, 'tableColumns', arrayOftablesDataArr);

    // reloadBook(bookTableBody, arrayOftablesDataArr, modalEditBook, editInputItems, 'tabName', 'tableColumns', btnStatus, editPictureForTables, contentForDeleteCells, 'input');

    // reloadVisitor(visitorsTableBody, arrayOfVisitorsDataArr, modalEditVisitor, editVisitorInputItems, 'visitorTabName', 'visitorColumns', btnStatus, editPictureForTables, contentForDeleteCells, 'input');

    // reloadCard(cardsTableBody, arrayOfCardsDataArr, 'cardTabName', 'cardColumns', btnStatus);

    // reloadStat(statTableBody, arrayOfStatVisitorDataArr, 'statTabName', 'statColumns', btnStatus);
}

// function reloadBook(tableBodyName, arrayOfArraysWithTableData, modalWindName, inputItemsName, currentTabName, tableColumns, btnStatus, preLastCellContent, lastCellCOntent, dataFields) {

//     tableName = localStorage.getItem(currentTabName);

//     tableBodyName.innerHTML = '';

//     let klm = JSON.parse(localStorage.getItem(tableColumns));
//     let klmp = parseInt(klm);

//     let newRow;

//     for (let i = 0; i < arrayOfArraysWithTableData.length; i++) {

//         newRow = document.createElement('tr');

//         for (let i = 0; i < klmp; i++) {
//             let newCell = document.createElement('td');
//             newCell.classList.add('bookCell');
//             booksCellArr.push(newCell);
//             newRow.appendChild(newCell);
//             // newRow.style.background = 'lightgreen';
//         }
//         tableBodyName.appendChild(newRow);
//     }
//     fillRows(bookTableBody, arrayOftablesDataArr, editPictureForTables, contentForDeleteCells);
// };



// for (let j = 0; j < arrayOfArraysWithTableData[i].length; j++) {
//     newRow.children[j].innerHTML = arrayOfArraysWithTableData[i][j];
// }

// if (dataFields === 'input') {
//     newRow.children[arrayOfArraysWithTableData[i].length].innerHTML = preLastCellContent;

//     newRow.children[arrayOfArraysWithTableData[i].length + 1].innerHTML = lastCellCOntent;

//     //------KRASOTA-------------------------------
//     newRow.children[arrayOfArraysWithTableData[i].length].onmouseover = function () {
//         this.classList.add('prettyEdit');
//     }

//     newRow.children[arrayOfArraysWithTableData[i].length].onmouseleave = function () {
//         this.classList.remove('prettyEdit');
//     }
//     // ------------------------------------------
// }
// }

// }


// for (let i = 0; i < tableBodyName.childElementCount; i++) {
//     tableBodyName.children[i].children[klmp - 2].onclick = function () {
//         console.log('current edit!');
//         rowInd = this.parentElement.rowIndex - 1;

//         $(modalWindName).fadeIn(250);

//         modalWindName.classList.remove('hiddenStyle');
//         modalWindName.classList.add('visibleStyle');

//         for (let i = 0; i < inputItemsName.length; i++) {
//             inputItemsName[i].value = arrayOfArraysWithTableData[this.parentElement.rowIndex - 1][i];
//         }
//     }
// }

// switch (btnStatus) {
//     case 'books':
pages[0].style.borderBottom = itemsBlueHilight;
setHiddenStyle(contentAreas);
booksArea.classList.remove('hiddenStyle');
//         break;
//     case 'visitors':
//         pages[1].style.borderBottom = itemsBlueHilight;
//         setHiddenStyle(contentAreas);
//         visitorsArea.classList.remove('hiddenStyle');
//         break;
//     case 'cards':
//         pages[2].style.borderBottom = itemsBlueHilight;
//         setHiddenStyle(contentAreas);
//         break;
//     case 'stat':
//         pages[3].style.borderBottom = itemsBlueHilight;
//         setHiddenStyle(contentAreas);
//         break;

//     default:
//         break;
// }
// };

function reloadVisitor(tableBodyName, arrayOfArraysWithTableData, modalWindName, inputItemsName, currentTabName, tableColumns, btnStatus, preLastCellContent, lastCellCOntent) {

    tableName = localStorage.getItem(currentTabName);

    tableBodyName.innerHTML = '';

    let klm = JSON.parse(localStorage.getItem(tableColumns));
    let klmp = parseInt(klm);

    let newRow;

    for (let i = 0; i < arrayOfArraysWithTableData.length; i++) {

        newRow = document.createElement('tr');

        for (let i = 0; i < klmp; i++) {
            let newCell = document.createElement('td');
            newCell.classList.add('bookCell');
            booksCellArr.push(newCell);
            newRow.appendChild(newCell);
            // newRow.style.background = 'lightgreen';
        }
        tableBodyName.appendChild(newRow);

        for (let j = 0; j < arrayOfArraysWithTableData[i].length; j++) {
            newRow.children[j].innerHTML = arrayOfArraysWithTableData[i][j];
        }

        newRow.children[arrayOfArraysWithTableData[i].length].innerHTML = preLastCellContent;

        newRow.children[arrayOfArraysWithTableData[i].length + 1].innerHTML = lastCellCOntent;

        //------KRASOTA-------------------------------
        newRow.children[arrayOfArraysWithTableData[i].length].onmouseover = function () {
            this.classList.add('prettyEdit');
        }

        newRow.children[arrayOfArraysWithTableData[i].length].onmouseleave = function () {
            this.classList.remove('prettyEdit');
        }

        //------------------------------------------
    }

    for (let i = 0; i < tableBodyName.childElementCount; i++) {
        tableBodyName.children[i].children[klmp - 2].onclick = function () {
            rowInd = this.parentElement.rowIndex - 1;

            $(modalWindName).fadeIn(250);

            modalWindName.classList.remove('hiddenStyle');
            modalWindName.classList.add('visibleStyle');

            for (let i = 0; i < inputItemsName.length; i++) {
                inputItemsName[i].value = arrayOfArraysWithTableData[this.parentElement.rowIndex - 1][i];
            }
        }
    }

    switch (btnStatus) {
        case 'books':
            pages[0].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            booksArea.classList.remove('hiddenStyle');
            break;
        case 'visitors':
            pages[1].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            visitorsArea.classList.remove('hiddenStyle');
            break;
        case 'cards':
            pages[2].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            break;
        case 'stat':
            pages[3].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            break;

        default:
            break;
    }
};

function reloadCard(tableBodyName, arrayOfArraysWithTableData, currentTabName, tableColumns, btnStatus) {

    tableName = localStorage.getItem(currentTabName);

    tableBodyName.innerHTML = '';

    let klm = JSON.parse(localStorage.getItem(tableColumns));
    let klmp = parseInt(klm);

    let newRow;

    for (let i = 0; i < arrayOfArraysWithTableData.length; i++) {

        newRow = document.createElement('tr');

        for (let i = 0; i < klmp; i++) {
            let newCell = document.createElement('td');
            newCell.classList.add('bookCell');
            booksCellArr.push(newCell);
            newRow.appendChild(newCell);
            // newRow.style.background = 'lightgreen';
        }
        tableBodyName.appendChild(newRow);

        for (let j = 0; j < arrayOfArraysWithTableData[i].length; j++) {
            newRow.children[j].innerHTML = arrayOfArraysWithTableData[i][j];
        }

        //------KRASOTA-------------------------------
        newRow.children[arrayOfArraysWithTableData[i].length - 1].onmouseover = function () {
            this.classList.add('prettyEdit');
        }

        newRow.children[arrayOfArraysWithTableData[i].length - 1].onmouseleave = function () {
            this.classList.remove('prettyEdit');
        }

    }

    for (let i = 0; i < tableBodyName.childElementCount; i++) {
        tableBodyName.children[i].children[klmp - 1].onclick = function () {
            currentBook = this.parentElement.children[2].innerHTML;

            setBookQuantity('+');

            this.innerHTML = getCurrentDate();
            rowInd = this.parentElement.rowIndex - 1;

            arrayOfArraysWithTableData[this.parentElement.rowIndex - 1][4] = tableBodyName.children[i].children[klmp - 1].innerHTML;

            localStorage.setItem('cardTableDatas', JSON.stringify(arrayOfArraysWithTableData));
            localStorage.setItem('bookTableDatas', JSON.stringify(arrayOftablesDataArr));


            setCellProperty.call(tableBodyName.children[i].children[klmp - 1]);
            cardCellStylesArr.push(this.parentElement.children[0].innerHTML);

            localStorage.setItem('cardCellStyles', JSON.stringify(cardCellStylesArr));
        }

        for (let j = 0; j < cardCellStylesArr.length; j++) {
            if (tableBodyName.children[i].children[0].innerHTML == cardCellStylesArr[j]) {
                tableBodyName.children[i].children[klmp - 1].classList.add('disabled');
            }
        }
    }

    switch (btnStatus) {
        case 'books':
            pages[0].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            booksArea.classList.remove('hiddenStyle');
            break;
        case 'visitors':
            pages[1].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            visitorsArea.classList.remove('hiddenStyle');
            break;
        case 'cards':
            pages[2].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            cardsArea.classList.remove('hiddenStyle');
            break;
        case 'stat':
            pages[3].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            break;

        default:
            break;
    }
};

function reloadStat(tableBodyName, arrayOfArraysWithTableData, currentTabName, tableColumns, btnStatus) {

    tableName = localStorage.getItem(currentTabName);

    tableBodyName.innerHTML = '';

    switch (btnStatus) {
        case 'books':
            pages[0].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            booksArea.classList.remove('hiddenStyle');
            break;
        case 'visitors':
            pages[1].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            visitorsArea.classList.remove('hiddenStyle');
            break;
        case 'cards':
            pages[2].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            cardsArea.classList.remove('hiddenStyle');
            break;
        case 'stat':
            pages[3].style.borderBottom = itemsBlueHilight;
            setHiddenStyle(contentAreas);
            statArea.classList.remove('hiddenStyle');
            break;

        default:
            break;
    }

    if (arrayOfCardsDataArr.length == 0) {
        return false;
    }
    getStatistics();

    localStorage.setItem('statTableDatas', JSON.stringify(arrayOfArraysWithTableData));
};