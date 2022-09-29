import JSEncrypt from 'jsencrypt'
const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbR8srPaS9LSsvl8tKa7CWvw2F' +
  'ZNFfH6KHuOlhtIyWWEx5bm6RtAlemUw9WhFUqcFEoBjTomTksMQNplP/yZ4czdJ7' +
  'HFAd1MDC0NsH/Q0UBT46U/2o0TXNxDW4ZglE0+b/k6kiC0cwgqVbuvRwz2jVwi3A' +
  'OJK8bQfu3+2iPkpd3QIDAQAB'
const pwdkey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChDnCJSDnLdKrK5QBv7hb+QNIWiC2slLOeWYUQ' +
  'hA7DKYKp7f6aKmWFE7mDRnA/LUoo26yxEJcfT9Wt2CzMmrjnRQDT3BmJxlWBHul90Hv1dMVdkrDn' +
  '+dP7uXLLeiT4NFwbhLRMVYrMaXSdRDaRAG6g6oDIJfPM24XvBVZf3a/J7wIDAQAB'

export const encrypt = {
  encrypt(str: string, key = publicKey): string | false {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(key);
    return jsEncrypt.encrypt(str);
  },
  encryptByPwdkey(str: string) {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(pwdkey);
    const encrypted = jsEncrypt.encrypt(str);
    return encrypted;
  },
}

export default encrypt
