// Variables
var input = document.getElementById("input-change");
var tableCellDisplay = document.getElementById("tableCellID");
var btnClear = document.getElementById('btn-clear');
var btnClearCell = document.getElementById('btn-clear-cell');
var lastSelectedCell;

// function to load table on onload event
function loadTable(){
    document.getElementById("SpreadsheetTable").innerHTML = createTable();
}

// function create table
function createTable() {
    // start with the table declaration
    var divHTML = "<table id='tblCreated' border='1' cellpadding='0' cellspacing='0' class='table table-striped table-hover'>";

    // create column header
    divHTML += "<tr><th></th>";

    // convert a Unicode number into a character (65 = capital letter A, 66 = capital letter B and so on)
    for (var i = 0; i < 10; i++) {
        divHTML += "<th>" + String.fromCharCode(i + 65) + "</th>";
    }

    // closing headers
    divHTML += "</tr>";

    // create table area
    for (var t = 1; t <= 20; t++) {
        divHTML += "<tr>";
        // ...first column of the current row (row label)
        divHTML += "<td id='" + t + "_0' class='BaseColumn'>" + t + "</td>";

        // ... the rest of the columns
        for (var i = 1; i <= 10; i++)
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

    //1_1
    // let rcArray = ref.id.split('_'); //[1,1]

    tableCellDisplay.innerHTML = ref.id // TODO---> converter coluna pra Alfabeto
    ref.className = "cellSelected";
    
    // If there is no value on the cell clean the input value
    if (document.getElementById(tableCellDisplay.textContent).textContent === "") {
        input.value = "";
    }
    else {
        // If there is a value in the cell display the value in the input
        input.value = document.getElementById(tableCellDisplay.textContent).textContent;
    }
    // Assign this as the last selected cell
    lastSelectedCell = tableCellDisplay.textContent;

    // focus and able on input
    input.disabled = false;
    input.focus();
}   

function inputValueToCell() {
    document.getElementById(tableCellDisplay.textContent).innerHTML = input.value;
}

var tabela = document.getElementById('SpreadsheetTable');

// Clear Selected Cell
btnClearCell.addEventListener('click', function (e) {	
    document.getElementById(tableCellDisplay.textContent).innerHTML = " ";
    input.value = " ";

});

// Clear All Cells
btnClear.addEventListener('click', function (e) {	
    document.getElementById(tableCellDisplay.textContent).innerHTML = " ";
    let clearAllCells = document.getElementsByClassName('cell');
    Array.prototype.forEach.call(clearAllCells, function(el){
        el.innerHTML = '';
    });
    input.value = " ";

});

