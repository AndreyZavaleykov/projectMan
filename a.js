const form=document.querySelector("form");
const button=document.querySelector(".button");
const button1=document.querySelector(".button1");
let info="",info1;
form.addEventListener("submit",(b)=>{
    b.preventDefault();
    let a= b.target[0].value;
    out(a);
  //  console.log(a,Event)
})
function out(a) {

   const abc=JSON.parse(a)
 //   console.log(abc)
    const b = abc[0].timeslots.filter(item=>item.start!=="00:00").map(item => {
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
    c.unshift("ул Рыбаков, д. 3")
    document.querySelector(".span").innerHTML=c.join(' - ') + " - ул Рыбаков, д. 3";
    info=c.join(' - ') + " - ул Рыбаков, д. 3";
 //   navigator.clipboard.writeText("hello").catch(e=>console.log(e))
    document.querySelector(".span1").innerHTML="#" + d.join('; #') + ";"
    info1="#" + d.join('; #') + ";";
   // document.querySelector(".span2").innerHTML="\"Севастополь, "+c.join('\" , "Севастополь, ') + " \", \"Севастополь, ул Рыбаков, д. 3\"";
    init ("Севастополь, "+c.join(' ,"Севастополь, ') + " ,Севастополь, ул Рыбаков, д. 3\"");
}
button.addEventListener("click",()=>{
    console.log("haloe")
navigator.clipboard.writeText(info)
})
button1.addEventListener("click",()=>{
    console.log("haloe")
    navigator.clipboard.writeText(info1)
})

