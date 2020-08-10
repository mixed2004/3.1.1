$(document).ready(getAllUsersRestAndPrint())

async function getAllUsersRestAndPrint() {
    let response = await fetch("/rest/admin");
    let content = await response.json();
    let listUsers = document.getElementById('allUsersList');
    let user = '';
    let key;
    let keyRole;
    for (key in content) {
        console.log(content[key]);
        var idUser= "userRow"+content[key].id;
        user = `
<tr class="${content[key].id}">
    <td>${content[key].id}</td>
    <td>${content[key].name}</td>
    <td>${content[key].surname}</td>
    <td>${content[key].adress}</td>
    <td>${content[key].login}</td>
    <td>${content[key].password}</td>
<td>
<span>`;
        for (keyRole in content[key].roles) {
            user += `
             ${content[key].roles[keyRole].roleName + " "}
            `;
        }
        user +=` </span>
             </td>
             <td>
                <button type="button" class="btn btn-info" data-toggle="modal"
                    th:data-target="'#EditModal'+${content[key].id}">EDIT
                </button>
                </td>
            <td>
                <button type=“button” class="btn btn-danger" data-toggle="modal"
                    data-target="#DeleteModal" onclick="clickFillDeleteModalForm(${content[key].id})">DELETE
                </button>
            </td>
             </tr>`;
       $(listUsers).append(user);
    }
        response = await fetch("/rest/user");
        content = await response.json();
        let userJson = document.getElementById('authorityUser');
        user =`
        <tr>
    <td>${content.id}</td>
    <td>${content.name}</td>
    <td>${content.surname}</td>
    <td>${content.adress}</td>
    <td>${content.login}</td>
    <td>${content.password}</td>
<td>
<span>`;
        for (keyRole in content.roles) {
            user += `
             ${content.roles[keyRole].roleName + " "}
            `;
        }
        user +=` </span>
             </td>
             </tr>
        `;
    $(userJson).append(user);
}

async function clickAddNewUser() {
    var checked = [];
    var newUserLogin = $("#addUserLogin").val();
    $('input:checkbox:checked').each(function() {
        checked.push($(this).val());
    });
    console.log(checked);
       await fetch("/rest/admin", {
        method: "POST",
        body: JSON.stringify({
           name: $("#addUserName").val(),
            surname: $("#addUserSurname").val(),
            adress: $("#addUserAdress").val(),
            login: newUserLogin,
            password: $("#addUserPassword").val(),
           rolesString: checked

        }),
        headers: {"Content-Type": "application/json; charset=utf-8"}
    });
//    alert(newUserLogin);
    let response = await fetch("/rest/admin/userThatWasAdd",{
        method: "POST",
        body: String(newUserLogin),
            headers: {"Content-Type": "application/json; charset=utf-8"}
    });


    let content = await response.json();
    let keyRole;
    console.log(content);
    let userJson = document.getElementById('allUsersList');
    user =`
        <tr class="${content.id}">
    <td>${content.id}</td>
    <td>${content.name}</td>
    <td>${content.surname}</td>
    <td>${content.adress}</td>
    <td>${content.login}</td>
    <td>${content.password}</td>
<td>
<span>`;
    for (keyRole in content.roles) {
        user += `
             ${content.roles[keyRole].roleName + " "}
            `;
    }
    user +=` </span>
             </td>
             <td>
                <button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="'#EditModal'+${content.id}">EDIT
                </button>
                </td>
            <td>
                <button type=“button” class="btn btn-danger" data-toggle="modal"
                    data-target="#DeleteModal" onclick="clickFillDeleteModalForm(${content.id})">DELETE
                </button>
            </td>
             </tr>`;
    $(userJson).append(user);
}

async function clickFillDeleteModalForm(id) {
    let response = await fetch("/rest/admin/userForFillModalForm",{
        method: "POST",
        body: id,
        headers: {"Content-Type": "application/json; charset=utf-8"}
    });
    let contentDel = await response.json();
    console.log(contentDel);
//    let id = ${contentDel.id};
   $('#deleteIdModalForm').attr("value", contentDel.id);
    $('#deleteNameModalForm').attr("value", contentDel.name);
    $('#deleteSurnameModalForm').attr("value", contentDel.surname);
    $('#deleteAdressModalForm').attr("value", contentDel.adress);
    $('#deleteLoginModalForm').attr("value", contentDel.login);
  //  $('#deleteLoginModalForm').attr("value", contentDel.id);
    let keyRole;
    let userRoles='';
    for (keyRole in contentDel.roles) {
       userRoles += `
             ${contentDel.roles[keyRole].roleName + " "}
            `;
    }

     $('#allUsersRolesInDeleteModalForm').append(userRoles);

}

async function clearUserRolesFromForm() {
    $('#allUsersRolesInDeleteModalForm').empty();
}

async function deleteUserFromForm() {
    let userIdForDelete = $("#deleteIdModalForm").val();
    let userRowForDelete = "userRow"+userIdForDelete;
    await fetch(
        "rest/admin",{
        method: "DELETE",
        body: userIdForDelete,
        headers: {"Content-Type": "application/json; charset=utf-8"}
    });
 //   await clearUserRolesFromForm();
 //   alert(userIdForDelete);
//    document.getElementById('$("#deleteIdModalForm").val()').remove();
  //  $('form:tr:#userIdForDelete').remove();
 //   alert(userRowForDelete);
    $("tr.userIdForDelete").empty();
// $(.allUsersList:"#userIdForDelete").empty();

}
