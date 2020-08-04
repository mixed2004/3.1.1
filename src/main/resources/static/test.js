// document.write("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// $(document).ready(
//
//     fetch("/rest/admin")
//         .then(response => response.json())
//         .then(data => console.log(data)));
//
// alert("!!!!!!!!!!!!!");
//  let key;
//
//  for(key in k)
//
$(document).ready(getAllUsersRestAndPrint())

async function getAllUsersRestAndPrint() {
    let response = await fetch("/rest/admin");
    let content = await response.json();
    let listUsers = document.getElementById('allUsersList');
    let user = '';
    let key;
    for (key in content) {
        // document.writeln(content[key].id)
        console.log(content[key]);
        user = `
<tr>
    <td>${content[key].id}</td>
     <td>${content[key].name}</td>
     <td>${content[key].password}</td>
     <td>${content[key].adress}</td>
</tr>`
   //    listUsers.append('user')
        listUsers.innerHTML = user;
    }
//    listUsers.innerHTML = user;

}

//getAllUsersRestAndPrint();