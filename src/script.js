
$(document).ready(function () {
    $("#file-upload").hide();
});
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:image/jpeg' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
function btn_click(val){
    var url = "/filemanagement/download/";
    let formData = new FormData();
    alert(val);
    formData.append("filename",val);
    console.log(formData);
    $.ajax({
        type: "GET",
        url: url,  
        data:{"filename":val},
        success: function (data) {
            download(val,data);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
    return ;
}
async function uploadFile() {

    let formData = new FormData();
    formData.append("file", fileupload.files[0]);
    formData.append("userid",document.getElementById('userid').value);
    await fetch('/filemanagement/upload', {
        method: "POST",
        body: formData
    });
    callFileManagement();
}

function formDataToJSON(form) {
    let obj = {};
    let formData = form.serialize();
    let formArray = formData.split("&");

    for (inputData of formArray) {
        let dataTmp = inputData.split('=');
        obj[dataTmp[0]] = dataTmp[1];
    }
    return JSON.stringify(obj);
}

$("#submitButtonId").click(function (event) {
    var url = "/filemanagement/register";
    var formData = formDataToJSON($('#regForm'));
    const obj = JSON.parse(formData);
    console.log(obj);
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (data) {
            alert(data.message);
            $("#regForm")[0].reset();
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    return false;
});

function getUserName(userid){
    
    var url = "/filemanagement/getUserName/"+userid;
    let val='';
    $.ajax({
        async: false,
        type: "GET",
        url: url,
        success: function (data) {
            val=data.userid;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
    return val;
}

function callFileManagement() {
    $("#file-upload").show();
    var url = "/filemanagement/getAll";
    var formData = formDataToJSON($('#regForm'));
    const obj = JSON.parse(formData);
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            $("#tdata").children("tr").remove();
            var j=1;
            if(data.length>0){
                for (let i = 0; i < data.length; i++) {
                    console.log(  data[i].user_id);
                      $("#tdata").append(
                          "<tr>"
                        +  "<td>"+ j++ +"</td>"
                        +  "<td>"+ data[i].originalname +"</td>"
                        +  "<td>"+ getUserName(data[i].user_id) +"</td>"
                        +  "<td> <button type='button' value='"+ data[i].path+"' onclick='btn_click(this.value)'>Download</button</td></tr>"
                      );
                  }
            }
            else{
                $("#tdata").append(
                    "<tr>"
                  +  "<td colspan='4'>No Record Available</td>"
                 
                  +  "</tr>"
                );
            }
            
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    return false;
}
$("#login-button").click(function (event) {
    var url = "/filemanagement/login";
    var formData = formDataToJSON($('#login-form'));
    const obj = JSON.parse(formData);
    console.log(obj);
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (data) {
            console.log(data.message);
            $("#login-form")[0].reset();
            $("#login-register").hide();
            $('#userid').val(data.userid);
            callFileManagement();
        },
        error: function (data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
});