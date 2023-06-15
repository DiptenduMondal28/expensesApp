
window.addEventListener('DOMContentLoaded', async () => {
    try {
      const result = await axios.get('http://localhost:3000/getdata');
      console.log(result.data);
  
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].done === "false") {
          showForNotDone(result.data[i]);
        } else {
          showForDone(result.data[i]);
          console.log(result.data[i])
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
  
  async function myFunc(e) {
    //e.preventDefault();
    const detail = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      done: 'false'
    };
  
    console.log(detail);
  
    try {
      const res = await axios.post('http://localhost:3000/postdata', detail);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function showForNotDone(detail) {
    const notDone = document.getElementById('notdone');
    const list = document.createElement('li');
    list.textContent = `name: ${detail.name} description: ${detail.description}`;
  
    const editKey = document.createElement('input');
    editKey.type = 'button';
    editKey.value = 'done';
  
    editKey.onclick = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/getOne/${detail.id}`);
        console.log(res);
        done(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    list.appendChild(editKey);
    notDone.appendChild(list);
  }
  
  async function showForDone(detail) {
    const done = document.getElementById('done');
    const list = document.createElement('li');
    list.textContent = `name: ${detail.name} description: ${detail.description}`;
    done.appendChild(list)
  }
  
  async function done(detail) {
    const newDetail = {
      name: detail.name,
      description: detail.description,
      done: 'true'
    };
  
    try {
      const res = await axios.put(`http://localhost:3000/putOne/${detail.id}`, newDetail);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  