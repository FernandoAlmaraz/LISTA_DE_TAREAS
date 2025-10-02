import './App.css'
import TodoApp from './components/TodoApp'
import { useState } from 'react';

// <></> = fragment
function App() {
  // const notes = [
  //   {id:crypto.randomUUID(), text:'Soy la nota 1'},
  //   {id:crypto.randomUUID(), text:'Soy la nota 2'}
  // ];

  // const titles = {
  //   tituloApp: 'Soy el titulo App',
  //   subTituloApp: 'Soy el subtitulo App'
  // };
  return (
    <section className='containerTodoApp'>
        <TodoApp ></TodoApp>
        <TodoApp/>
    </section>
  )
}

export default App

