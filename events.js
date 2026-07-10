// let btn1=document.querySelector("#btn1");
// btn1.onclick=()=>{
//     console.log("btn was clicked");
//     let a=25;
//     a++;
//     console.log(a);
// };

// btn1.onclick=()=>{        
//     console.log("handler") this one will work
// }
// let div=document.querySelector("div");
// div.onmouseover=()=>{
//     console.log("you are inside div");
// };
// let btn1=document.querySelector("#btn1");
// btn1.onclick=(evt)=>{
//     console.log(evt);
//     console.log(evt.type);
//     console.log(evt.target);
//      console.log(evt.clientX,evt.clientY);
// }
// let btn1=document.querySelector("#btn1");

// btn1.addEventListener("click",() => {
//     console.log("button was clicked");
// });
// btn1.addEventListener("click",() => {
//     console.log("button was clicked -handler");
// });
// btn1.addEventListener("click",() => {
//     console.log("button was clicked -handler 2");
// });
// btn1.addEventListener("click",() => {
//     console.log("button was clicked -handler 3");
// });
// btn1.removeEventListener("click",() => {
//     console.log("button was clicked -handler 2");
// });
let modebtn=document.querySelector("#mode");
let body=document.querySelector("body");
let currmode="light";
modebtn.addEventListener("click",()=>{
    if(currmode=="light"){
        currmode="dark";
        body.classList.add("dark");
        body.classList.remove("light");
    }else
        {
        currmode="light";
        body.classList.add("light");
        body.classList.remove("dark");
    }
    console.log(currmode);
});
