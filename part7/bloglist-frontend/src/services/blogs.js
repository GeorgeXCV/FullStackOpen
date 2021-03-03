import axios from 'axios'
import jwt_decode from 'jwt-decode'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getCurrrentUser = () => {
  return jwt_decode(token)
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)  
  return response.data
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const comment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })  
  return response.data
}

const update = async (id, newObject) => {
  const user = getCurrrentUser();
  const request = await axios.put(`${baseUrl}/${id}`, {...newObject, user: user.id })
  return request.data
}

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token }, }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default {  getCurrrentUser, getAll, getBlog, create, comment, update, deleteBlog, setToken }

