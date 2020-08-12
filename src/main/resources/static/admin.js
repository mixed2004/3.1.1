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
        user = `
                <tr class=${content[key].id} id=${content[key].id}>
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
                    data-target="#EditModal"onclick="clickFillEditModalForm(${content[key].id})">EDIT
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
        <tr class=${content.id}>
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
                    data-target="#EditModal" onclick="clickFillEditModalForm(${content.id})">EDIT
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
   $('#deleteIdModalForm').attr("value", contentDel.id);
    $('#deleteNameModalForm').attr("value", contentDel.name);
    $('#deleteSurnameModalForm').attr("value", contentDel.surname);
    $('#deleteAdressModalForm').attr("value", contentDel.adress);
    $('#deleteLoginModalForm').attr("value", contentDel.login);
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
    const userRowForDelete = String(userIdForDelete);
    await fetch("rest/admin",{
        method: "DELETE",
        body: userIdForDelete,
        headers: {"Content-Type": "application/json; charset=utf-8"}
    });
    await clearUserRolesFromForm();
    let del = await document.getElementsByClassName(userRowForDelete);
    $(del).empty();
}

async function clickFillEditModalForm(id) {
    let response = await fetch("/rest/admin/userForFillModalForm", {
        method: "POST",
        body: id,
        headers: {"Content-Type": "application/json; charset=utf-8"}
    });
    let contentEdit = await response.json();
    console.log(contentEdit);
    $('#editIdModalForm').attr("value", contentEdit.id);
    $('#editNameModalForm').attr("value", contentEdit.name);
    $('#editSurnameModalForm').attr("value", contentEdit.surname);
    $('#editAdressModalForm').attr("value", contentEdit.adress);
    $('#editLoginModalForm').attr("value", contentEdit.login);
}

async function editUserFromForm() {
    let userId = $("#editIdModalForm").val();
    let userIdForEdit = $("#editIdModalForm").val();
    const userRowForEdit = String(userIdForEdit);
    var checked = [];
    $('input:checkbox:checked').each(function () {
        checked.push($(this).val());
    });
    console.log(checked);
    await fetch("/rest/admin", {
        method: "PUT",
        body: JSON.stringify({
            id: $("#editIdModalForm").val(),
            name: $("#editNameModalForm").val(),
            surname: $("#editSurnameModalForm").val(),
            adress: $("#editAdressModalForm").val(),
            login: $("#editLoginModalForm").val(),
            password: $("#editPasswordModalForm").val(),
            rolesString: checked
        }),
        headers: {"Content-Type": "application/json; charset=utf-8"}
    });
    let edit = await document.getElementsByClassName(userRowForEdit);
    $(edit).empty();
    let response = await fetch("/rest/admin/userForFillModalForm", {
        method: "POST",
        body: userId,
        headers: {"Content-Type": "application/json; charset=utf-8"}
    });
    let content = await response.json();
    let keyRole;
    console.log(content);
    let userJson = document.getElementById('allUsersList');
    user = `
            <tr class=${content.id}>
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
    user += ` </span>
             </td>
             <td>
                <button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#EditModal" onclick="clickFillEditModalForm(${content.id})">EDIT
                </button>
                </td>
            <td>
                <button type=“button” class="btn btn-danger" data-toggle="modal"
                    data-target="#DeleteModal" onclick="clickFillDeleteModalForm(${content.id})">DELETE
                </button>
            </td>
             </tr>
`;
    $(userJson).append(user);
}