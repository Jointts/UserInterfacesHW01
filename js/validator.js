/**
 * Created by pagulane on 22.03.16.
 */


function validateLogin(){
    var loginForm = document.forms["loginForm"];
    var username = loginForm.username.value;
    var password = loginForm.password.value;
    var users = getUsers();

    for(var x = 0; x < users.length; x++){
        if(users[x].username == username && users[x].password == password){
            setCookie(username);
            window.location = "dashboard.html";
            return true;
        }
    }

    function setCookie(username){
        document.cookie = "username=" + username + ";";
    }

}

function register(){
    var registerForm = document.forms["registerForm"];
    var username = registerForm.username.value;
    var password = registerForm.password.value;
    var admin = registerForm.admin.checked;
    setUser(username, password, admin);
}

function setUser(username, password, admin){
    var users = getUsers();
    var user = {};
    user.username = username;
    user.password = password;
    user.admin = admin;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function clearStorage(){
    localStorage.clear();
}

function getUsers(){
    if (localStorage.getItem("users") == null) {
        return [];
    } else {
        //  alert("Accessed localStorage");
        return JSON.parse(localStorage.getItem("users"));
    }
}

// Login Validation Block //