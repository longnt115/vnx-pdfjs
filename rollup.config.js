import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'VNX_PDFJS',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    terser()
  ]
};
