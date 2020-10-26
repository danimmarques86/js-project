// function to load table on onload event
function loadTable(){
    document.getElementById("SpreadsheetTable").innerHTML = createTable();
}

// function create table
function createTable() {
    // start with the table declaration
    var divHTML = "<table border='1' cellpadding='0' cellspacing='0' class='table table-striped table-hover'>";

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
    var rcArray = ref.id.split('_');
    alert("You selected row " + rcArray[0] + " and column " + rcArray[1]);
}




