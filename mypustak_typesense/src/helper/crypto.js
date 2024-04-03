const CryptoJS = require('crypto-js');
const nacl = require('tweetnacl')
const utils = require('tweetnacl-util')
const encodeBase64 = utils.encodeBase64// Our nonce must be a 24 bytes Buffer (or Uint8Array)
const nonce = nacl.randomBytes(24)// Our secret key must be a 32 bytes Buffer (or Uint8Array)
const X = '9UPyMC@IQC6AX$ECD3OT_LD*BIaSPS=0'
const t = Buffer.from(X, 'utf8')// Make sure your data is also a Buffer of Uint8Array
export const encryptor = (data) => {
  if(!Object.keys(data).length) return ``
    const str_data = JSON.stringify(data)
    const secretData = Buffer.from(str_data, 'utf8')
    const encrypted = nacl.secretbox(secretData, nonce, t)// We can now store our encrypted result and our nonce somewhere
    const result = `${encodeBase64(nonce)}:${encodeBase64(encrypted)}`

    return result
};

export const decryptor = (ciphertext) => {
  const passphrase = '123';
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};