require( 'jest-fetch-mock' ).enableMocks();

process.env.JSON_CONFIG_ID = 1
process.env.JSON_CONFIG_API_KEY = 1

// Adds a DOMException polyfill
//
// The polyfill is necessary to use AbortController in node v16 by our tests.
// AbortController itself is used when calling fetchMock.mockAbortOnce().
if ( !globalThis.DOMException ) {
  require( 'node-domexception' );
}