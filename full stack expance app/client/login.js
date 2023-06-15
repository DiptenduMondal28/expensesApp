

async function login(event){
    event.preventDefault();
    try{
        let email=document.getElementById('email').value;
        let password=document.getElementById('password').value;
        const detail={
            email:email,
            password:password
        }
        console.log("email"+email+"pass"+password)
        await axios.post('http://localhost:3000/login',detail).then(response=>{
            if(response.status===200){
                alert(response.data.message)
            }else{
                throw new Error(response.data.message)
            }
        }).catch(err=>{
            console.log("json string fy")
            console.log(JSON.stringify(err))
            //document.body.innerHTML+=`<div style="color:red;">line 19${err}</div>`
            alert(err)
        })
        
    }catch(err){
        console.log(err)
        document.body.innerHTML+=`<div style="color:red;">line 24${err}</div>`
    }
}