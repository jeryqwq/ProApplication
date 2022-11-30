import JSEncrypt from 'jsencrypt'
const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGBBujBtavj/ZyaUo207utO/D15NA0zjJnlCTrxmRFZvcN126vwfPgdDVFTcKg79YnwWHpFHki0zLTPSjw6BB+7DixpKVGayzSiD1riVFlmCqxQWXTueK/F6M5SZ/5weU2JwmBb8YEP93AIrsOOUnnteBGWc1JqNuLCCqG121QSQIDAQAB'
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
export const DEFAULT_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGBBujBtavj/ZyaUo207utO/D15NA0zjJnlCTrxmRFZvcN126vwfPgdDVFTcKg79YnwWHpFHki0zLTPSjw6BB+7DixpKVGayzSiD1riVFlmCqxQWXTueK/F6M5SZ/5weU2JwmBb8YEP93AIrsOOUnnteBGWc1JqNuLCCqG121QSQIDAQAB";
export const JWT_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNS+vq/8w8OVqpHTeYBZZBIFrEw/2C67jUCuUYj4zzgh670o99SWjkHmhN0bNwKylj4UpGMTmlOijUYl5yM7EFcr8ID7//r8xVZCtANa9nHtBKdQux7yP2HYnJ6zQtM4tmAXqwXN3iK/xb+b/gMUNg4bzf/VPO0QZuMaBmuU2DhQIDAQAB";
export const PASSWORD_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhYnRwe8HIQQ3uvZYSVfJx5DyEMQITHFnwkagbh32Sosjf3xmh5oOVxZeihUzzH3wLAGUwAjYj7OOmKfmNYSIf1UTRttzgamSiRVUn8vFgt4VTVoOluVIawzYeCu4tODgwJDqajR3T0Hx3bv87YFHE5ZX28VIhEP0eQHXlkzf0TQIDAQAB";
