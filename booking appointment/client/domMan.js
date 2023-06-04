function myFunc(event){
    event.preventDefault();
    let details={
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        phone:document.getElementById('phone').value,
        date:document.getElementById('date').value,
    };
    // let myDetails=JSON.stringify(details);
    // localStorage.setItem(details.name,myDetails);   
    axios.post("http://localhost:3000/postdata",(details))
        .then((response)=>{
            console.log("dom res sent:"+response)
        }).catch((err)=>{
            console.log(err)
        })
        document.getElementById('name').value=null;
        document.getElementById('email').value=null;
        document.getElementById('phone').value=null;
        document.getElementById('date').value=null;
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:3000/getdata").then((response)=>{
        console.log(response);
        for(var i=0;i<response.data.length;i++){
            showDeleteEdit(response.data[i])
        }
    }).catch((err)=>{
        console.log(err)
    })
})

function showDeleteEdit(details){
    let user=document.getElementById('users');
    //creating user list
    let userList=document.createElement('li');
    userList.textContent="Name:"+details.name+" Email:"+details.email+"  phone_Number:"+details.phone+"   date"+details.date+" id:"+details.id;

    //add delete button
    let deleteButton=document.createElement('input');
    deleteButton.type='button';
    deleteButton.value='delete';
    deleteButton.onclick=()=>{
        let element=axios.delete(`http://localhost:3000/deletedata/${details.id}`)
        axios.delete(element)
        localStorage.removeItem(details.name);
        user.removeChild(userList);
    }

    let editButton=document.createElement('input');
    editButton.type='button';
    editButton.value='Edit';
    // editButton.onclick=()=>{
    //     document.getElementById('name').value=details.name;
    //     document.getElementById('email').value=details.email;
    //     document.getElementById('phone').value=details.phone;
    //     document.getElementById('date').value=details.date;
    //     let element="https://crudcrud.com/api/285459dc10634c16bf113e5f566032db/appointmentdata/"+details._id
    //     axios.delete(element)
    //     localStorage.removeItem(details.name);
    //     user.removeChild(userList);
    // }


    userList.appendChild(deleteButton);
    //userList.appendChild(editButton);
    user.appendChild(userList);
}