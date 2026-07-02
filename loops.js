// execute code again and again (repeat anything)
// for(let i=1;i<=5;i++){
//     console.log("london");
// }
// console.log("loop has ended");
let sum=0;
for(let i=1;i<=5;i++){
    sum=sum+i;
}
console.log("sum=",sum);
for(let i=1;i<=5;i++){
    console.log("i=",i);
}
let j=1;
while(j<=10){
    console.log("j=",j);
    j++;
}
let k=1;
do{
    console.log("k",k);
    k++;
}while(k<=5);
// for of loop
let str="javascript";
let size=0;
for(let i of str){
    console.log("i=",i);
    size++;
}
console.log("string size=",size);

//for -in loop
let student={
    name:"shriya rastogi",
    age:19,
    sgpa:9.6,
    ispass:true,
};
for(let key in student){
    console.log("key=",key , "value=",  student[key]);
}
 // practice question
 
 for(let i=0;i<=100;i++){
    if(i%2==0){
       console.log("i=",i);   // for odd number i%2!=0
    }
}

//practice question 2
/*create a game where you start with any random game number 
ask user to keep guessing the game number until the user enter correct value */
let gamenum=25;
let usernum=prompt("guess the number");
while(usernum!=gamenum){
    usernum=prompt("you entered the wrong number , guess again:");
}
console.log("Congratulations, you entered the right number");