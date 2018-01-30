import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'

class App extends Component {
  constructor(props) {
    super(props)

    // this.loadCategorias = this.loadCategorias.bind(this)
    // this.removeCategoria = this.removeCategoria.bind(this)
  
    this.state = {
      categorias:[]
    }
  }

  loadCategorias = async () => {
    try {
      const resp = await this.props.Api.loadCategorias()
      this.setState({ categorias: resp.data })
    } catch (error) {
      console.error(error)
    }
  }

  removeCategoria = async (categoria) => {
    await this.props.Api.deleteCategoria(categoria.id)
    this.loadCategorias()
  }
  
  render() {
    return (
      <Router>
        <Fragment>
            <header>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container'>
                  <Link className="navbar-brand" to="/">Gerenciador de Produtos</Link>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/produtos">Produtos</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/sobre">Sobre</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </header>
            <main role="main" className="container">
              <Route path='/' component={Home} exact />
              <Route path='/sobre' component={Sobre} exact />
              <Route path='/produtos' render={(props) => {
                return (<Produtos {...props} 
                  Api={this.props.Api} 
                  loadCategorias={this.loadCategorias} 
                  removeCategoria={this.removeCategoria} 
                  categorias={this.state.categorias} />
                )}
              }/>
            </main>
        </Fragment>
      </Router>
    );
  }
}

export default App;
