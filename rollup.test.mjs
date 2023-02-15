import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// 虚拟模块, 
// import virtual from '@rollup/plugin-virtual'


export default {
  input: 'test/e2e/index.js',
  output: [
    { file: './dist/test.js', format: 'cjs' },
  ],
  plugins: [
    // virtual({
    //   batman: `export default 'na na na na na'`,
    // })
    , resolve(), commonjs(),]
}
