import React from 'react';
import Settings from "./components/context.js";
import ToDo from './components/todo/todo-connected';

export default class App extends React.Component {
  render() {
    return (
      <>
      <Settings>

        <ToDo />
      </Settings>
      </>
    );
  }
}