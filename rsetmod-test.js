
const assert = require( "assert" );
const rsetmod = require( "./rsetmod.js" );

assert.ok( rsetmod( __dirname, { "clear": true } ) );

console.log( "ok" );
