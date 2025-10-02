import { useState, useEffect } from "react";
import styles from './todoApp.module.css'
import TodoForm from "./todoForm/TodoForm";
import { SquarePen, Trash } from "lucide-react";

function TodoApp(){
    const [ notes, setNotes ] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/notas")

                if (!response.ok) {
                    throw new Error(`Error Http: ${response.status}`);
                }
                const data = await response.json()
                setNotes(data)
            } catch(error) {
                console.log(error)
            }
            
        };
        fetchData();
    },[]);
    //map = retorna array

    const addNote = (newNote)=>{
        setNotes([...notes, newNote])
    }


    return (
        <>
           <h1  className={styles.titulo} > Notas</h1>

            <TodoForm onAddNote={addNote} />

           <ul className={styles.noteList}>
                {notes.map((note) => (
                     <li className={styles.noteItem} key={note.id}> 
                         <span>
                            {note.text} {note.completed ? "✅" : "❌" }
                         </span>
                        <div className={styles.iconsContainer}>
                            <SquarePen size={16} /><Trash size={16} />
                        </div>
                     </li> ))}
           </ul>
        </>
    );
};

export default TodoApp;