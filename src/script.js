
$(document).ready(function () {
    $("#file-upload").hide();
    $("#logout-button").hide();
   
});
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:image/jpg,' + encodeURIComponent(text));
    pom.setAttribute('download', "hhh.jpg");
    pom.style.display = 'none';
    document.body.appendChild(pom);
    pom.click();
    document.body.removeChild(pom);   
  }
  function blobToFile(theBlob, fileName){       
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
}
function urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
}
function btn_click(val){
    var url = "/filemanagement/download/";
    let formData = new FormData();
    formData.append("filename",val); 
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: url,  
            data:{"filename":val},
            success: function (data) {
                const fileURL = window.URL.createObjectURL(new Blob([data]));
                const fileLink = document.createElement('a');
                fileLink.href = val;
                fileLink.setAttribute('download', val.split("\\")[1]);
                document.body.appendChild(fileLink);
                fileLink.click();
                fileLink.remove();
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    });
   
    return ;
}
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());
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

$("#regButton").click(function (event) {

  
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
            $("#logout-button").show();
        },
        error: function (data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
});

$("a.logout").click(function (event) {
    $("#login-register").show();
    $('#userid').val('');
    $("#logout-button").hide();
    $("#file-upload").hide();
});