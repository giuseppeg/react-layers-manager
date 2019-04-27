import babel from 'rollup-plugin-babel'

export default ['cjs', 'es'].map(format => ({
  input: './src/index.js',
  output: {
    file: `./lib/index.${format}.js`,
    format
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: ['react', 'react-dom']
}));
