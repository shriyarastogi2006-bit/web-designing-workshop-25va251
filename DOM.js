console.log("hello");
// window.console.log("newyork");
// console.dir=object ko print karane k liye
// dom=html ko js k andar access krna ka tareeka hai
console.dir(document.body);
console.log(document.body);
console.log(document.head);

// dom manipulation
let headers=document.getElementById("headers");
console.log(headers);
let headings=document.getElementsByClassName("heading");
console.log(headings);
// let para=document.getElementsByTagName("p")
// console.log(para);
let firstel=document.querySelector("p");
console.log(firstel);
let allel=document.querySelectorAll("p"); // multiple access
console.log(allel);
let el=document.querySelector(".heading");
console.log(el);
let allel2=document.querySelectorAll(".heading"); // multiple access
console.log(allel2);
let div=document.querySelector("div");
console.dir(div);
let h2=document.querySelector("h2");
console.dir(h2.innerText);
h2.innerText= h2.innerText + "\tlearn it";
console.dir(h2.innerText);
let divs=document.querySelectorAll(".box");
console.log(divs);