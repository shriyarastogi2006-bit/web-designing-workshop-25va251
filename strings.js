// sequence of character use to represent text
let str="shriya";
let str2='mclaren';
console.log(str2[3]);  // index number is printed for example 3=a
// template literal
let specialstring=`this is template literal ${1+2+3}`;
console.log(specialstring);
let obj={
    item:"pen",
    price:20,
};
let output=`the cost of ${obj.item} is ${obj.price} rupees `;// string interpolation
console.log(output);
console.log("the cost of", obj.item, "is",obj.price,"rupees");

//escape character \n next line , \t tab space
// they are counted as 1
console.log("oscar\npiastri");
console.log("lando\tnorris");
let str4="shriya\trastogi";
console.log(str4.length);
let str5="kimi antonelli";
console.log(str5.toUpperCase()); 
// koi bhi method original string ko change nhi krta humesha new string create krta hai

// let str6="charles leclerc";
// let newstr=str6.toUpperCase();
// console.log(str6) ;
// console.log(newstr);

let str6="charles leclerc";
str6=str6.toUpperCase();
console.log(str6) ; //js strings are immutable
// toLowerCase
// trim method
let str7="  carlos sainz  jr  ";
console.log(str7.trim());

//str.slice , ending value noninclusive (include nhi krega)
//str.slice(start , end?)
let str8="ollie";
console.log(str8.slice(2,5)); // ending wala is optional

// concatenation strings ko join krta hai 
let str9="louis";
let str10="patridge";
// let res=str9.concat(str10);
// console.log(res);
let res= "i am learning string \t"+str9+str10;
console.log(res);
// console.log(str9.concat(str10));

// replace method
let str11="hello";
console.log(str11.replace("lo","p"));
let str12="hellololo";
console.log(str12.replaceAll("lo","p"));

//charAt
let str13="newyork";
str13=str13.replace("w","m");
console.log(str13);
console.log(str13.charAt(2));

//ques

let fullName=prompt("Give your fullname:");
console.log(fullName);
let username="@"+fullName+fullName.length;
console.log(username);







