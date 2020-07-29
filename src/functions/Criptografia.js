import { Base64 } from 'js-base64'

export const EncriptaBase64 = (value) => {
  if (!value) return null
  return Base64.encodeURI(value)
}

export const DescriptaBase64 = (value) => {
  if (!value) return null
  return Base64.decode(value)
}

export const Encripta = (dados) => {
  try {
    if (dados) {
      var mensx = ''
      var j = 0
      var ch = 'assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm'
      for (var i = 0; i < dados.toString().length; i++) {
        j++
        var l = (Asc(dados.substr(i, 1)) + (Asc(ch.substr(j, 1))))
        if (j === 50) {
          j = 1
        }
        if (l > 255) {
          l -= 256
        }
        mensx += (Chr(l))
      }
      return mensx
    }
    return null
  } catch {
    return null
  }
}

export const Descripta = (dados) => {
  try {
    if (dados) {
      var mensx = ''
      var j = 0
      var ch = 'assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm'
      for (var i = 0; i < dados.toString().length; i++) {
        j++
        var l = (Asc(dados.substr(i, 1)) - (Asc(ch.substr(j, 1))))
        if (j === 50) {
          j = 1
        }
        if (l < 0) {
          l += 256
        }
        mensx += (Chr(l))
      }
      return mensx
    }
    return null
  } catch {
    return null
  }
}

const Asc = (String) => {
  try {
    return String.charCodeAt(0)
  } catch {
    return null
  }
}

const Chr = (AsciiNum) => {
  try {
    return String.fromCharCode(AsciiNum)
  } catch {
    return null
  }
}
