const form = document.querySelector("form");
const button = document.querySelector(".button");
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");
const buttonOffice = document.querySelector(".buttonOffice");
let info, info1, office = "ул Рыбаков, д. 3";

form.addEventListener("submit", (b) => {
    b.preventDefault();
    let a = b.target[0].value;
    delMap()

    out(a);
    // console.log(viewContainer)

    //  console.log(a,Event)
})


function out(a) {

    const abc = JSON.parse(a)
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
    document.querySelector(".span").innerHTML = c.join(' - ') + " - "+office;
    info = c.join(' - ') + " - " + office;

    //Красивое оформление номеров заявок
    document.querySelector(".span1").innerHTML = "#" + d.join('; #') + ";"
    info1 = "#" + d.join('; #') + ";";

    //отправка данных в функцию построения маршрута на карте
    init("Севастополь, " + c.join(' ,"Севастополь, ') + " ,Севастополь, \""+office);
}

//функция удаления карты при перестроении маршрута
function delMap(){
    if(info && info1) {
        //удаляем карту
        myMap.destroy()
        //удаляем подпись
        var node = document.getElementById('viewContainer');
        while (node.hasChildNodes()) {
            node.removeChild(node.firstChild);
        }}
}

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
    let g=document.querySelector(".span").innerText;
    console.log(g)
    delMap();
    let b = g.split(' -')
    init(b.join(' ,Севастополь, '));
    info = b;

})

// Копируем километраж
button3.addEventListener("click", () => {
    let km=document.querySelector(".km").innerText;
    let splitkm=km.split("км")
    let km1=splitkm[0].split("Протяженность маршрута: ")
    console.log(km1[1])
    navigator.clipboard.writeText(km1[1])

})
buttonOffice.addEventListener("click", () => {
    office = prompt("Введите ардес офиса, пример: ул Рыбаков, д. 3");
})

