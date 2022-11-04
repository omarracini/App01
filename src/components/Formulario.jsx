import React,{useState} from "react";

const Formulario = () =>{

    const [contador, setContador]=useState(1)
    const [IDcampo, setID]=useState(Number)
    const [nombre, setNombre]=useState('')
    const [apellido, setApellido]=useState('')
    const [lista,setLista]=useState([])

    const guardarDatos=(e)=> {
        e.preventDefault()

        
        if(nombre===''){
            alert('Ingrese su nombre')
            return
        }
        if(apellido===''){
            alert('Ingrese su apellido')
            return
        }

        if(IDcampo===0){
            setContador(contador+1)
            setLista([
                ...lista,
                {id:contador, nombre:nombre, apellido:apellido}
            ])
        }else{

            const arrayDatos = lista.map((item)=>{

                if(parseFloat(item.id)===parseFloat(IDcampo)){
                    const updatedItem = {
                        ...item,
                        id:IDcampo, 
                        nombre:nombre, 
                        apellido:apellido
                    }
                    return updatedItem;
                }else{
                    return item;
                }
                
            })

            setLista(arrayDatos);

        }
        
        e.target.reset()
        setID(0)
        setNombre('')
        setApellido('')

    }

    const Editar=(indexItem)=>{
        const arrayDatos = lista.filter(e=>e.id===indexItem)

        setID(arrayDatos.map(e=>e.id))
        setNombre(arrayDatos.map(e=>e.nombre))
        setApellido(arrayDatos.map(e=>e.apellido))

        document.getElementById("IDcampo").value=arrayDatos.map(e=>e.id)
        document.getElementById("Fnombre").value=arrayDatos.map(e=>e.nombre)
        document.getElementById("Fapellido").value=arrayDatos.map(e=>e.apellido)
    }

    const Eliminar=(indexItem)=>{
        setLista((prevState) =>
            prevState.filter((todo, index) => todo.id !== indexItem)
        );
    }

    return (
        <div>
            <div className="card mt-5">
            <div className="card-header">FORMULARIO</div>
                <div className="card-body">
                    <form onSubmit={guardarDatos}>
                        <div className="row">
                            <div className="my-3 col-12 col-md-6">
                                <input type="hidden" id="IDcampo" />
                                <input type="text" id="Fnombre" className="form-control" placeholder="Ingrese su Nombre" onChange={(e)=>setNombre(e.target.value)}/>
                            </div>
                            <div className="my-3 col-12 col-md-6">
                                <input type="text" id="Fapellido" className="form-control" placeholder="Ingrese su Apellido" onChange={(e)=>setApellido(e.target.value)}/>
                            </div>
                        </div>
                    
                        <div className="d-grid gap-2 d-md-block text-center">
                            <button type="submit" className="m-3 btn btn-success">SAVE <i className="bi bi-check"></i></button>
                        </div>
                    </form>
                </div>
            </div>

            <hr/>
            <h3>Lista Usuarios <i className="bi bi-people"></i></h3>

            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">APELLIDO</th>
                    <th scope="col" className="text-center">OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map((elemento, index)=>(
                            <tr key={elemento.id}>
                                <td>{elemento.id}</td>
                                <td>{elemento.nombre}</td>
                                <td>{elemento.apellido}</td>
                                <td className="text-center">
                                <button type="button" className="btn btn-warning btn-sm mx-2" title="Modificar" onClick={()=>Editar(elemento.id)}><i className="bi bi-pen">EDIT</i></button> 
                                <button type="button" className="btn btn-danger btn-sm" title="Eliminar" onClick={()=>Eliminar(elemento.id)}><i className="bi bi-trash3"></i>ERASE</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Formulario