import axios, { AxiosResponse } from 'axios'
import { ApiResponse } from '~/interfaces/api'
import { Product } from '~/interfaces/products'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

const getProducts = async (): Promise<Product[]> => {
  try {
    const res: AxiosResponse<ApiResponse<Product[]>> = await api.get('produtos')
    return res.data.data
  } catch (error) {
    alert('Erro ao tentar listar os produtos:')
    throw error
  }
}

export default { getProducts }
