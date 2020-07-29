import axios from 'axios'
import { LocalStorage, Loading } from 'quasar'
// import Functions from './../functions/index'

const Header = () => {
  var common = {
    Authorization: 'Bearer ' + LocalStorage.getItem('@ImagemBaby:token'),
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }
  axios.defaults.headers = {
    common: common
  }
}
export const Images = ({ dispatch }, objeto) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } }
  Header()
  Loading.show()
  return axios.post(objeto.endereco, objeto.data, config)
    .then(resp => {
      Loading.hide()
      return resp.data
    })
    .catch(erro => {
      Loading.hide()
      return erro.response.data
    })
}

export const Post = ({ dispatch }, objeto) => {
  Header()
  Loading.show()
  return axios.post(objeto.endereco, objeto.data)
    .then(resp => {
      Loading.hide()
      return resp.data
    })
    .catch(erro => {
      Loading.hide()
      return erro.response.data
    })
}

export const Get = ({ dispatch }, endereco) => {
  Header()
  Loading.show()
  return axios.get(endereco)
    .then(resp => {
      Loading.hide()
      return resp.data
    })
    .catch(erro => {
      Loading.hide()
      if (erro.response.status === 401) {
        window.location.href = '/login'
      }
      return erro.response.data
    })
}

export const GetId = ({ dispatch }, object) => {
  Header()
  Loading.show()
  return axios.get(`${object.endereco}/${object.id}`)
    .then(resp => {
      Loading.hide()
      return resp.data
    })
    .catch(erro => {
      Loading.hide()
      if (erro.response.status === 401) {
        window.location.href = '/login'
      }
      return erro.response.data
    })
}

export const Put = ({ dispatch }, object) => {
  Header()
  Loading.show()
  return axios.put(object.endereco, object.data)
    .then(resp => {
      Loading.hide()
      return resp.data
    })
    .catch(erro => {
      Loading.hide()
      if (erro.response.status === 401) {
        window.location.href = '/login'
      }
      return erro.response.data
    })
}

export const Delete = ({ dispatch }, object) => {
  Header()
  Loading.show()
  return axios.delete(object.endereco, { data: object.data })
    .then(resp => {
      Loading.hide()
      return resp.data
    })
    .catch(erro => {
      Loading.hide()
      if (erro.response.status === 401) {
        window.location.href = '/login'
      }
      return erro.response.data
    })
}

export const UserState = ({ commit }) => {
  commit('Teste')
}
