import replace from 'rollup-plugin-replace';
// import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
// import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

var external = Object.keys(require('../package.json').dependencies);

export default config => {
  return {
    // input: 'compiled/index.js',
    input: 'src/index.ts',
    output: {
      format: config.format,
      file: config.dest,
      sourcemap: true
    },
    external: external,
    plugins: [
      typescript(),
      // buble(),
      nodeResolve({
        // use "module" field for ES6 module if possible
        module: true, // Default: true
        
        // use "jsnext:main" if possible
        // legacy field pointing to ES6 module in third-party libraries,
        // deprecated in favor of "pkg.module":
        // - see: https://github.com/rollup/rollup/wiki/pkg.module
        jsnext: true,  // Default: false
  
        // use "main" field or index.js, even if it's not an ES6 module
        // (needs to be converted from CommonJS to ES6
        // – see https://github.com/rollup/rollup-plugin-commonjs
        main: true,  // Default: true
        
        // some package.json files have a `browser` field which
        // specifies alternative files to load for people bundling
        // for the browser. If that's you, use this option, otherwise
        // pkg.browser will be ignored
        // browser: true,  // Default: false
        // modulesOnly: true, // Default: false
        browser: false,  // Default: false
        modulesOnly: false, // Default: false
      }),
      commonjs(),
      babel(),
      replace({'process.browser': JSON.stringify(!!config.browser)})
    ]
  };
};
