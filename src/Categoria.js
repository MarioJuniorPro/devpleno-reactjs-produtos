import React, { Component } from 'react'

export default class Categoria extends Component {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
    this.loadCategoria = this.loadCategoria.bind(this)
  
    this.state = {
       produtos: [],
       categoria: {}
    }
  }
  componentDidMount(){
    const id = this.props.match.params.catId
    this.loadCategoria(id)
    this.loadData(id)
  }

  componentWillReceiveProps(newProps){
    const id = newProps.match.params.catId
    this.loadCategoria(id)
    this.loadData(id)
  }

  loadData(id){
      this.props.Api.loadProdutosByCategoriaId(id)
      .then(resp => {
        this.setState({produtos: resp.data})
      })
  }

  loadCategoria(id){
    this.props.Api.loadCategoriasById(id)
    .then(resp => {
      const [categoria] = resp.data
      this.setState({categoria})
    })  
  }

  renderProduto(produto){
    return (
      <div key={produto.id} className="card">
        <div className="card-body">
          {produto.produto}
        </div>
      </div>
    )
  }
  
  render() {
    return (
      <div>
        <h1>{this.state.categoria.categoria}</h1>
        {this.state.produtos.map(produto => this.renderProduto(produto))}
      </div>
    )
  }
}
