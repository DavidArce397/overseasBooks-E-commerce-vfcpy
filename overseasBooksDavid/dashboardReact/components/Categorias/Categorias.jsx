import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { BsBook } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import '../Categorias/Categorias.css'



class Categorias extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cantidadCategorias: ''
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
            cantidadCategorias: data.totalCategories
        })
    }

    componentDidUpdate() {
        console.log('Componente actualizado');
        console.log(this.state.cantidadCategorias)
    }


    render() {
        let contenido;

        if (this.state.cantidadCategorias == '') {
            contenido = <p>Cargando...</p>
        } else {
            contenido = <h3>{this.state.cantidadCategorias}</h3>
        }


        return (
            <div className="sidebar-card">
                <div className="sidebar-card-icon">
                    <MdOutlineCategory className="logoLibros" />
                </div>
                <h3 className="sidebar-card-title">Cantidad de Categorías</h3>
                <div className="sidebar-card-content">{contenido}</div>
            </div>
        );
    }
}

export default Categorias;