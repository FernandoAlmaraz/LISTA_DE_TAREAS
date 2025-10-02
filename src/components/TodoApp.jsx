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
    const checkAsCompleted = async(noteId)=> {
        try {
            const note = notes.find(note => note.id === noteId);
            const response = await fetch(`http://localhost:3000/notas/${noteId}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application-json",
                },
                body: JSON.stringify({ completed: !note.completed })
            })
            if (!response.ok) {
            throw new Error(`Error al actualizar el estado de la nota`);
            
             }
            const updatedStatusNote = await response.json()
            setNotes(notes.map(note => note.id === noteId ? updatedStatusNote: note))
        } catch (error) {
            
        }
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
                            <button onClick={() => checkAsCompleted(note.id) } >
                                {note.completed ? "Desmarcar": "Completar"}
                            </button>
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