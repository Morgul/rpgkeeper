// ---------------------------------------------------------------------------------------------------------------------
// supplement.js
// ---------------------------------------------------------------------------------------------------------------------

// This is a partial of additional properties to add to supplements.
const supplementPartial = {
    owner: { type: [ 'string', 'integer', 'null' ] },
    scope: { type: 'string', enum: [ 'public', 'user' ] },
    official: { type: 'boolean' }
};

// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
    supplementPartial
};

// ---------------------------------------------------------------------------------------------------------------------
