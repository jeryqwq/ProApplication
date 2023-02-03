import { IApi } from 'umi';
import { theme } from 'antd';
import { antdTheme } from '../theme/tokens';
const { defaultAlgorithm } = theme;
const mapToken = defaultAlgorithm(antdTheme);
let _hack_varible: Record<string, string> = {};
for (const key in mapToken) {
  if (Object.prototype.hasOwnProperty.call(mapToken, key)) {
    const element = mapToken[key as 'red'];
    _hack_varible[`--${key}`] = element;
  }
}

const cssVarible = `:root ${JSON.stringify(_hack_varible)
  .replaceAll(',', ';')
  .replaceAll('"', '')}`;

export default (api: IApi) => {
  api.addHTMLStyles(() => cssVarible);
};
