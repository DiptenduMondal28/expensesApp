// document.addEventListener('DOMContentLoaded',loadData)
// async function loadData(){

// }


let submit=document.getElementById('submit');
submit.addEventListener('click',addData());



async function addData(e){
    //e.preventDefault();
    console.log("add data fnc")
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let phone=document.getElementById('phone').value;
    let date=document.getElementById('date').value;
    let details={
        name:name,
        email:email,
        phone:phone,
        date:date
    }
    try{
        console.log("hiii")
        await axios.post('http://localhost:3000/postdata',(details))
    }catch(error){
        alert(error.message)
    }
}
