var _ = require( 'lodash' );

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

        _.zipWith( keys, vals, function( k, v ) { return { key: k, value: v } } ).forEach( function( item ) {
            this.storage.setUser( item.key, item.value );
        }.bind( this ) );
        this.complete( { success: true } );
    }
};
