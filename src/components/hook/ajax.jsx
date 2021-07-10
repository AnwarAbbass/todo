import { useEffect,useState } from "react";
import axios from 'axios';
const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const useAjax = ()=>{

  const [list, setList ] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    axios({
      url:todoAPI,
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      data: item
    }).then(res => {
      console.log(res.data);
      setList([...list, res.data])})
  };

  const _toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      axios(url, {
        method: "put",
        mode: "cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        data: item,
      })
        .then((savedItem) => {
          console.log('39 ajax', savedItem.data);
          setList(
            list.map((listItem) =>
              listItem._id === item._id ? savedItem.data : listItem
            )
          );
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    
    axios({url:todoAPI, 
      method: 'get',
      mode: 'cors',
    })
      .then(data => setList(data.data.results))
      .catch(console.error);
  };
  
  const deleteItem = async(id) => {
    let url = `${todoAPI}/${id}`;
    await axios({url:url, 
      method: 'delete',
      mode: 'cors',
    })
  };

  const editItem = (item) => {
    let url = `${todoAPI}/${item._id}`;
    console.log('----------------',item);
    axios({url:url, 
      method: 'put',
      mode: 'cors',
      data: item,
    })
    .then((newItem) => {
      console.log('------------------ ajax 78',newItem.data);
      setList(
        list.map((listItem) =>
          listItem._id === item._id ? newItem.data : listItem
        ));
    }).catch(console.error);
  };

  useEffect(_getTodoItems, [setList]);

  return [_addItem, _toggleComplete, list, setList, deleteItem,editItem];
}

export default useAjax;