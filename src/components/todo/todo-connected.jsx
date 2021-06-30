import React, { useEffect } from 'react';
import TodoForm from './form';
import TodoList from './list';
import './todo.scss';
import useAjax from '../hook/ajax'

// const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [_addItem, _toggleComplete, list, setList, deleteItem,editItem] = useAjax();


  useEffect(() => {
    if (list.length >0) { 
      let complete = list.filter(item => !item.complete).length
      let incomplete = list.length - list.filter(item => !item.complete).length
      document.title = `complete/incomplete : ${complete} : ${incomplete}` 
    }
  }, [list]);

  const deleteTaskHanle = (id)=>{
    let listContent = list.filter(item=>item._id !== id);
    deleteItem(id);
    console.log('sssssssss');
    setList(listContent);
  }

  const edithandle = (obj) => {
    let listContent = list.filter(item=>item._id !== obj._id);
    editItem(obj);
    setList(listContent);
  };

  return (
    <>
      <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            handleDelete = {deleteTaskHanle}
            handleUpdate = {edithandle}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;