let statPanBtn = document.querySelector('.statBtn');
let showStatTableBtn = document.querySelector('.showStatTabBtn');

let statArea = document.querySelector('.statisticWrapper');

let statTableSelector = document.querySelector('#sortStatTabItem');

let statTableBody = document.querySelector('.statBody');
let statTable = document.querySelector('.statTab');

let arrayOfStatVisitorDataArr = JSON.parse(localStorage.getItem('statVisitorTableDatas')) || [];
let arrayOfStatBookDataArr = JSON.parse(localStorage.getItem('statBookTableDatas')) || [];
let currentStatArray = [];
let mas = [];
let statDataArray = [];
let currentItemArray = [];

let dataIndex = 0;

showStatTableBtn.onclick = function () {
    if(arrayOfCardsDataArr.length == 0){
        return false;
    }
    getStatistics();
};

function getStatistics() {

    switch (statTableSelector.selectedIndex) {
        case 0:
            currentStatArray = arrayOfStatVisitorDataArr;
            currentItemArray = arrayOfVisitorsDataArr.slice();
            dataIndex = 1;
            break;
        case 1:
            currentStatArray = arrayOfStatBookDataArr;
            currentItemArray = arrayOftablesDataArr.slice();
            dataIndex = 2;
            break;

        default:
            break;
    }
    currentStatArray = [];
    let param = getStatDatas(currentStatArray, currentItemArray, dataIndex);

    fillStatTableRows(param);
};

function getStatDatas(currentStatArray, currentItemArray, dataIndex) {

    currentStatArray = [];
    for (let i = 0; i < currentItemArray.length; i++) {
        mas[i] = [];

        statDataArray[i] = arrayOfCardsDataArr.filter(item => item[dataIndex] == currentItemArray[i][1]);
        mas[i].push(currentItemArray[i][1], statDataArray[i].length);
        currentStatArray.push(mas[i]);
    }

    currentStatArray.sort(function (a, b) {
        return b[1] - a[1];
    });

    for (let i = 0; i < currentStatArray.length; i++) {
        currentStatArray[i].unshift(i + 1);

    }
    return currentStatArray;
};

function fillStatTableRows(arr=[]) {
    let klm = JSON.parse(localStorage.getItem('statColumns'));
    let klmp = parseInt(klm);

    let rows = statTableBody.getElementsByTagName("tr");

    while (statTableBody.childElementCount > 0) {
        [].forEach.call(rows, function (item) {
            item.remove();
        });
    };


    let newRow;

    for (let i = 0; i < 5; i++) {

        newRow = document.createElement('tr');

        for (let i = 0; i < klmp; i++) {
            let newCell = document.createElement('td');
            newCell.classList.add('bookCell');
            newRow.appendChild(newCell);
            // newRow.style.background = 'yellow';
        }
        statTableBody.appendChild(newRow);

        for (let j = 0; j < arr[i].length - 1; j++) {
            newRow.children[j].innerHTML = arr[i][j];
        }
    }
};