/**
 * Created by pagulane on 23.03.16.
 */


$( document ).ready( function () {
    if(document.cookie){

    }else{
        window.location = "login.html";
        return false;
    }
});

function logOut(){
    var cookies = document.cookie.split(";");
    for(var i=0; i < cookies.length; i++) {
        var equals = cookies[i].indexOf("=");
        var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location = "login.html";
        return false;
    }
}