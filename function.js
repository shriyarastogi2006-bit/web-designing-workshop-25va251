//block of code that perform specific task can be invoked whenever needed
function myFunction() {
    console.log("welcome to london");
    console.log("greetings");
}

myFunction();
function yourFunction(msg){  //parameter-input or arguments
   // local variables =  scope - they are only defined under curly braces (also known as function block)
   console.log(msg);
}
yourFunction("lets go");

function sum(a,b){
   // console.log(a+b);
   
   s=a+b;
   return s;
}
let vale=sum(1,2);
console.log(vale);

// arrow function modern JS 
function add(a,b){
   return a+b;
}
const arrowsum= (a,b)=>{
   console.log(a+b);
};

function mul(x,y){
   console.log(x*y);
};
const arrowmul=(x,y)=>{
   console.log(x*y);
};
const print= () =>{
   console.log("hello")
};

// for each
//used for arrays or strings
/*arr.forEach((val)=>{
   console.log(val)
})*/
let arr=["newyork","seattle","london","paris"]
arr.forEach((val,idx,arr)=>{
   console.log(val.toUpperCase(),idx,arr)
})
let numarr=[19,33,4,5]
numarr.forEach((val)=>{
   console.log(val*val);
});
let nums=[23,45,78];
let newArr=nums.map((val)=>{
   return val*val;
})
console.log(newArr);
let number=[2,4,5,6];
let arr2=number.filter((val)=>{
   return val%2==0;
   
});
console.log(arr2);
