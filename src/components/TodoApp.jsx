import { useState } from "react";


function TodoApp(){
    const notass = [
                        {id:crypto.randomUUID(), text:'Soy la nota 1'},
                        {id:crypto.randomUUID(), text:'Soy la nota 2'}
                    ];
    const [ notas, setNotas ] = useState(notass)
    //map = retorna array
    return (
        <>
           <h1>Notas</h1>
           <ul>
                {notas.map(nota => <li key={nota.id}> {nota.text} </li> )}
           </ul>
        </>
    );
};

export default TodoApp;