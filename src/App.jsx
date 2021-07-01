import React from 'react';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import ToDo from './components/todo/todo';

export default class App extends React.Component {
  render() {
    return (
      <>
      <Header/>    

        <ToDo />

      <Footer/>
      </>
    );
  }
}