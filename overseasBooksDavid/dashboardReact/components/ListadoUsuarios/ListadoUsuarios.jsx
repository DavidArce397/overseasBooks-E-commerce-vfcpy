import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { BsBook } from "react-icons/bs";
import '../ListadoUsuarios/ListadoUsuarios.css'



class ListadoUsuarios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ListadoUsuarios: ''
        }
    }


    apiCall(url, consecuencia) {
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(error => console.log(error))
    }


    componentDidMount() {
        console.log('Componente montado');
        this.traerDatos();
    }

    traerDatos() {
        this.apiCall("http://localhost:3001/api/users", this.mostrarDatos)
    }

    mostrarDatos = (data) => {
        // console.log('cantidad ' + data.count)
        // let titulo = data.data.map(data => data.title)
        console.log(data.data);
        this.setState({
            ListadoUsuarios: data.data
        })
    }

    componentDidUpdate() {
        console.log('Componente actualizado');
        console.log(this.state.ListadoUsuarios)
    }



    render() {
        let contenido;

        if (this.state.ListadoUsuarios === '') {
            contenido = <p>Cargando...</p>;
        } else {
            contenido = (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>CreatedAt</th>
                            <th>UpdatedAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ListadoUsuarios.map(elemento => (
                            <tr key={elemento.id}>
                                <td>{elemento.id}</td>
                                <td>{elemento.first_name}</td>
                                <td>{elemento.last_name}</td>
                                <td>{elemento.email}</td>
                                <td>{elemento.admin}</td>
                                <td>{elemento.createdAt}</td>
                                <td>{elemento.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }



        return (
            <div>
                {contenido}
            </div>
        );
    }



}

export default ListadoUsuarios;