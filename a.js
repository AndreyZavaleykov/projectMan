const form = document.querySelector("form");
const button = document.querySelector(".button");
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
let button3 = document.querySelector(".button3");
const buttonOffice = document.querySelector(".buttonOffice");
let info=0, info1=0, office = "ул Рыбаков, д. 3";

// копируем адресса
button.addEventListener("click", () => {
    navigator.clipboard.writeText(info)
})
// копируем номера заявок
button1.addEventListener("click", () => {
    navigator.clipboard.writeText(info1)
})

//сохраняем изменения
button2.addEventListener("click", () => {
    delMap();
    let g=document.querySelector("#adress").innerText;
    info = g;
    console.log(g)
    let b = g.split('-')
    init(b.join(' ,Севастополь, '));
    goCar();
    button3.removeAttribute('disabled');
    button.removeAttribute('disabled');
})

// Копируем километраж
button3.addEventListener("click", () => {
    let km=document.querySelector(".km").innerText;
    let splitkm=km.split("км")
    let km1=splitkm[0].split("Протяженность маршрута: ")
    navigator.clipboard.writeText(km1[1])

})

//Кнопка изменить офис
buttonOffice.addEventListener("click", () => {
    office = prompt("Адрес офиса", "ул Рыбаков, д. 3");
})

//Кнопка Отправить
form.addEventListener("submit", (b) => {
    delMap();
    notSelect();
    b.preventDefault();
    let a = b.target[0].value;
    out(a);
    goCar();
    button.removeAttribute('disabled');
    button1.removeAttribute('disabled');
    button3.removeAttribute('disabled');
    buttonOffice.removeAttribute('disabled');
})


// проверка на json
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return true;
    }
    return false;
}

//обработка введенного JSON кода
function out(a) {

//    Проверка соответствия JSON
if(IsJsonString(a)) {
    alert("Введено неверное значение")
}


    let abc = JSON.parse(a)
    console.log(abc)
    const b = abc[0].timeslots.filter(item => item.start !== "00:00").map(item => {
        const adress = item.work_data.user_addr.split(', кв')
        return {
            adress: adress[0],
            id: item.work_data.id
        }
    })

    const c = b.map(intem => intem.adress)
    const d = b.map(intem => intem.id)
    for (let i = 0; i <= c.length; i++) {
        if (c[i] === c[i + 1] || c[i] === c[i + 2]) {
            c.splice(i, 1);
            d.splice(i, 1);
        }
    }
    //оформление ардесов
    c.unshift(office)
    document.querySelector("#adress").innerHTML = c.join(' - ') + " - "+office;
    info = c.join(' - ') + " - " + office;

    //Красивое оформление номеров заявок
    document.querySelector(".span1").innerHTML = "#" + d.join('; #') + ";"
    info1 = "#" + d.join('; #') + ";";

    //отправка данных в функцию построения маршрута на карте
    init("Севастополь, " + c.join(' , Севастополь, ') + " , Севастополь, "+office);
}

//функция удаления карты при перестроении маршрута
function delMap(){
     if(info) {
        //удаляем карту
        myMap.destroy()
        //удаляем подпись
        var node = document.getElementById('viewContainer');
        while (node.hasChildNodes()) {
            node.removeChild(node.firstChild);
        }
}
}

//отмена авто выделения ардесов
function notSelect() {
    const className = "#content";
    const els = document.getElementsByClassName(className);
    while (els.length > 0) els[0].classList.remove(className);
}

// авто всыделения ардеов
function selectText(elementId) {

    var doc = document,
        text = doc.getElementById(elementId), range, selection;

    if(doc.body.createTextRange) {

        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();

    } else if(window.getSelection) {

        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);

    }

}
$("#content").click(function() {

    selectText(this.id);

});

function goCar() {
    console.log(1212)
    let start = Date.now();

    let timer = setInterval(function() {
        let timePassed = Date.now() - start;

        car.style.left = timePassed / 55 + '%';

        if (timePassed > 2000) {
            clearInterval(timer);
            car.style.left =0;
        }

    }, 20);
}