import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

const apis = {
  loadCategorias: () => api.get(`/categorias`),
  loadCategoriasById: id => api.get(`/categorias?${id}`),
  deleteCategoria: id => api.delete(`/categorias/${id}`),
  newCategoria: newCategoria => api.post(`/categorias`, newCategoria),
  loadProdutosByCategoriaId: id => api.get(`/produtos?categoria=${id}`)
}

export default apis
