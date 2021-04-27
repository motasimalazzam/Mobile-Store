'use strict';

//random number function

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


let phonesArray = [];

// create main object

function Phone(name, type) {
    this.userName = name;
    this.phoneType = type;
    this.price = getRndInteger(100, 500);
    phonesArray.push(this);
    settingItems();
}

//save in localstorage

function settingItems() {
    let stringPhone = JSON.stringify(phonesArray);
    localStorage.setItem('phones', stringPhone);
}

//creat table

let container = document.getElementById('container');
let table = document.createElement('table');
container.appendChild(table);

let firstRow = document.createElement('tr');
table.appendChild(firstRow);

let titles = ['User', 'Type', 'Price', 'Condition'];

for (let i = 0; i < titles.length; i++) {
    let titlsRow = document.createElement('th');
    firstRow.appendChild(titlsRow);
    titlsRow.textContent = titles[i];
}

//creat render

Phone.prototype.render = function () {
    let eachRow = document.createElement('tr');
    table.appendChild(eachRow);

    let userCell = document.createElement('td');
    eachRow.appendChild(userCell);
    userCell.textContent = this.userName;

    let typeCell = document.createElement('td');
    eachRow.appendChild(typeCell);
    typeCell.textContent = this.phoneType;

    let PriceCell = document.createElement('td');
    eachRow.appendChild(PriceCell);
    PriceCell.textContent = this.price;

    let conditionCell = document.createElement('td');
    eachRow.appendChild(conditionCell);
    if (this.price < 200) {
        conditionCell.textContent = 'Used';
    } else {
        conditionCell.textContent = 'New';
    }
};

//add event

let form = document.getElementById('form');
form.addEventListener('submit', submitter);

function submitter(event) {
    event.preventDefault();
    let name = event.target.userName.value;
    let type = event.target.typeField.value;
    let newPhone = new Phone(name, type);
    newPhone.render();
}


//get boject from localstorage

function gettingItems() {
    let data = localStorage.getItem('phones');
    let parsPhone = JSON.parse(data);

    if (parsPhone) {
        for (let i = 0; i < parsPhone.length; i++) {
            new Phone(parsPhone[i].userName, parsPhone[i].phoneType);
        }
    }
}
gettingItems();

for (let i = 0; i < phonesArray.length; i++) {
    phonesArray[i].render();
}