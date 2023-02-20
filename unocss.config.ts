import { defineConfig, presetIcons, presetUno } from 'unocss';
import { antdUnoColor } from './config/theme/tokens';

export function createConfig({ dev = true } = {}) {
  return defineConfig({
    envMode: dev ? 'dev' : 'build',
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
