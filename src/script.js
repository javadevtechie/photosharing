/*loadData();
async function loadData() {
    const list = document.getElementById("tdata");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    await fetch('/file/getall', {
        method: "GET",

    }).then(res => res.json())
        .then(response => {
            if (response.length == 0) {
                console.log(response);
                createRow(null);
            }
            for (let i = 0; i < response.length; i++) {
                console.log(response[i]);
                createRow(response[i]);
            }
        })
        .catch(error => console.error('Error:', error));;
}
*/

$(document).ready(function(){
    $("#file-upload").hide();
  });
function createRow(myObj) {
    const tableBody = document.getElementById("tdata");
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    if (myObj != null) {
        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode(myObj.iddocument));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode(myObj.originaname));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode(myObj.updatedby));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.width = '75';
        var a = document.createElement('a');
        var linkText = document.createTextNode("Download");
        a.appendChild(linkText);
        a.title = "Download";
        a.href = "/file/download/"+myObj.path.split("\\")[1];
        td.appendChild(a);
        tr.appendChild(td);
    }
    else {
        var td = document.createElement('TD');
        td.width = '75';
        td.colspan = "4"
        td.appendChild(document.createTextNode("No Data"));
        tr.appendChild(td);
    }


}
function download(obj) {
    console.log(obj);
}
async function uploadFile() {
    let formData = new FormData();
    formData.append("file", fileupload.files[0]);
    await fetch('/filemanagement/upload', {
        method: "POST",
        body: formData
    });
}

function formDataToJSON(form) {
    let obj = {};
    let formData = form.serialize();
    let formArray = formData.split("&");

    for (inputData of formArray){
        let dataTmp = inputData.split('=');
        obj[dataTmp[0]] = dataTmp[1];
    }
    return JSON.stringify(obj);
}

$("#submitButtonId").click(function(event) {
    var url = "/filemanagement/register"; 
    var formData=formDataToJSON( $('#regForm'));
    const obj = JSON.parse(formData);
    $.ajax({
           type: "POST",
           url: url,
           contentType: "application/json",
           data: JSON.stringify( obj ),
           success: function(data)
           {
               alert(data.message);
               $("#regForm")[0].reset();
           },
           failure: function(errMsg) {
            alert(errMsg);
          }
         });

    return false; 
});

$("#login-button").click(function(event) {
    var url = "/filemanagement/login"; 
    var formData=formDataToJSON( $('#login-form'));
    const obj = JSON.parse(formData);
    console.log(obj);
    $.ajax({
           type: "POST",
           url: url,
           contentType: "application/json",
           data: JSON.stringify( obj ),
           success: function(data)
           {
               console.log(data.message);
               $("#login-form")[0].reset();
               $("#login-register").hide();
               $("#file-upload").show();

           },
           error: function(data) {
                  alert(data.responseJSON.message);
          }
         });

    return false;
});