const form = document.querySelector("form");
const button = document.querySelector(".button");
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
let button3 = document.querySelector(".button3");
let adress = document.getElementById("adress");
let data=document.querySelector(".data");
let body = document.getElementById("body");
const buttonOffice = document.querySelector(".buttonOffice");
let info=0, info1=0,text;
let defoultOffice = "ул Рыбаков, д. 3/1"
let office =localStorage.getItem('myOffice');

addOffice(defoultOffice);
//Если офисс не задан
function addOffice(address){
    if (office===null){office=address}
}
//регулировка яркости
function  sizePic(){
    let bright = document.getElementById("bright").value;
    body.style.cssText=" background-color: RGB(" + (255-(bright*2.2)) + "," + (255-(bright*2.2)) + "," + (255-(bright*2.2)) + ");"+"filter: brightness("+(100-bright)+"%);"
}

// копируем адресса
button.addEventListener("click", () => {
    navigator.clipboard.writeText(info)
})

// копируем номера заявок
button1.addEventListener("click", () => {
    navigator.clipboard.writeText(info1)
})

// копируем дату
data.addEventListener("click", () => {
    navigator.clipboard.writeText(data.innerText)
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
    let km1=splitkm[0].split("Протяженность маршрута: ")
    navigator.clipboard.writeText(km1[1])

})

//Кнопка изменить офис
buttonOffice.addEventListener("click", () => {
    let buf=office;
    localStorage.removeItem('myOffice');
    office =  prompt("Адрес офиса", office);
    addOffice(buf);
    console.log(office)
    localStorage.setItem('myOffice', office);
})

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
    data.removeAttribute('disabled');
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
        //получаем дату
        const data = item.real_timeslot.split(" ")

        return {
            adress: adress[0],
            id: item.work_data.id,
            data:data[0,0]
        }
    })
    //обрабатываем данные даты
    let data=b.map(intem => intem.data)
    data=data[0].split("-");
    data[0]=data[0].split("\"");
    data[0]=data[0][1];
    data=data.reverse();
    data= data.join(".");
    document.querySelector(".data").innerHTML = data;

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
         console.log(2)
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
function dark(){
    body.style.cssText="filter: brightness("+29+"%);"
   //body.style.cssText=" background-color: RGB(50,50,50);";

   // document.body.classList.add('dark');
}