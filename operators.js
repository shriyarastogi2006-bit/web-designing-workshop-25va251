//arithemtic operators
let a=12;
let b=2;
console.log("a=", a , "& b=", b);
console.log("a+b=",a+b);
console.log("a-b=",a-b);
console.log("a%b=",a%b);
console.log("a**b=",a**b);
console.log("a/b=",a/b);

// unary operators
let c=3; //value right se left propogates hoti hai
c++;
console.log("c=",c);
let d=4;
console.log("d++=",d++);
console.log("d=",d);
console.log("++d",++d);
console.log("d=",d);

let e=5;
e+=3; // e=e+3
console.log("e=",e);
e-=3; // e=e-3
console.log("e=",e);
e/=3; // e=e/3
console.log("e=",e);
e%=3; // e=e%3
console.log("e=",e);
// comparison operators
//returns boolean value either true or false
let f=2;
let g=3;
console.log("2==3",f==g);
console.log("2!=3",f!=g);
console.log("2<3",f<g);
console.log("2>3",f>g);
console.log("2<=3",f<=g);
console.log("2>=3",f>=g);
let k=1;
let l="2";
console.log("1===2",k===l);
console.log("1!==2",k!==l)

//logical operators
let q=3;
let w=4;
let cond1=q>w;
let cond2=q==w;
console.log("cond1 && cond2 =",cond1 && cond2);
console.log("cond1 || cond2=", q<w || q==w);
console.log("!(q<w)=", !(q<w));
