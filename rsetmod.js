"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "rsetmod",
			"path": "rsetmod/rsetmod.js",
			"file": "rsetmod.js",
			"module": "rsetmod",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/rsetmod.git",
			"test": "rsetmod-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Reset module to pristine development mode.

		This procedure is synchronous.

		The following procedures will be done:
		a. Installed files.
		1. Delete the node_modules directory.
		2. Delete the bower_components directory.
		3. Delete the yarn.lock file.
		4. Delete the package-lock.json.
		5. Delete the npmshrinkwrap.json.
		b. Generated files.
		6. Delete *.deploy.js files.
		7. Delete *.support.js files.
		8. Delete *.js files if *.module.js files are present.
		c. Configuration files.
		9. Delete `devDependencies` and `dependencies` from package.json.
		10. Delete `resolutions` and `dependencies` from bower.json.
	@end-module-documentation

	@include:
		{
			"depher": "depher",
			"detr": "detr",
			"fs": "fs-extra",
			"fype": "fype",
			"glob": "glob",
			"kept": "kept",
			"jersy": "jersy",
			"mtch": "mtch",
			"path": "path",
			"persy": "persy",
			"raze": "raze",
			"truly": "truly",
			"unqr": "unqr"
		}
	@end-include
*/

const depher = require( "depher" );
const detr = require( "detr" );
const fs = require( "fs-extra" );
const fype = require( "fype" );
const glob = require( "glob" );
const kept = require( "kept" );
const jersy = require( "jersy" );
const mtch = require( "mtch" );
const path = require( "path" );
const persy = require( "persy" );
const raze = require( "raze" );
const truly = require( "truly" );
const unqr = require( "unqr" );

const FILE_MODULE_PATTERN = /([a-zA-Z0-9\-\_]+?)\.(?:deploy|support|module)\.js$/;

const rsetmod = function rsetmod( directory, option ){
	/*;
		@meta-configuration:
			{
				"directory": "string",
				"option": "object"
			}
		@end-meta-configuration
	*/

	let parameter = raze( arguments );

	directory = depher( parameter, STRING, process.cwd( ) );

	option = detr( parameter, {
		"clear": false
	} );

	if( !fype( directory, DIRECTORY, true ) ){
		throw new Error( "invalid directory" );
	}

	try{
		let nodeModulePath = path.resolve( directory, "node_modules" );
		kept( nodeModulePath, true ) && fs.removeSync( nodeModulePath );

		let bowerComponentPath = path.resolve( directory, "bower_components" );
		kept( bowerComponentPath, true ) && fs.removeSync( bowerComponentPath );

		let yarnPath = path.resolve( directory, "yarn.lock" );
		kept( yarnPath, true ) && fs.unlinkSync( yarnPath );

		let packageLockPath = path.resolve( directory, "package-lock.json" );
		kept( packageLockPath, true ) && fs.unlinkSync( packageLockPath );

		let npmshrinkwrapPath = path.resolve( directory, "npmshrinkwrap.json" );
		kept( npmshrinkwrapPath, true ) && fs.unlinkSync( npmshrinkwrapPath );

	}catch( error ){
		throw new Error( `cannot clean installed files, ${ error.stack }` );
	}

	if( !option.clear ){
		try{
			let unique = unqr.bind( [ ] );

			glob.sync( path.resolve( directory, "*.deploy.*" ) )
				.concat( glob.sync( path.resolve( directory, "*.support.*" ) ) )
				.concat( glob.sync( path.resolve( directory, "*.module.js" ) ) )
				.concat( glob.sync( path.resolve( directory, "*.js" ) ) )
				.concat( glob.sync( path.resolve( directory, "*.jsx" ) ) )
				.map( ( file ) => mtch( file, FILE_MODULE_PATTERN, 1 ) )
				.filter( truly )
				.filter( ( name ) => unique( name ) )
				.forEach( ( name ) => {
					let deployPath = path.resolve( directory, `${ name }.deploy.js` );
					kept( deployPath, true ) && fs.unlinkSync( deployPath );

					let deployMapPath = path.resolve( directory, `${ name }.deploy.js.map` );
					kept( deployMapPath, true ) && fs.unlinkSync( deployMapPath );

					let supportPath = path.resolve( directory, `${ name }.support.js` );
					kept( supportPath, true ) && fs.unlinkSync( supportPath );

					let supportMapPath = path.resolve( directory, `${ name }.support.js.map` );
					kept( supportMapPath, true ) && fs.unlinkSync( supportMapPath );

					let modulePath = path.resolve( directory, `${ name }.js` );
					kept( path.resolve( directory, `${ name }.module.js` ), true ) &&
					kept( modulePath, true ) && fs.unlinkSync( modulePath );

					let moduleMapPath = path.resolve( directory, `${ name }.js.map` );
					kept( moduleMapPath, true ) && fs.unlinkSync( moduleMapPath );

					let jsxPath = path.resolve( directory, `${ name }.jsx` );

					let jsPath = path.resolve( directory, `${ name }.js` );
					kept( jsxPath, true ) && kept( jsPath, true ) && fs.unlinkSync( jsPath );

					let jsMapPath = path.resolve( directory, `${ name }.js.map` );
					kept( jsxPath, true ) && kept( jsMapPath, true ) && fs.unlinkSync( jsMapPath );

					let deployHTMLPath = path.resolve( directory, `${ name }.deploy.html` );
					kept( deployHTMLPath, true ) && fs.unlinkSync( deployHTMLPath );

					let supportHTMLPath = path.resolve( directory, `${ name }.support.html` );
					kept( supportHTMLPath, true ) && fs.unlinkSync( supportHTMLPath );

					let deployCSSPath = path.resolve( directory, `${ name }.deploy.css` );
					kept( deployCSSPath, true ) && fs.unlinkSync( deployCSSPath );

					let supportCSSPath = path.resolve( directory, `${ name }.support.css` );
					kept( supportCSSPath, true ) && fs.unlinkSync( supportCSSPath );
				} );

		}catch( error ){
			throw new Error( `cannot clean generated module files, ${ error.stack }` );
		}
	}

	let packagePath = path.resolve( directory, "package.json" );
	if( kept( packagePath, true ) ){
		try{
			let packageData = JSON.parse( jersy( packagePath, true ) );

			delete packageData.devDependencies;
			delete packageData.dependencies;

			persy( packagePath, packageData, true );

		}catch( error ){
			throw new Error( `cannot clean package.json, ${ error.stack }` );
		}
	}

	let bowerPath = path.resolve( directory, "bower.json" );
	if( kept( bowerPath, true ) ){
		try{
			let bowerData = JSON.parse( jersy( bowerPath, true ) );

			delete bowerData.resolutions;
			delete bowerData.dependencies;

			persy( bowerPath, bowerData, true );

		}catch( error ){
			throw new Error( `cannot clean bower.json, ${ error.stack }` );
		}
	}

	return true;
};

module.exports = rsetmod;
