import { defineConfig, presetIcons, presetUno } from 'unocss';
import { antdUnoColor } from './config/theme/tokens';

export function createConfig({ dev = true } = {}) {
  return defineConfig({
    envMode: dev ? 'dev' : 'build',
    shortcuts: {
      border: 'border-1 border-solid border-red',
      center: 'height-width-100 color-red flex-center border',
      'center-2': 'height-width-100 color-red flex items-center justify-center',
    },
    presets: [
      presetUno(),
      presetIcons({
        prefix: '',
      }),
    ],
    theme: {
      colors: {
        demoColor: '#0000ff', // class="text-demo-color",
        ...(antdUnoColor() || {}),
      },
    },
  });
}

export default createConfig();
