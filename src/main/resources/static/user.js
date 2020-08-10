$(document).ready(getAllUsersRestAndPrint());

async function getAllUsersRestAndPrint() {
    let response = await fetch("/rest/user");
    let content = await response.json();
    console.log(content);
    let userJson = document.getElementById('authorityUser');
    let keyRole;
    let user = `
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
    user += ` </span>
             </td>
             </tr>
        `;
    $(userJson).append(user);
}