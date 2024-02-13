import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

import '../Usuarios/Usuarios.css'



class Usuarios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cantidadUsuarios: ''
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
        console.log(data);
        this.setState({
            cantidadUsuarios: data.count
        })
    }

    componentDidUpdate() {
        console.log('Componente actualizado');
        console.log(this.state.cantidadUsuarios)
    }

    incrementar() {
        this.setState({ numero: this.state.numero + 1 })
    }

    decrementar() {
        this.setState({ numero: this.state.numero - 1 })
    }



    render() {
        let contenido;

        if (this.state.cantidadUsuarios == '') {
            contenido = <p>Cargando...</p>
        } else {
            contenido = <h3>{this.state.cantidadUsuarios}</h3>
        }


        return (
            <div className="sidebar-card">
                <div className="sidebar-card-icon">
                    <FaRegUser className="logoLibros" />
                </div>
                <h3 className="sidebar-card-title">Cantidad de Usuarios</h3>
                <div className="sidebar-card-content">{contenido}</div>
            </div>
        );
    }
}

export default Usuarios;