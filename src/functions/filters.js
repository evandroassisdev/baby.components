import { date } from 'quasar'

export const removercaracter = (value) => {
  var er = /[^a-z0-9]/gi
  return value.replace(er, '')
}

export const validaHostView = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'viewDev'
  } else {
    return 'view'
  }
}

export const JsonString = (value) => {
  try {
    if (value) {
      return JSON.stringify(value)
    }
    return null
  } catch {
    return null
  }
}

export const MoedaDecimal = (value) => {
  if (!value) return 0
  if (value) {
    return (value / 1).toFixed(2).replace('.', ',').toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
  return value
}

export const StringJson = (value) => {
  try {
    if (value) {
      return JSON.parse(value)
    }
    return null
  } catch {
    return null
  }
}

export const DataDDMMYY = (data) => {
  if (!data || data === '0001-01-01T00:00:00Z') return null
  return date.formatDate(data, 'DD/MM/YYYY')
}

export const DataTimeDDMMYY = (data) => {
  if (!data || data === '0001-01-01T00:00:00Z') return null
  return date.formatDate(data, 'DD/MM/YYYY HH:mm:ss')
}

export const DataUrl = (data) => {
  var date = new Date(data)
  var d = date.getDate()
  var m = date.getMonth() + 1
  var y = date.getFullYear()
  return y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)
}

export const DataUrlDDMMYYY = (data) => {
  // console.log(data)
  var date = data.split('/')
  var d = date[0]
  var m = date[1]
  var y = date[2]
  return y + '-' + m + '-' + d
}

export const IniciaisNome = (nome) => {
  var result = ''
  if (nome) {
    var nomes = nome.split(' ')
    if (nomes.length >= 2) {
      for (var x = 0; x < 2; x++) {
        result += nomes[x].substr(0, 1)
      }
    } else {
      result += nome.substr(0, 2)
    }
  }
  return result.toUpperCase()
}

export const CriaImagemInicais = (nome) => {
  var caracter = IniciaisNome(nome)
  const canvas = document.createElement('canvas')
  canvas.width = 150
  canvas.height = 150
  var ctx = canvas.getContext('2d')
  ctx.font = '70px Comic Sans MS'
  ctx.fillStyle = '#5f5f5f'
  ctx.textAlign = 'center'
  ctx.fillText(caracter, 75, 100)
  return canvas.toDataURL('image/png')
}

export const ValidarImagem = (url) => {
  let ImagemValida = true

  const oK = () => {
    ImagemValida = true
  }
  const error = () => {
    ImagemValida = false
  }
  if (!url) {
    return false
  }
  try {
    var img = document.createElement('img')
    console.log(url)
    img.src = url
    document.getElementsByTagName('body')[0].appendChild(img)
    img.onload = () => {
      oK()
    }
    img.onerror = () => {
      error()
    }
    document.body.removeChild(img)
    return ImagemValida
  } catch (e) {
    error()
    return ImagemValida
  }
}
