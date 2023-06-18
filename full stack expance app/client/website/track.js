window.addEventListener('DOMContentLoaded',()=>{
    const token = localStorage.getItem('token')
    let detail = axios.get('http://localhost:3000/getexpence',{headers:{'Authorization':token}}).then((result)=>{
        console.log(result.data);
        totalexp(result)
        for(let i=0;i<result.data.length;i++){
            showDeleteEdit(result.data[i]);
        }
        
    }).catch(err=>{
        console.log(err);
    })
})


let mode=null;

function myfunc(event){
    //event.preventDefault();
    let detail={
        name:document.getElementById('name').value,
        exp:document.getElementById('expence').value,
        item:document.getElementById('item').value,
        category:document.getElementById('category').value
    }
    console.log(mode)
    const token = localStorage.getItem('token')
        axios.post('http://localhost:3000/datapost',detail,{headers:{'Authorization':token}})
    
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

function totalexp(total){
    let totalexp=document.getElementById('total');
    var totalexpenditure=0;
    for(let i=0;i<total.data.length;i++){
        totalexpenditure+=total.data[i].exp;
    }
    totalexp.textContent="total expendeture:"+totalexpenditure;
}

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

