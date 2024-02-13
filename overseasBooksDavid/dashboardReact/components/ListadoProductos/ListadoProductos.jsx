import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { BsBook } from "react-icons/bs";
import '../ListadoProductos/ListadoProductos.css'



class ListadoProductos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ListadoProductos: ''
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
        // let titulo = data.data.map(data => data.title)
        console.log(data.data);
        this.setState({
            ListadoProductos: data.data
        })
    }

    componentDidUpdate() {
        console.log('Componente actualizado');
        console.log(this.state.ListadoProductos)
    }



    render() {
        let contenido;

        if (this.state.ListadoProductos === '') {
            contenido = <p>Cargando...</p>;
        } else {
            contenido = (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Autor</th>
                            <th>Categoría</th>
                            <th>CreatedAt</th>
                            <th>UpdatedAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ListadoProductos.map(elemento => (
                            <tr key={elemento.id}>
                                <td>{elemento.id}</td>
                                <td>{elemento.title}</td>
                                <td>{elemento.price}</td>
                                <td>{elemento.stock}</td>
                                <td>{elemento.authors.name}</td>
                                <td>{elemento.categories.category}</td>
                                <td>{elemento.createdAt}</td>
                                <td>{elemento.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }



        return (
            <div >
                {contenido}
            </div>
        );
    }



}

export default ListadoProductos;