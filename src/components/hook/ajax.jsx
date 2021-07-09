import { useEffect,useState, useContext} from "react";
import { userContext } from '../context';

import axios from 'axios';

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
    console.log('tttttttttt');
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

  return [_addItem, _toggleComplete, list, setList, deleteItem,editItem,prevPage,nextPage,screen,next];
}

export default useAjax;