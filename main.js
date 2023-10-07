'use strict'

//TRAER ELEMENTOS DEL HTML
const btnSave = document.querySelector('.js-savedata'); //botón guardar datos
const btnRecover = document.querySelector('.js-recoverdata'); //botón recuperar datos
const list = document.querySelector('.js-list'); //lista

//ARRAY VACIO DATOS USUARIO
let listUser = []; //lista de los 10 usuarios aleatorios

const userLS = JSON.parse(localStorage.getItem('saveUser'));

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

//PINTA ESTRUCTURA 1 USUARIO
function renderUser(user){
    let html="";
    html+=`<li id=" ${user.id.value}" class="list-user js-list-user noFriend">
        <img class="img" src=" ${user.picture.large}"/>
        <h3 class="name"> ${user.name.first}</h3>
        <p class="city"> ${user.location.city}</p>
        <p class="username"> ${user.login.username}</p>
        
    </li>`;
    
     return html;

    
}
// BUCLE DE LOS 10 USUARIOS
function renderList(listUser){
list.innerHTML="";
for (const item of listUser) {
    list.innerHTML+= renderUser(item);
}
addEventToUser();

}
//FUNCION PARA DECIR SI ES MI AMIGO
function handleClickFriends(event){
    const idUserCliked = parseInt (event.currentTarget.id);
    console.log (event.currentTarget.id);
    const indexUser = listUser.findIndex(item => item.id.value === idUserCliked);
    if (indexUser === -1){
        event.currentTarget.classList.add ("friends"); 
        event.currentTarget.classList.remove ("noFriend");
    }
    console.log(listUser);
    }
    

function addEventToUser(){
    const allUser = document.querySelectorAll(".js-list-user");
    //añadir la funcion a cada una de los usuarios a los que haga click
    for (const item of allUser) {
        item.addEventListener('click', handleClickFriends);
    }
    }

    //usuarios guardados
function handleClickSave (event){
    event.preventDefault();
    localStorage.setItem('saveUser', JSON.stringify(listUser));
}
//usuarios recuperados
function handleClickData(event){
    event.preventDefault();
    listUser = userLS;
    renderList (listUser);
}

//eventos botones
btnSave.addEventListener('click', handleClickSave);
btnRecover.addEventListener('click', handleClickData);