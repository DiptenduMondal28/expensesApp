window.addEventListener('DOMContentLoaded',async()=>{
    const token = localStorage.getItem('token')
    let detail =await axios.get('http://localhost:3000/getexpence',{headers:{'Authorization':token}}).then((result)=>{
        console.log(result.data);
        for(let i=0;i<result.data.length;i++){
            showDeleteEdit(result.data[i]);
        }
        
    }).catch(err=>{
        console.log(err);
    })
    

})



async function myfunc(event){
    //event.preventDefault();
    let detail={
        name:document.getElementById('name').value,
        exp:document.getElementById('expence').value,
        item:document.getElementById('item').value,
        category:document.getElementById('category').value
    }
    const token = localStorage.getItem('token')
    await axios.post('http://localhost:3000/datapost',detail,{headers:{'Authorization':token}})
    
    document.getElementById('name').value=null;
    document.getElementById('expence').value=null;
    document.getElementById('item').value=null;
    document.getElementById('category').value=null;
}



async function showDeleteEdit(detail){

    let expenceList=document.getElementById('expencelist');

    let expence=document.createElement('li');
    expence.textContent=`name: ${detail.name} expence: ${detail.exp} item: ${detail.item} under ${detail.category}`;

    let deleteKey=document.createElement('input');
    deleteKey.type='button';
    deleteKey.value='delete';
    deleteKey.onclick=()=>{
        const token = localStorage.getItem('token')
        let element = axios.delete(`http://localhost:3000/deletadata/${detail.id}`,{headers:{'Authorization':token}});
        axios.delete(element)
        expenceList.removeChild(expence);
    }
    expence.appendChild(deleteKey);
    expenceList.appendChild(expence);
}



window.addEventListener('DOMContentLoaded',()=>{
    const token=localStorage.getItem('token')
    let ispremium=axios.get('http://localhost:3000/ispremium',{headers:{'Authorization':token}}).then(result=>{
        console.log(result)
        if(result.data[0].ispremium===true){
            document.getElementById('rzp-button1').style.display='none';
            document.getElementById('ispremium').textContent='you are a premium user SEE LEADERBOARD:';
            premiumfeature(result);
        }
    })
    
})

document.getElementById('rzp-button1').onclick= async function (e){
    const token = localStorage.getItem('token');
    console.log(token)
    const response = await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{'Authorization':token}})
    console.log(response);
    var options={
        "key":response.data.key_id,
        "order_id": response.data.order.id,
        "handler":async function (response){
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{headers:{'Authorization':token}})

            alert('you are now a premium user')

        }
    };
    const rzp1=new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed',function(response){
        console.log(response);
        alert('something wrong')
    });
};

async function premiumfeature(result){

    const premium=document.getElementById('ispremium');
    const leaderboardButton=document.createElement('input');
    leaderboardButton.type='button';
    leaderboardButton.value='leadderboard';
    leaderboardButton.onclick=async()=>{
        const token=localStorage.getItem('token');
        const userleaderboardArray=await axios.get('http://localhost:3000/premium/leaderboard',{headers:{'Authorization':token}})
        console.log(userleaderboardArray);

        const leadderboardElement=document.getElementById('leaderboard')
        const leadderboardli=document.createElement('li')
        leadderboardElement.innerHTML+="<h2>leader board</h2>"
        userleaderboardArray.data.forEach(element => {
            leadderboardElement.innerHTML +=`<li>name:${element.name} expence:${element.totalexpence}</li>`
        });
    }
    premium.appendChild(leaderboardButton);

}