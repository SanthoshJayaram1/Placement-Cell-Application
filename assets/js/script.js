
const companyID=document.getElementById("cName");
const date=document.getElementById("iDate");


document.addEventListener('DOMContentLoaded', function () {
    // Select all buttons with the class "specific-class"
    const addBtn = document.querySelectorAll('.btn');
    console.log(addBtn);
    // Convert the NodeList to an array
    const buttonArray = Array.from(addBtn);

    // Now, you can iterate through 'buttonArray' and perform operations as needed
    buttonArray.forEach((btn) => btn.addEventListener("click", automaticFill));
});

// to automatically fill inside input field
function automaticFill(){
    const name=this.parentElement.children[0].children[0].children[0].innerHTML;
    const date=this.parentElement.children[1].children[1].children[0].innerHTML;
    const companyID=document.getElementById("cName");
    const iDate=document.getElementById("iDate");
    companyID.value=name;
    iDate.value=date;
}