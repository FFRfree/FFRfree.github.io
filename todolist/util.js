function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    let content = cname + "=" + cvalue + "; " + expires;
    document.cookie = content;
    return 'append ' + content ;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (let val of ca) {
        val = val.trim()
        if (val.indexOf(name) == 0) return val.substring(name.length, val.length);
    }
    return "";
}
