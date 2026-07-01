// let age=25;
// if(age>=18){
//     console.log("you can vote");
// }
// age=12;
// if(age<18){
//     console.log("you cannot vote");
// }
// let mode="dark";
// let color;
// if(mode==="dark"){
// color="black";
// }
// if(mode==="light"){
//     color="white";
// }
// console.log(color);
//if wali cond true hogai toh if wala case run krega agr if waali cond false hogai toh else wala case run krega
// if(mode==="dark"){
//     color="black";
// }
// else{
//     color="light";
// }
// console.log(color);
let num=10;
if(num%2===0){
    console.log(num,"number is even");
}
else{
    console.log(num,"number is odd");
}
let mode="blue";
let color;
if(mode==="light"){
   color="white";
}
else if(mode==="pink"){
    color="pink";
}
else if(mode==="red"){
    color="red";
}
else{
    color="black"
}
console.log(color);
let age=25;
age=15;
let result = age>18 ? "adult": "not adult";
console.log(result);
// age>18 ? console.log("adult"): console.log("not adult");
alert("yes");
// let name=prompt("hello")
// console.log(name);
// let number=prompt("Enter a number:");
// console.log(num);
// if(number%5===0){
//     console.log(number,"number is multiple of 5");
// }
// else{
//     console.log(number,"not a multiple of 5");
// }
// let score=89;
let score=prompt("score");
let grade;
if(score>=90 && score<=100){
          grade="A";
}
else if(score>=70 && score<=89){
    grade="B";
}
else if(score>=60 && score<=69){
    grade="C";
}
else if(score>=50 && score<=59){
    grade="D";
}
else if(score>=0 && score<=49){
    grade="F";
}
console.log("your grade is =", grade);