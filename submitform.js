var orderData = [];



function submitBill() {

  var billNo = document.getElementById("billNo").value;
  var customerName = document.getElementById("customerName").value;
  var customerPhone = document.getElementById("customerPhone").value;
  var grandTotal = document.getElementById("grandTotalDisplay").value;
  var id = document.getElementById("id").value;

  var flag=true;

  if (billNo == "") {
    document.getElementById("billNo_err").innerHTML = "Required";
    flag=false;
  } else {
    document.getElementById("billNo_err").innerHTML = "";
  }

  if (customerName == "") {
    document.getElementById("customerName_err").innerHTML = "Required";
    flag=false;
  } else {
    document.getElementById("customerName_err").innerHTML = "";
  }

  if (customerPhone == "") {
    document.getElementById("customerPhone_err").innerHTML = "Required";
    flag=false;
  } else {
    document.getElementById("customerPhone_err").innerHTML = "";
  }


var rowCount = document.getElementById("myTable").getElementsByTagName("tbody")[0].rows.length;
  if (rowCount === 0) {

    flag = false;
    
  }

  if (flag) {
    var itemList = [];

    for (var i = 1; i <= rowCount; i++) {
      var item = document.getElementById("item" + i).value;
      var qty = document.getElementById("qty" + i).value;
      var rate = document.getElementById("rate" + i).value;
      var totalrate = document.getElementById("totalrate" + i).value;

      itemList.push({
        item: item,
        qty: qty,
        rate: rate,
        totalrate: totalrate,
      });
    }

    if (billNo != "" && customerName != "" && customerPhone != "" && itemList.length > 0) {
      let obj = {
        billNo: billNo,
        customerName: customerName,
        customerPhone: customerPhone,
        items: itemList,
        grandTotal: grandTotal
      };

      if (id != null && id != "") {
        obj["id"] = id;
        putData(obj);
      } else {
        console.log(obj);
        postData(obj);
      }

      resettable();
    }
  }
}

function resettable() {

  var tableBody = document.getElementById("myTable").getElementsByTagName("tbody")[0];

  tableBody.innerHTML = "";

  document.getElementById("myForm").reset();

  document.getElementById("grandTotalDisplay").value = "0.00";

 
  
}

function postData(obj) {
  let url = "https://656e9de46529ec1c62366493.mockapi.io/bill";

  fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
  })
      .then((result) => result.json())
      .then((response) => {
          console.log(response);
          // window.location.href="table.html";
          Edit();
      })
      .catch((error) => {
          console.error("Error:", error);
      });
}

function putData(obj) {
  let url = "https://656e9de46529ec1c62366493.mockapi.io/bill/" + obj.id;

  fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
  })
      .then((Result) => Result.json())
      .then((response) => {

          console.log(response);
          // window.location.href="table.html";
        Edit();
      })
      .catch((error) => {
          console.error("Error:", error);
      });

}

function addbill (){

window.location.href="billValidation.html";

}