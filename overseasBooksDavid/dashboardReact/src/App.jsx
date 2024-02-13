import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import ReactDOM from 'react-dom'
// import './App.css'
import Products from '../components/Productos/Productos'
import Contador from '../components/Contador'
import Productos from '../components/Productos/Productos'
import Usuarios from '../components/Usuarios/Usuarios'
import Cards from '../components/Cards/Cards'
import ListadoProductos from '../components/ListadoProductos/ListadoProductos'
import ListadoUsuarios from '../components/ListadoUsuarios/ListadoUsuarios'
import Sidebar from '../components/Sidebar/Sidebar'
import Categorias from '../components/Categorias/Categorias'
import Error404 from '../components/Error404/Error404'
import { Route, Routes, Link } from 'react-router-dom'

function App() {

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <h1 style={{ textAlign: 'center', position: 'relative' , display : 'inline', marginBottom:'20px'}}>Admin Dashboard</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Routes>
          <Route exact="true" path="/" element={<div ><Sidebar /> <Cards /></div>}/>
          <Route exact="true" path="/products" element={<div style={{display:'flex', marginTop:'30px'}}><Sidebar /> <ListadoProductos /></div>} />
          <Route exact="true" path="/users" element={<div style={{display:'flex', marginTop:'30px'}}><Sidebar /> <ListadoUsuarios /></div>} />
          {/* <Route path="*" element={<Error404 />} /> */}
        </Routes>

      </div>

    </div>

  )
}

export default App
