const books=[
{
title:"1984",
author:"George Orwell",
year:1949,
status:"available",
img:"1984.jpg"
},
{
title:"The Hobbit",
author:"J.R.R. Tolkien",
year:1937,
status:"checked-out",
img:"hobbit.jpg"
},
{
title:"Pride and Prejudice",
author:"Jane Austen",
year:1813,
status:"available",
img:"pride.jpg"
},
{
title:"The Catcher in the Rye",
author:"J.D. Salinger",
year:1951,
status:"available",
img:"rye.jpg"
},
{
title: "To Kill a Mockingbird",
author: "Harper Lee",
year: 1960, 
status:"available",
img:"mockingbird.jpg"
},
{
title:"Tuesdays with Morrie",
author:"Mitch Albom",
year:1997,
status:"available",
img:"morrie.jpg"
},
];

const loans=[
{title:"1984",due:"Apr 15"}
];

const overdue=[
{title:"The Catcher in the Rye",due:"Mar 10"}
];

const members=["Angela","Ayiha","Sophia","Diana","Anton","Andrie"];

function displayBooks(list){
const c=document.getElementById("booksContainer");
if(!c)return;

c.innerHTML="";

list.forEach(b=>{
c.innerHTML+=`
<div class="book" onclick="openModal('${b.title}','${b.author}','${b.year}','${b.img}')">
<img src="${b.img}" class="book-img">
<h3>${b.title}</h3>
<p>${b.author}</p>
</div>
`;
});
}

function performSearch(){
const input=document.getElementById("searchInput");
if(!input)return;

const q=input.value.toLowerCase();
displayBooks(books.filter(b=>b.title.toLowerCase().includes(q)));
}

function filterBooks(status){
if(status==="all") displayBooks(books);
else displayBooks(books.filter(b=>b.status===status));
}

function displayLoans(){
const el=document.getElementById("userLoans");
if(!el)return;
el.innerHTML=loans.map(l=>`<li>${l.title} - ${l.due}</li>`).join("");
}

function displayOverdue(){
const el=document.getElementById("overdueItems");
if(!el)return;
el.innerHTML=overdue.map(o=>`<li>${o.title} - ${o.due}</li>`).join("");
}

function displayMembers(){
const el=document.getElementById("membersOnline");
if(!el)return;
el.innerHTML=members.map(m=>`<li>${m}</li>`).join("");
}

function openModal(t,a,y,img){
const modal=document.getElementById("modal");
if(!modal)return;

modal.style.display="block";
document.getElementById("modalTitle").innerText=t;
document.getElementById("modalAuthor").innerText=a;
document.getElementById("modalYear").innerText=y;
document.getElementById("modalImg").src=img;
}

function closeModal(){
const modal=document.getElementById("modal");
if(modal) modal.style.display="none";
}

window.onclick=function(e){
const modal=document.getElementById("modal");
if(e.target===modal){
modal.style.display="none";
}
}

function init(){
displayBooks(books);
displayLoans();
displayOverdue();
displayMembers();

if(document.getElementById("totalBooks"))
document.getElementById("totalBooks").innerText=books.length;

if(document.getElementById("totalLoans"))
document.getElementById("totalLoans").innerText=loans.length;

if(document.getElementById("totalOverdue"))
document.getElementById("totalOverdue").innerText=overdue.length;
}

init();