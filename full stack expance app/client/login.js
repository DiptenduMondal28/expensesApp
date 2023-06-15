async function myForm(event){
    try{
        let email=document.getElementById('email');
        let password=document.getElementById('password');
        const detail={
            email:email,
            password:password
        }
        const dataDEtail=axios.post('http://localhost:3000/login',detail)
        console.log(dataDEtail)
        if(dataDEtail.request.status === 201){
            console.log(dataDEtail.data.message)
            document.body.innerHTML+=`<div style="color:green;">${dataDEtail.data.message}</div>`
        }else if(dataDEtail.request.status === 404){
            throw new Error('fill form properly')
        }
    }catch(err){
        console.log(err)
    }
}