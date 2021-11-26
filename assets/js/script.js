moment().format();
let day = moment().format('MMM DD, YYYY');
console.log(moment().format('LT'));

let date = document.getElementById('currentDay');
date.innerHTML = day

document.getElementById('9am').style.color = "lightblue";
document.getElementsById('9am').style.color = "lightblue";

// const saveBtn = document.getElementById("saveBtn");
// saveBtn.addEventListener("onClick", {
// });
// localStorage.setItem(hour);

// myStorage = window.localStorage;


