
// let id=div.getAttribute("id");
// console.log(id);
// let name=div.getAttribute("name");
// console.log(name);
// let para=document.querySelector("p");
// console.log(para.getAttribute("class"));
// let para=document.querySelector("p");
// console.log(para.setAttribute("class","newclass"));
// div.style.background="green";
// div.style.fontsize="3px";
// div.style.visibility="hidden";

// div.innerText="hello";
let el=document.createElement("button");
el.innerText="click me"
console.log(el);
let div=document.querySelector("div");
div.prepend(el);
//node.append=adds at the end of node(inside)
//node.prepend=adds at the start of node(inside)
//node.before=adds before the node(outside)
//node.after=adds after the node(outside)
let p=document.querySelector("p");
p.after(el);
// node.remove=delete an element
//class list