import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { BsBook } from "react-icons/bs";
import '../Productos/Productos.css'



class Productos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cantidadProductos: ''
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
        this.apiCall("http://localhost:3001/api/products", this.mostrarDatos)
    }

    mostrarDatos = (data) => {
        // console.log('cantidad ' + data.count)
        let titulo = data.data.map(data => data.title)
        console.log(titulo);
        this.setState({
            cantidadProductos: data.count
        })
    }

    componentDidUpdate() {
        console.log('Componente actualizado');
        console.log(this.state.cantidadProductos)
    }

    incrementar() {
        this.setState({ numero: this.state.numero + 1 })
    }

    decrementar() {
        this.setState({ numero: this.state.numero - 1 })
    }



    render() {
        let contenido;

        if (this.state.cantidadProductos == '') {
            contenido = <p>Cargando...</p>
        } else {
            contenido = <h3>{this.state.cantidadProductos}</h3>
        }


        return (
            <div className="sidebar-card">
                <div className="sidebar-card-icon">
                    <BsBook className="logoLibros" />
                </div>
                <h3 className="sidebar-card-title">Cantidad de Productos</h3>
                <div className="sidebar-card-content">{contenido}</div>
            </div>
        );
    }
}

export default Productos;