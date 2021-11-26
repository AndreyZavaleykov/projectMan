const form = document.querySelector("form");
const button = document.querySelector(".button");
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
let button3 = document.querySelector(".button3");
let adress = document.getElementById("adress");
const buttonOffice = document.querySelector(".buttonOffice");
let info=0, info1=0, office = "ул Рыбаков, д. 3/1";
let text;

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
   setTimeout( () => {goCar();}, 1600);
    button3.removeAttribute('disabled');
    button3.style.cssText="color: #4B0082; background: #FFC618;";
    button.removeAttribute('disabled');
    button.style.cssText="color: #4B0082; background: #FFC618;";
})

// Копируем километраж
button3.addEventListener("click", () => {
    let km=document.querySelector(".km").innerText;
    let splitkm=km.split("км")
    let km1=splitkm[0].split("Протяженность маршрута:")
    navigator.clipboard.writeText(km1[1])

})

//Кнопка изменить офис
buttonOffice.addEventListener("click", () => {
    office =  prompt("Адрес офиса", office); })

//Кнопка Отправить
form.addEventListener("submit", (b) => {
    delMap();
    b.preventDefault();
    let a = b.target[0].value;
    out(a);
    button.removeAttribute('disabled');
    button.style.cssText="color: #4B0082; background: #FFC618;";
    button1.removeAttribute('disabled');
    button1.style.cssText="color: #4B0082; background: #FFC618;";
    button3.removeAttribute('disabled');
    button3.style.cssText="color: #4B0082; background: #FFC618;";
    buttonOffice.removeAttribute('disabled');
    buttonOffice.style.cssText="color: #4B0082; background: #FFC618;";
    adress.onclick = "null;"
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
    const b = abc[0].timeslots.filter(item => item.start !== "00:00").filter(item => item.start !== "21:00").map(item => {
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
    // document.querySelector(".span1").innerHTML = "#" + d.join('; #') + ";"
    info1 = "#" + d.join('; #') + ";";

    //отправка данных в функцию построения маршрута на карте
    init("Севастополь, " + c.join(' , Севастополь, ') + " , Севастополь, "+office);

    //запуск печатной машинки
    setTimeout(() => {
    textPrint(info1);
    go();
    goCar();},1600);
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

//Анимация машинки
function goCar() {
    let start = Date.now();
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        let right=0;
        switch (true) {
            case (timePassed < 2000):
                car.style.left = timePassed / 55 + '%';
                right = timePassed / 55;
                break;
            case (2000<timePassed <2500 ):
                car2.style.transform = "scale(-1, 1)";
                car.style.left =73+ right - (timePassed/ 55 - right) + '%';
                break;
        }
        if (4000 < timePassed ){
            car2.style.transform = "scale(1, 1)";
            car.style.left = 0;
            clearInterval(timer);
        }
    }, 5);
}
