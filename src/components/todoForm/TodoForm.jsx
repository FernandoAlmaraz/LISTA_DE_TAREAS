import { useState } from "react"

function TodoForm({ onAddNote }) {

    const [textNote, setTextNote] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        //aca enviamos la nota a la DB.
        if (textNote ==="") {
            console.log("No se pueden anadir notas vacias")
            return
        }
        const newNote = {
            text: textNote,
            completed: false
        }    

        fetch("http://localhost:3000/notas",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newNote)
        })
        .then(response => response.json())
        .then(data => {
            onAddNote(data)
            setTextNote("")
        })

        console.log(textNote)
    }

    // const handleChange = (e) => {
    //     setTextNote(e.target.value)
    // }
    return(
        <div>
            <h2> ToDo Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                       id="note"
                       name="note"
                       value={textNote}
                       onChange={(event)=> setTextNote(event.target.value)}
                       />
                <button type="submit"> ADD NEW NOTE </button>
            </form>
        </div>
    )

};
export default TodoForm;