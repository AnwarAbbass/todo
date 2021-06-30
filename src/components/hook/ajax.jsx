import { useEffect,useState } from "react";

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const useAjax = ()=>{

  const [list, setList ] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.json())
      .then(data => setList(data.results))
      .catch(console.error);
  };

  const deleteItem = (id) => {
    console.log('tttttttttt');
    fetch(todoAPI+`/${id}`, {
      method: 'delete',
      mode: 'cors',
    })
      .then(data => data.json())
      .catch(console.error);
  };

  const editItem = (item) => {
    fetch(todoAPI+`/${item._id}`, {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify(item),
    })
    .then((res) => res.json())
    .then((newItem) => {
      setList(
        list.map((listItem) =>
          listItem._id === item._id ? newItem : listItem
        ));
    }).catch(console.error);
  };

  useEffect(_getTodoItems, [setList]);

  return [_addItem, _toggleComplete, list, setList, deleteItem,editItem];
}

export default useAjax;