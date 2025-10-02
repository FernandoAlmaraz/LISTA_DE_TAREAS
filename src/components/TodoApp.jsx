import { useState, useEffect } from "react";
import styles from './todoApp.module.css'
import TodoForm from "./todoForm/TodoForm";
import { SquarePen, Trash } from "lucide-react";
import EditNoteForm from "./editeNoteForm/EditNoteForm";
function TodoApp(){
    const [ notes, setNotes ] = useState([]);
    const [noteEditingId, setNoteEditingId] = useState(null);
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
    const deleteNote=(id) => {
        setNotes(notes.filter(note => note.id !== id));
        fetch(`http://localhost:3000/notas/${id}`,{
            method:"DELETE",
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Error al eliminar la nota: ${response.status}`
                );
            }
            console.log("Nota eliminana correctamente");
        })
        .catch((error)=> console.error(error));
    };

    const UpdateNote=(noteUpdated) => {
       setNotes(
            notes.map((note)=>{
                return note.id === noteUpdated.id ? noteUpdated : note;
         })
        );
    };


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
                            <SquarePen size={26}  onClick={()=> setNoteEditingId(note.id)} />
                            <Trash  onClick={()=>deleteNote(note.id)}  size={26} />
                        </div>
                     {
                        noteEditingId === note.id && (
                            <EditNoteForm
                                note={note}
                                onEditNote ={UpdateNote}
                                onCancel = {()=> setNoteEditingId(null)}
                            
                            />
                        )
                     }

                     </li> ))}
           </ul>
        </>
    );
};

export default TodoApp;