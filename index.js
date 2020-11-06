// Variables
var input = document.getElementById("input-change");
var tableCellDisplay = document.getElementById("tableCellID");
var btnClear = document.getElementById('btn-clear');
var btnClearCell = document.getElementById('btn-clear-cell');
var lastSelectedCell;
var selectedRow;
var selectedColumn;

// Creating a JavaScript 2d array
tblArray = [];
var tableRow = 20;
var tableCol = 10;

// Loop in order to store the row and col position in the table array
for (var i = 0; i < tableRow; i++) {
    tblArray[i] = [];
    for (var j = 0; j < tableCol; j++) {
        tblArray[i][j] = "";
    }
}

// determines if user entered a formula such as =SUM(A1:B2) and returns an array with formula components
function getFormula(tbValue) {
    var pattern = /[:|\(|\)]/;
    var ar = tbValue.split(pattern);
    var sum = ar[0].toUpperCase();

    if (ar.length < 3) {
        return null;
    }
    else if (sum !== "=SUM") {
        return null;
    }
    else {
        return ar;
    }
}

// function to load table on onload event
function loadTable() {
    document.getElementById("SpreadsheetTable").innerHTML = createTable(tableRow, tableCol);
}

// function create table
function createTable(tableRow, tableCol) {
    // start with the table declaration
    var divHTML = "<table id='tblCreated' border='1' cellpadding='0' cellspacing='0' class='table table-striped table-hover'>";

    // create column header
    divHTML += "<tr><th></th>";

    // convert a Unicode number into a character (65 = capital letter A, 66 = capital letter B and so on)
    for (var i = 0; i < tableCol; i++) {
        divHTML += "<th>" + String.fromCharCode(i + 65) + "</th>";
    }

    // closing headers
    divHTML += "</tr>";

    // create table area
    for (var t = 1; t <= tableRow; t++) {
        divHTML += "<tr>";
        // ...first column of the current row (row label)
        divHTML += "<td id='" + t + "_0' class='BaseColumn'>" + t + "</td>";

        // ... the rest of the columns
        for (var i = 1; i <= tableCol; i++)
            divHTML += "<td id='" + t + "_" + i + "' class='cell' onclick='clickCell(this)'></td>";

        // ...end of row
        divHTML += "</tr>";
    }

    // finally add the end of table tag
    divHTML += "</table>";

    //alert(divHTML);
    return divHTML;
}

// event handler fires when user clicks a cell
function clickCell(ref) {
    // Check if the selected cell changed
    if (lastSelectedCell) {
        //remove cellSelected class of the last selected cell...
        let element = document.getElementById(lastSelectedCell);
        element.classList.remove("cellSelected");
        // Assign new name to the cell
        element.className = "cell";
    }

    tableCellDisplay.innerHTML = ref.id // TODO---> converter coluna pra Alfabeto
    ref.className = "cellSelected";

    // If there is no value on the cell clean the input value
    // if (document.getElementById(tableCellDisplay.textContent).textContent === "") {
    //     input.value = "";
    // }
    // else {
    // If there is a value in the cell display the value in the input
    var rcArray = ref.id.split('_');
    selectedRow = rcArray[0];
    selectedColumn = rcArray[1];
    input.value = tblArray[selectedRow - 1][selectedColumn - 1];
    // If it is not a formula display the the value on the cell
    if (!input.value.startsWith("=SUM")) {
        document.getElementById(tableCellDisplay.textContent).innerHTML = input.value;
    }
    // }
    // Assign this as the last selected cell
    lastSelectedCell = tableCellDisplay.textContent;

    // Assign the value on table array
    var rcArray = ref.id.split('_');
    selectedRow = rcArray[0];
    selectedColumn = rcArray[1];

    // focus and able on input
    input.disabled = false;
    input.focus();

    // Able the button clean cell
    document.getElementById("btn-clear-cell").disabled = false;
}

function inputValueToCell() {
    document.getElementById(tableCellDisplay.textContent).innerHTML = input.value;

    // Assign the value to the table array
    tblArray[selectedRow - 1][selectedColumn - 1] = (document.getElementById("input-change").value).toUpperCase();

    // call function to calculate the formula
    calculateCell(selectedRow - 1, selectedColumn - 1);

    recalculate();
}

// Clear Selected Cell
btnClearCell.addEventListener('click', function (e) {
    document.getElementById(tableCellDisplay.textContent).innerHTML = "";
    input.value = "";
    tblArray[selectedRow - 1][selectedColumn - 1] = "";
    inputValueToCell();
});

// Clear All Cells
btnClear.addEventListener('click', function (e) {
    document.getElementById(tableCellDisplay.textContent).innerHTML = "";
    let clearAllCells = document.getElementsByClassName('cell');
    Array.prototype.forEach.call(clearAllCells, function (el) {
        el.innerHTML = '';
    });
    input.value = "";

    // Clear the table array
    // Creating a JavaScript 2d array
    tblArray = [];
    var tableRow = 20;
    var tableCol = 10;

    // Loop in order to store the row and col position in the table array
    for (var i = 0; i < tableRow; i++) {
        tblArray[i] = [];
        for (var j = 0; j < tableCol; j++) {
            tblArray[i][j] = "";
        }
    }
});

/* MATH PART */
// Sample code fragments
// ******************************************
// traverse the 2d array looking for formulas
// and then recalculate cell values
// tblArray is the 2d JS array
function recalculate() {
    for (var i = 0; i < tableRow; i++) {
        for (var j = 0; j < tableCol; j++) {
            // check to see if table element is a formula
            if (tblArray[i][j].indexOf("=SUM") !== -1) {
                // apply the formula for cell at row/column i/j
                calculateCell(i, j);
            }
        }
    }
}

// ***********************************************************************
// if we find a formula, parse it to find the from (row and column) and
// the to (row and column) and then perform the calculation by getting all
// the numeric values from the 2d array and generating a total
// parse the formula with a call to getFormula
// ... finally take the calculated total and insert into the HTML table
function calculateCell(row, column) {
    // begin by getting the formula parts
    var tokenArray = getFormula(tblArray[row][column]);

    // tokenArray[1] and tokenArray[2] contain the from and to references
    // need more validation if this was a production level app

    if (tokenArray !== null) {
        var fromColumn = tokenArray[1].substr(0, 1);
        var fromRow = tokenArray[1].substr(1, tokenArray[1].length - 1);

        var toColumn = tokenArray[2].substr(0, 1);
        var toRow = tokenArray[2].substr(1, tokenArray[2].length - 1);

        // assign the actual row/column index values for the tblArray
        var fromRowIndex = parseFloat(fromRow) - 1;
        var fromColIndex = fromColumn.charCodeAt(0) - 65;

        var toRowIndex = parseFloat(toRow) - 1;
        var toColIndex = toColumn.charCodeAt(0) - 65;

        var sumTotal = 0;

        for (var i = fromRowIndex; i <= toRowIndex; i++) {
            for (var j = fromColIndex; j <= toColIndex; j++) {
                // make sure we have a number for addition
                // Assume value 0 if there is no information on this cell
                if (!tblArray[i][j]) {
                    tblArray[i][j] = "0";
                }
                if (tblArray[i][j].startsWith("=")) {
                    let cell = document.getElementById(Number(i + 1) + "_" + Number(j + 1));
                    sumTotal += parseFloat(cell.textContent);
                }
                if (isFloat(tblArray[i][j])) {
                    sumTotal += parseFloat(tblArray[i][j]);
                }
            }
        }

        // we now have the total... insert into spreadsheet cell
        // ... get the cell id
        var cellID = (row + 1) + "_" + (column + 1);
        var ref = document.getElementById(cellID)
        ref.innerHTML = sumTotal;
    }
}


// ***********************************************
// determines if this is an acceptable float value
function isFloat(s) {
    var ch = "";
    var justFloat = "0123456789.";

    for (var i = 0; i < s.length; i++) {
        ch = s.substr(i, 1);

        if (justFloat.indexOf(ch) == -1) {
            return false;
        }
    }
    return true;
}

