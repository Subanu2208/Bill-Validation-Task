let editText;
let data = [];
window.onload = () =>{
    table(data);
}


function table(data) {
    console.log(data);
    var k = "";
    for (var i = 0; i < data.length; i++) {
        k += "<tr>";
        k += "<td>" + data[i].billNo + "</td>";
        k += "<td>" + data[i].customerName + "</td>";
        k += "<td>" + data[i].customerPhone + "</td>";
        k += "<td>" + data[i].grandTotal + "</td>";

        k +=
            '<td><button class="btn btn-primary" style="" onclick="Edit(' +
            data[i].id +
            ')">Edit</button> <button class="btn btn-danger"  onclick="Del(' +
            data[i].id +
            ')">Delete</button></td>';
    }
    document.getElementById("displayArea").innerHTML = k;
}



function Edit() {

    let url = "https://656e9de46529ec1c62366493.mockapi.io/bill"; // Replace YOUR_API_KEY with your actual API key

    fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then((result) => result.json())
        .then((response) => {
            console.log(response);
            table(response);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    

function Edit(id) {
    let url = "https://656e9de46529ec1c62366493.mockapi.io/bill/" + id;

    fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then((result) => result.json())
        .then((response) => {
            document.getElementById("billNo").value = response.billNo;
            document.getElementById("customerName").value = response.customerName;
            document.getElementById("customerPhone").value = response.customerPhone;

            // Clear existing rows in the table
            clearTable();

            // Add rows and set values for each item in the response
            for (let i = 0; i < response.items.length; i++) {

                addRow();
                document.getElementById("item" + (i + 1)).value = response.items[i].item;
                document.getElementById("qty" + (i + 1)).value = response.items[i].qty;
                document.getElementById("rate" + (i + 1)).value = response.items[i].rate;
                document.getElementById("totalrate" + (i + 1)).value = response.items[i].totalrate;
            }

            document.getElementById("grandTotalDisplay").value = response.grandTotal;
            document.getElementById("id").value = id;


            Editing();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}


}
function clearTable() {

    var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }

    orderData = [];
}


function Editing() {

    var inputFields = document.querySelectorAll('.item, .qty, .rate, .totalrate');
    inputFields.forEach(function (field) {

        field.removeAttribute('readonly');
    });
}

function Del(id) {
    let url = "https://656e9de46529ec1c62366493.mockapi.io/bill/" + id; 

    fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
        .then((result) => result.json())
        .then((response) => {
            Edit();
            console.log(response);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
  
