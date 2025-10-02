//import './App.css'
import TodoApp from './components/TodoApp'
import { useState } from 'react';

// <></> = fragment
function App() {
  return (
    <section className='containerTodoApp'>
        <TodoApp/>
    </section>
  )
}

export default App

