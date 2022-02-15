let visitorPanBtn = document.querySelector('.visitorsBtn');

let saveVisitorBtn = document.querySelector('.saveVisitorBtn');
let saveEditVisitorBtn = document.querySelector('.editVisitorBtn');

let searchVisitorBtn = document.querySelector('.searchVisitorBtn');
let sortVisitorBtn = document.querySelector('.sortVisitorBtn');

let newVisitorBtn = document.querySelector('.createNewVisitorBtn');

let closeModalVisitorBtn = document.querySelector('.closeVisitorTab');
let closeModalEditVisitorBtn = document.querySelector('.closeEditVisitorTab');

let visitorsArea = document.querySelector('.visitorWrapper');

let modalVisitor = document.querySelector('.createNewVisitorTab');
let modalEditVisitor = document.querySelector('.editVisitorTab');

let visitorsTableBody = document.querySelector('.visitorBody');
let visitorTable = document.querySelector('.visitorsTable');
let visitorsHeaderTable = document.querySelector('.visitorsHeaderTable');

let visitorInputItems = document.querySelectorAll('.inputVisitorItem');
let editVisitorInputItems = document.querySelectorAll('.inputEditVisitorItem');

let sortVisitorsSelect = document.querySelector('#sortVisitorTabItem');

let arrayOfVisitorsDataArr = JSON.parse(localStorage.getItem('visitorTableDatas')) || [];
let visitorRowsWithNumbers = [0];
let arrayOfVisitorCellsForSearch = [1, 2];
let visitorArray = arrayOfVisitorsDataArr;

let visitorPhoneRegexp = /[0-9^ -][0-9 -]+/gm;

/*----------------- CREATE NEW VISITOR -------------------------- */

newVisitorBtn.onclick = function () {

    $(modalVisitor).fadeIn(250);

    modalVisitor.classList.remove('hiddenStyle');
    modalVisitor.classList.add('visibleStyle');
};

// closeModalVisitorBtn.addEventListener('click', closeModal(closeModalVisitorBtn, modalVisitor));
// closeModalEditVisitorBtn.addEventListener('click', closeModal(closeModalEditVisitorBtn, modalEditVisitor));

$(closeModalVisitorBtn).click(function(){
    $(modalVisitor).fadeOut(350);
})

$(closeModalEditVisitorBtn).click(function(){
    $(modalEditVisitor).fadeOut(350);
})

saveVisitorBtn.onclick = function () {
    checkPhone(visitorInputItems, modalVisitor, function () {saveDatas(modalVisitor, visitorRowsWithNumbers, function () { saveTableFunc(modalVisitor, arrayOfVisitorsDataArr, 'visitorTableDatas', visitorInputItems, 'visitorColumns', visitorsTableBody, 'input', modalEditVisitor, editVisitorInputItems) }, numberRowsRegexp, 'input')});
};

function checkPhone(imputName, modalWindName, saveFunc) {
    let visitorInp = modalWindName.querySelectorAll('input');
    let visitorInputsArr = Array.from(visitorInp);

    visitorInputsArr.forEach(function (item) {
        item.style.cssText = `
border-width: 2px;
border-style: inset;
border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
border-image: initial;
`
    });

    if (!visitorPhoneRegexp.test(imputName[2].value)) {
        // alert('Incorrect phone number');
        toastr.error("Incorrect phone number!");
        imputName[2].style.border = "4px solid #14e4c1";
    }
    else {
        saveFunc();
        
    }
};

//------------EDITING OF TABLE ROWS---------------------------------

saveEditVisitorBtn.onclick = function () {

    checkPhone(editVisitorInputItems, modalEditVisitor, function(){
        saveDatas(modalEditVisitor, visitorRowsWithNumbers, function () { saveEditTable(visitorsTableBody, arrayOfVisitorsDataArr, modalEditVisitor, editVisitorInputItems, 'visitorTableDatas') }, numberRowsRegexp, 'input');
    });
};

//---------DELETING OF TABLE ROWS------------------------------------

visitorsHeaderTable.rows[0].children[4].onclick = function () {
    deleteRows.call(visitorTable.rows[0].children[4], visitorsTableBody, arrayOfVisitorsDataArr, 'visitorTableDatas', 4);

    // toastr.success("Checked visitors has ben deleted");
};


//-------SEARCH IN TABLE---------------------------------------------

searchVisitorBtn.addEventListener('click', function () {
    searchFunc(visitorsTableBody, arrayOfVisitorCellsForSearch, '#searchVisitorItem');
});


//-------SORTING TABLE ROWS-----------------------------------------

sortVisitorBtn.addEventListener('click', function () {

    let visitorSelectIndex = sortVisitorsSelect.options.selectedIndex;

    switch (visitorSelectIndex) {
        case 0:
            index = 0;
            numIndex = 0;
            sortNumsOfTable(visitorArray, index);
            break;
        case 1:
            index = 1;
            console.log('sort str visitor!');
            sortStrOfTable(visitorArray, index);
            break;
        
        default:
            break;
    }
    sortTable(visitorTable, index, numIndex);
});

