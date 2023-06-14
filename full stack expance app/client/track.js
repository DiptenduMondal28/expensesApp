window.addEventListener('DOMContentLoaded',()=>{
    let detail = axios.get('http://localhost:3000/getexpence').then((result)=>{
        console.log(result.data);
        // var total=0;
        totalexp(result)
        for(let i=0;i<result.data.length;i++){
            showDeleteEdit(result.data[i]);
            //total+=result.data[i].exp;
        }
        
    }).catch(err=>{
        console.log(err);
    })
    //totalexp(detail);
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
    if(mode===null){
        axios.post('http://localhost:3000/datapost',detail)
    }else{
        console.log("before put"+mode)
        let element = axios.put(`http://localhost:3000/saveeditdata/${mode}`,detail).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        console.log(element)
        mode=null;
    }
    
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
        let element = axios.delete(`http://localhost:3000/deletadata/${detail.id}`);
        axios.delete(element)
        expenceList.removeChild(expence);
    }

    //edit key
    let editKey=document.createElement('input');
    editKey.type='button';
    editKey.value='edit';
    editKey.onclick=async()=>{
        const editid=await axios.get(`http://localhost:3000/geteditdata/${detail.id}`).then(result=>{
            console.log(result);
            try{
                    document.getElementById('name').value=detail.name;
                    document.getElementById('expence').value=detail.exp;
                    mode=detail.id;
                    console.log(mode)
                }catch(err){
                    console.log(err);
                }
            }).catch(error=>{
            console.log(error);
        })
        
    }


    expence.appendChild(deleteKey);
    expence.appendChild(editKey);
    expenceList.appendChild(expence);

    //editKey.addEventListener('click',updateuser)

}

function totalexp(total){
    let totalexp=document.getElementById('total');
    // totalexp.textContent="total expendeture:"+total;
    var totalexpenditure=0;

    for(let i=0;i<total.data.length;i++){
        totalexpenditure+=total.data[i].exp;
    }

    totalexp.textContent="total expendeture:"+totalexpenditure;
}

