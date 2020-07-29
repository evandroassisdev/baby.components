import { LocalStorage } from 'quasar'
// import Functions from './../functions/index'

export default {
  Logout: (state) => {
    LocalStorage.remove('@ImagemBaby:token')
    state.token = null
    state.user = null
    state.isAuth = false
  }
}
