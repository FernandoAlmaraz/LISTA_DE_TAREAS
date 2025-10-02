import { useState } from "react";
import styles from "../TodoApp.module.css"
const EditNoteForm = ({note, onEditNote, onCancel}) =>{
   
  const [textEdited, setTextEdited] = useState();

  const handleSubmit = async (e)  => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:3000/notas/${note.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application-json",
                },
                body: JSON.stringify({ text: textEdited })
            }
        )
        if (!response.ok) {
            throw new Error(`Error http: ${response.status}`);
            
        }

        const noteUpdated = await response.json()
        onEditNote(noteUpdated);
        onCancel();
    } catch (error) {
        console.error(error);
    }
  }


  return (

    <form onSubmit={handleSubmit} className={styles.editForm} >
        <input type="text"
         value={textEdited} 
         onChange={(e) => setTextEdited(e.target.value)}  
         className={styles.editInput} 
        />
        <button type="submit" className={styles.saveButton} >Guardar</button>
        <button type="button" onClick={onCancel} className={styles.cancelButton}  >Cancelar</button>
    </form>
  )
}

export default EditNoteForm;