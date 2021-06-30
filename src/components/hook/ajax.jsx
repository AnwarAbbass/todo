import { useEffect,useState, useContext} from "react";
import { userContext } from '../context';
const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

let next = true;
let oldList ;
const useAjax = ()=>{
  const contextSettings = useContext(userContext);
  const [list, setList ] = useState([]);

  let screen = list.slice(0, contextSettings.itemPerScreen);

  function nextPage(e) {
    if (next) {
      oldList = list;
      next = !next;
    }
    screen = list.slice(contextSettings.itemPerScreen);
    setList(screen);
  }

  function prevPage(e) {
    screen = oldList.slice(0);
    setList(screen);
    next = !next;
  }

  list.sort((first, secound) => {
    return first[contextSettings.sortOn] - secound[contextSettings.sortOn];
  });

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

  return [_addItem, _toggleComplete, list, setList, deleteItem,editItem,prevPage,nextPage,screen,next];
}

export default useAjax;