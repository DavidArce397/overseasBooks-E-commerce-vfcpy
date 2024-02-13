import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { BsBook } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import '../CantidadPorCategoria/CantidadPorCategoria.css'



class CantidadPorCategoria extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CantidadPorCategoria: ''
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
        console.log(data.countByCategory);
        this.setState({
            CantidadPorCategoria: data.countByCategory
        })
    }

    componentDidUpdate() {
        console.log('Componente actualizado');
        console.log(this.state.CantidadPorCategoria)
    }


    render() {
        let contenido;

        if (this.state.CantidadPorCategoria === '') {
            contenido = <p>Cargando...</p>;
        } else {
            const categorias = Object.entries(this.state.CantidadPorCategoria);
            contenido = (
                <ul className="sidebar-card-list">
                    {categorias.map(([categoria, cantidad], index) => (
                        <li className="sidebar-card-list-item" key={index}>
                            <span className="sidebar-card-list-item-category">{categoria}: </span>
                            <span className="sidebar-card-list-item-count">{cantidad}</span>
                        </li>
                    ))}
                </ul>
            );
        }

        return (
            <div className="sidebar-card">
                <div className="sidebar-card-icon">
                    <MdOutlineCategory className="logoLibros" />
                </div>
                <h3 className="sidebar-card-title">Productos por Categoría</h3>
                <div className="sidebar-card-content">{contenido}</div>
            </div>
        );
    }

}

export default CantidadPorCategoria;