import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/main.js',
  output: [
    { file: './dist/mockers.js', format: 'cjs' },
    { file: './dist/mockers.min.js', format: 'cjs', plugins: [terser()] },
    { file: './dist/mockers.esm.js', format: 'esm' },
    { name: 'main', file: './dist/mockers.iife.js', format: 'iife' }
  ],
  plugins: [resolve(), commonjs()]
}
