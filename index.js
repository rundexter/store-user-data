var _ = require( 'lodash' );
var q = require( 'q' );

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var keys = step.input( 'key' ).toArray();
        var vals = step.input( 'value' ).toArray();

        var self = this;

        var writes = [ ];
        _.zipWith( keys, vals, function( k, v ) { return { key: k, val: v } } )
            .forEach( function( item ) {
                writes.push( self.storage.setUser( item.key, item.val ) )
            } );

        q.all( writes )
            .then( function( ) { return self.complete() } )
            .fail( function( err ) { return self.fail( err )  } );

    }
};
