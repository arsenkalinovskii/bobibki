let maxid=0
let container = document.getElementById("userTable");
let mas = [];
function userList() {
 // Call Web API to get a list of user
    $.ajax({
        url: 'http://localhost:8080/api/users/',
        type: 'GET',
        dataType: 'json',
        success: function (users) {
            userListSuccess(users);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}
function userListSuccess(users) {
 // Iterate over the collection of data
    $.each(users, function (index, user) {
 // Add a row to the user table
        userAddRow(user);
    });
}
function userAddRow(user) {
 // Check if <tbody> tag exists, add one if not
 if ($("#userTable tbody").length == 0) {
 $("#userTable").append("<tbody id=\"Parent\"></tbody>");
 }
 // Append row to <table>
 $("#userTable tbody").append(
 userBuildTableRow(user));
 }
 function userBuildTableRow(user) {
  return "<tr id=\"" + user.id + "\" " +
  "onclick=" + "\"rowOnClick(" + user.id + ");\"" + ">" +
  "<td>" + user.id + "</td>" +
  "<td>" + user.firstname + "</td>" +
  "<td>" + user.lastname + "</td>" +
  "</tr>";
 }
 function handleException(request, message, error) {
  let msg = "";
  msg += "Code: " + request.status + "\n";
  msg += "Text: " + request.statusText + "\n";
  if (request.responseJSON != null) {
  msg += "Message" + request.responseJSON.Message + "\n";
  }
  alert(msg);
 }
 function formClear() {
  $("#firstname").val("");
  $("#lastname").val("");
  $("#id").val("");
 }
 function updateClick() {
  // Build user object from inputs
  const User = {};
  mas.push(0);
  User.firstname = $("#firstname").val();
  User.lastname = $("#lastname").val();
  userAdd(User);

 }
 function rowOnClick(id) {
        if (document.getElementById("button"+id) == null) {
            temp = document.createElement('td');
            temp.innerHTML = "<button id = \"button" + id + "\" onclick=\"buttonOnClick(" + (id) + ")\">DELETE</button>";
            document.getElementById(id).append(temp);
        }
 }
 function  buttonOnClick(id) {
    document.getElementById("Parent").removeChild(document.getElementById(id));
    $.ajax({
            url: "http://localhost:8080/api/users/"+(id),
            type: 'DELETE',
            dataType: 'json',
            success: function (user) {
                userDeleteSuccess(user);
            },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
      });
 }
 function userAdd(user) {
    $.ajax({
        url: "http://localhost:8080/api/users",
        type: 'POST',
        contentType:
        "application/json;charset=utf-8",
        data: JSON.stringify(user),
        success: function (user) {
            userAddSuccess(user);
        },
    error: function (request, message, error) {
        handleException(request, message, error);
    }
  });
 }
 function userAddSuccess(user) {
  userAddRow(user);
  formClear();
 }
 function userDeleteSuccess() {
 formClear();
 }