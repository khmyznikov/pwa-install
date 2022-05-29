// import reactify from 'cem-plugin-reactify';

export default {
  /** Globs to analyze */
  globs: ['src/index.ts'],
  /** Globs to exclude */
//   exclude: ['src/foo.js'],
//   /** Directory to output CEM to */
//   outdir: 'dist',
//   /** Run in dev mode, provides extra logging */
//   dev: true,
//   /** Run in watch mode, runs on file changes */
//   watch: true,
//   /** Include third party custom elements manifests */
//   dependencies: true,
//   /** Output CEM path to `package.json`, defaults to true */
//   packagejson: false,
  /** Enable special handling for litelement */
  litelement: true,
//   /** Enable special handling for catalyst */
//   catalyst: false,
//   /** Enable special handling for fast */
//   fast: false,
//   /** Enable special handling for stencil */
//   stencil: false,
//   /** Provide custom plugins */
//   plugins: [
//     reactify({
// 		/** Directory to write the React wrappers to, defaults to `legacy` */
// 		outdir: 'dist/react',
		
// 		/** Provide an attribute mapping to avoid using JS/React reserved keywords */
// 		attributeMapping: {
// 		  'for': '_for'
// 		},
  
// 		// /** Array of classNames to exclude */
// 		// exclude: ['PWAInstallElement']
// 	  })
//   ]
}