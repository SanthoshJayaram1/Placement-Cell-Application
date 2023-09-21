// get two input references for DOM  manupulation
const companyID=document.getElementById("cName");
const date=document.getElementById("iDate");

document.addEventListener('DOMContentLoaded', function () {
    // Select all buttons with the class "btn"
    const addBtn = document.querySelectorAll('.btn');
    // Convert the NodeList to an array
    const buttonArray = Array.from(addBtn);
    // Now, iterate through 'buttonArray' and add the event click listener
    buttonArray.forEach((btn) => btn.addEventListener("click", automaticFill));
});

// to automatically fill inside input field
function automaticFill(){
    // it fetch data present in parent html
    const name=this.parentElement.children[0].children[0].children[0].innerHTML;
    const date=this.parentElement.children[1].children[1].children[0].innerHTML;
    const companyID=document.getElementById("cName");
    const iDate=document.getElementById("iDate");
    // and update inside input upon clcking
    companyID.value=name;
    iDate.value=date;
}