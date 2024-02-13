import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import '../Productos/Productos.css'
import Productos from "../Productos/Productos";
import Usuarios from "../Usuarios/Usuarios";
import Categorias from "../Categorias/Categorias";
import CantidadPorCategoria from "../CantidadPorCategoria/CantidadPorCategoria"
import '../Cards/Cards.css'


function Cards() {

    return (
        <div style={{position : 'relative',bottom: '25px'}}>
            <div className="cards">
                <Productos />
                <Usuarios />
                <Categorias />
                <CantidadPorCategoria />
            </div>
        </div>

    )
}

export default Cards;