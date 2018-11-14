import React, { Component } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Error from './componentes/Error';
import Clima from './componentes/Clima';

class App extends Component {

  state = {
    error: '',
    consulta: {},
    resultado: {}
  }

  componentDidUpdate (prevProps, prevState) {
    if(prevState.consulta !== this.state.consulta) {
      this.consultarApi();
    }
  }

  componentDidMount() {
    this.setState({
      error: false
    })
  }

  consultarApi = () => {
    const {ciudad, pais} = this.state.consulta;
    if(!ciudad || !pais) return null;

    const appId = '2b4b47fdadab1f6410a10970ea85904b';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    // query con fetch api
    fetch(url)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        this.setState({
          resultado: datos
        });
      })
      .catch(error => {
        console.error(error);
      });

    // leer la url y agregar el API key
    

    // consultar con fecth
  }

  datosConsulta = respuesta => {
    if(respuesta.ciudad === '' || respuesta.pais === '') {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        error: false,
        consulta: respuesta
      });
    }
  }

  render() {

    const error = this.state.error;
    let resultado;

    if(error) {
      resultado = <Error mensaje = "Ambos campos son obligatorios" />
    } else {
      resultado = <Clima resultado = {this.state.resultado} />
    }

    return (
      <div>
        <Header titulo="Clima React"/>
        <Formulario
          datosConsulta = {this.datosConsulta}
        />
        {resultado}
      </div>
    );
  }
}

export default App;
