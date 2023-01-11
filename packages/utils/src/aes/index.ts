import  Crypto from 'crypto-js'

const SECRET_PASSHARASE = Crypto.enc.Utf8.parse('xB0K5MBLChA+cYgTJB6FtAbf1Y5uh6nZ')
const AES_PARAMS = { mode: Crypto.mode.ECB, padding: Crypto.pad.Pkcs7 }

export function encryptMsg (msg: string) {
  const encrypted = Crypto.AES.encrypt(Crypto.enc.Utf8.parse(msg), SECRET_PASSHARASE, AES_PARAMS)
  return encrypted.toString()
}

export function decryptContext (context: string) {
  const decryptResult = Crypto.AES.decrypt(context, SECRET_PASSHARASE, AES_PARAMS)
  return decryptResult.toString(Crypto.enc.Utf8).toString()
}

