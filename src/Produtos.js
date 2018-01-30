import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'

export default class Produtos extends Component {
  constructor(props) {
    super(props)

    this.handleNewCategoria = this.handleNewCategoria.bind(this)
    this.renderCategoria = this.renderCategoria.bind(this)

  }

  componentDidMount() {
    this.props.loadCategorias()
  }

  renderCategoria(categoria) {
    return (
      <li key={categoria.id} className="list-group-item">
        <Link to={`/produtos/categoria/${categoria.id}`}>
          {categoria.categoria}
        </Link>
        <button className='sbtn btn-danger' onClick={() => this.removeCategoria(categoria)}>
          <span className="badge badge-pill badge-danger">X</span>
        </button>
      </li>
    )
  }

  async removeCategoria(categoria){
    await this.props.Api.deleteCategoria(categoria.id)
    this.props.loadCategorias()
  }

  async handleNewCategoria({key}){
    if(key === 'Enter'){
      const categoria = {
        categoria: this.refs.categoria.value
      }
      this.refs.categoria.value = ''
      try {
        await this.props.Api.newCategoria(categoria)
        this.props.loadCategorias()
      } catch (error) {
        console.error(error)
      }
    }
  }

  render() {
    const { match, categorias } = this.props
    console.log('categorias', categorias)
    return (
      <div className="row">
        <div className="col-md-3">
          <h3>Categorias</h3>
          <ul className="list-group">{categorias.map(this.renderCategoria)}</ul>
          <div className="card">
            <div className="card-body">
              <input type="text" ref="categoria" placeholder="Nova Categoria" onKeyUp={this.handleNewCategoria} />
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h1>Produtos</h1>
          <Route exact path={match.url} component={ProdutosHome} />
          <Route path={match.url + '/categoria/:catId'} render={(props) => {
            return (
              <Categoria Api={this.props.Api} {...props} loadCategorias={this.props.loadCategorias} categorias={this.props.categorias}/>
            )}}/>
          {/* <Route path='/2' component={ProdutosHome2} exact /> */}
        </div>
      </div>
    )
  }
}
