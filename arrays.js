// collection of items in js
// let marks=[12,34,56,89,90];
// console.log(marks);
// console.log(marks.length);
let driver=["charles","kimi","lando","oscar"];
console.log(driver);
// array khud object hai , its a type of object 
let avenger=["ironman","captain america","spiderman","scarlettwitch"];
for(let idx=0;idx<avenger.length;idx++){
    console.log(avenger[idx].toUpperCase());
}
let cities=["delhi","newyork","london"]
for(let el of cities){
    console.log(el.toUpperCase());
}
let marks=[85,97,44,37,76,60];
let sum=0;
for(let val of marks){
    sum=sum+val;
}
console.log(sum);
let average=sum/marks.length;
console.log("average marks of class",average);
// let items=[250,645,300,900,50];
// let idx=0;
// for(let val of items){
//     console.log(`value at ${idx}=${val}`);
//     idx++;
// }


// question

// let offer = val/10;
// items[idx]=items[idx]-offer;
// console.log(`value after offer =${items[idx]}`);
let items = [250, 645, 300, 900, 50];

// Move the logic inside the loop so 'val' and 'idx' are in scope
for (let i = 0; i < items.length; i++) {
    console.log(`value at ${i} = ${items[i]}`);
    
    let offer = items[i] / 10;
    items[i] -= offer;
    
    console.log(`value after offer = ${items[i]}`);
}

// push , pop, tostring
let food=["pasta","tacos","momos","porkbelly"];
console.log(food.push("chips"));
console.log(food);
let deletedfood=food.pop();
console.log(food);
console.log("delted food",deletedfood);
console.log(food);
console.log(food.toString());
let score=[12,34,56,78,90,];
console.log(score);
let mercedes=["george russell","kimi antonelli"];
mercedes.unshift("lewis hamilton");
let val=mercedes.shift();
console.log("deleted",val);
let mclaren=["lando norris","oscar piastri"];
let cars=mercedes.concat(mclaren);
console.log(cars);
let name=["louis","millie","ollie","kimi"];
console.log(name);
console.log(name.slice(1,3));

// question
let companies=["bloomberg","microsoft","uber","google","IBM","Netflix"];

let deletedcomp=companies.shift();
console.log("deleted",deletedcomp);
companies.splice(2,1,"ola");
console.log(companies.push("amazon"));
// unshift adds at start whereas push adds at last


