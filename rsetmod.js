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
			"fs": "fs",
			"fype": "fype",
			"glob": "glob",
			"kept": "kept",
			"jersy": "jersy",
			"mtch": "mtch",
			"path": "path",
			"persy": "persy",
			"truly": "truly",
			"unqr": "unqr",
			"wichevr": "wichevr"
		}
	@end-include
*/

const fs = require( "fs" );
const fype = require( "fype" );
const glob = require( "glob" );
const kept = require( "kept" );
const jersy = require( "jersy" );
const mtch = require( "mtch" );
const path = require( "path" );
const persy = require( "persy" );
const truly = require( "truly" );
const unqr = require( "unqr" );
const wichevr = require( "wichevr" );

const FILE_MODULE_PATTERN = /([a-zA-Z0-9\-\_]+?)\.(?:deploy|support|module)\.js$/;

const rsetmod = function rsetmod( directory ){
	/*;
		@meta-configuration:
			{
				"directory": "string"
			}
		@end-meta-configuration
	*/

	directory = wichevr( directory, process.cwd( ) );

	if( typeof directory != "string" ){
		throw new Error( "invalid directory" );
	}

	if( !fype( directory, DIRECTORY, true ) ){
		throw new Error( "invalid directory" );
	}

	try{
		fs.unlinkSync( path.resolve( directory, "node_modules" ) );

		fs.unlinkSync( path.resolve( directory, "bower_components" ) );

		fs.unlinkSync( path.resolve( directory, "yarn.lock" ) );

		fs.unlinkSync( path.resolve( directory, "package-lock.json" ) );

		fs.unlinkSync( path.resolve( directory, "npmshrinkwrap.json" ) );

	}catch( error ){
		throw new Error( `cannot clean installed files, ${ error.stack }` );
	}

	try{
		let unique = unqr.bind( [ ] );

		glob.sync( path.resolve( directory, "*.deploy.js" ) )
			.concat( glob.sync( path.resolve( directory, "*.support.js" ) )
			.concat( glob.sync( path.resolve( directory, "*.module.js" ) )
			.map( ( file ) => mtch( file, FILE_MODULE_PATTERN, 1 ) )
			.filter( truly )
			.filter( ( name ) => unique( name ) )
			.forEach( ( name ) => {
				fs.unlinkSync( path.resolve( directory, `${ name }.deploy.js` ) );

				fs.unlinkSync( path.resolve( directory, `${ name }.support.js` ) );

				if( kept( path.resolve( directory, `${ name }.module.js` ), true ) ){
					fs.unlinkSync( path.resolve( directory, `${ name }.js` ) );
				}
			} );

	}catch( error ){
		throw new Error( `cannot clean generated module files, ${ error.stack }` );
	}

	try{
		let packagePath = path.resolve( directory, "package.json" );
		let packageData = JSON.parse( jersy( packagePath, true ) );

		delete packageData.devDependencies;
		delete packageData.dependencies;

		persy( packagePath, packageData, true );

	}catch( error ){
		throw new Error( `cannot clean package.json, ${ error.stack }` );
	}

	try{
		let bowerPath = path.resolve( directory, "bower.json" );
		let bowerData = JSON.parse( jersy( bowerPath, true ) );

		delete bowerData.resolutions;
		delete bowerData.dependencies;

		persy( bowerPath, bowerData, true );

	}catch( error ){
		throw new Error( `cannot clean bower.json, ${ error.stack }` );
	}

	return true;
};

module.exports = rsetmod;
