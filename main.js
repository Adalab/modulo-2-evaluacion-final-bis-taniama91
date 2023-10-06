'use strict'

//TRAER ELEMENTOS DEL HTML
const btnSave = document.querySelector('.js-savedata'); //botón guardar datos
const btnData = document.querySelector('.js-recoverdata'); //botón recuperar datos
const list = document.querySelector('.js-list'); //lista

//ARRAY VACIO DATOS USUARIO
let listUser = []; //lista de los 10 usuarios aleatorios


//PEDIR INFO A LA API
function getApiInfo () {
    //URL API con usuarios aleatorios
    const url =`https://randomuser.me/api/?results=10`
    fetch(url)
    .then((response) => response.json())
    .then((dataApi) => { 
        //pintar un listado
        listUser = dataApi.results;   
        renderList (listUser);
    });
    
}
getApiInfo();

//PINTA ESTRUCTURA USUARIOS
function renderUser(user){
    let html="";
    html+=`<li id="${user.id.value}" class="list-user js-list-user">
        <h3 class="">${user.name.first}</h3>
        <img class="img" src="${user.picture.large}"/>
        <p>${user.location.city}</p>
        <p>${user.login.username}</p>
    </li>`;
    
     return html;

    
}
function renderList(listUser){
list.innerHTML="";
for (const item of listUser) {
    list.innerHTML+= renderUser(item);
}
addEventToUser();

}

function handleClickFriends(event){
    const idUserCliked = parseInt (event.currentTarget.id);
    console.log (event.currentTarget.id);
    const foundUser = listUser.find(item => item.id.value === idUserCliked);
    const indexUser = listUser.findIndex(item => item.id.value === idUserCliked);
    if (indexUser === -1){
        event.currentTarget.classList.add ("friends"); 
        event.currentTarget.isFriends = true;
    }
    console.log(event.currentTarget.isFriends)
    console.log(listUser);
    }
    

function addEventToUser(){
    const allUser = document.querySelectorAll(".js-list-user");
    //añadir la funcion a cada una de las series a las que haga click
    for (const item of allUser) {
        item.addEventListener('click', handleClickFriends);
    }
    }
    

