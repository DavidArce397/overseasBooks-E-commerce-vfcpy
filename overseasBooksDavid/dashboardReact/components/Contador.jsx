import { Link } from "react-router-dom";
import React, { Component } from 'react';

class Contador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numero : props.inicial
        }
    }


    incrementar () {
        this.setState({numero : this.state.numero + 1})
    }

    decrementar () {
        this.setState({numero : this.state.numero - 1})
    }


    render() {
        return (
            <div>
                <p>Cantidad de clicks : {this.state.numero}</p>
                <button onClick={() => {this.incrementar()}}>Incrementar</button>
                <button onClick={() => {this.decrementar()}}>Decrementar</button>
            </div>
            
                )
    }
}

export default Contador;