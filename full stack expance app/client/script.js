async function signup(e){
    //e.preventDefault();
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;

     console.log(`name: ${name} email:${email} password:${password}`);

    try{
     let data= {
        name:name,
        email:email,
        password:password
     }
     const detail=axios.post('http://localhost:3000/signup',data)
    }catch(err){
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`
    }
}