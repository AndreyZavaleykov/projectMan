   let mess;
    function textPrint(e){
        mess=new Array(e)
    }
    var size = 16;
    var txtcol = "#4B0082";
    var lastcol = "#FFC618";
    var pause = 1500;
    var speed = 30;
    var i = i_str = 0;
    var msg = msgpre = msgafter = "";

    function get_text() {
    msgpre = mess[i].substring(0, i_str-1);
    msgafter = mess[i].substring(i_str-1, i_str);
    msg = "<span style='position: relative; color:" + txtcol + "; font-size: " +
    size + "px;'>" + msgpre + "<span style='color:" + lastcol + ";'>" + msgafter +
    "</span></span>";
}

    function go() {
    if (i_str<=mess[i].length-1) {
    i_str++;
    get_text();
    if (document.all) typewriter.innerHTML = msg;
    else if (document.layers) {
    document.typewriter.document.write(msg);
    document.typewriter.document.close();
}
    else document.getElementById("typewriter").innerHTML = msg;
    var timer = setTimeout("go()", speed);
}
    else {
    clearTimeout(timer);
    var timer = setTimeout("changemess()", pause);
}
}
    function changemess() {
    i++;
    i_str = 0;
    if (i>mess.length-1) {i = 0;
        return;}
    go();
}