
window.addEventListener('DOMContentLoaded', async () => {
    try {
      const result = await axios.get('http://localhost:3000/getdata');
      console.log(result.data);
  
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].item === "food") {
          showFood(result.data[i])
        } else if(result.data[i].item === "electronics") {
          showelectronics(result.data[i]);
        }else{
            showcloth(result.data[i]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  });



async function myFunc(event){
    //event.preventDefault();
    let detail={
        name:document.getElementById('name').value,
        price:document.getElementById('price').value,
        item:document.getElementById('item').value
    };
    console.log(detail.name+detail.price+detail.item);
    axios.post('http://localhost:3000/postdata', detail).then(res=>{
            console.log("post data")
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })

        document.getElementById('name').value=null;
        document.getElementById('price').value=null;
        document.getElementById('item').value=null;
}

async function showFood(detail){
    const food=document.getElementById('food');
    let list=document.createElement('li')
    list.textContent=`name of the item${detail.name} price:${detail.price} ${detail.id}`;

    
    //add delete button
    let deleteButton=document.createElement('input');
    deleteButton.type='button';
    deleteButton.value='delete';
    deleteButton.onclick=()=>{
        let element=axios.delete(`http://localhost:3000/deletedata/${detail.id}`)
        food.removeChild(list);
    }

    list.appendChild(deleteButton);
    food.appendChild(list);
}

async function showelectronics(detail){
    const electronics=document.getElementById('electronics');
    let list=document.createElement('li')
    list.textContent=`name of the item${detail.name} price:${detail.price}`;

    
    //add delete button
    let deleteButton=document.createElement('input');
    deleteButton.type='button';
    deleteButton.value='delete';
    deleteButton.onclick=()=>{
        let element=axios.delete(`http://localhost:3000/deletedata/${detail.id}`)
        electronics.removeChild(list)
    }

    list.appendChild(deleteButton);
    electronics.appendChild(list);
}

async function showcloth(detail){
    const cloth=document.getElementById('cloth');
    let list=document.createElement('li')
    list.textContent=`name of the item${detail.name} price:${detail.price}`;

    
    //add delete button
    let deleteButton=document.createElement('input');
    deleteButton.type='button';
    deleteButton.value='delete';
    deleteButton.onclick=()=>{
        let element=axios.delete(`http://localhost:3000/deletedata/${detail.id}`);
        cloth.removeChild(list);
    }

    list.appendChild(deleteButton);
    cloth.appendChild(list);
}