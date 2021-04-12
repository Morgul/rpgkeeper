//----------------------------------------------------------------------------------------------------------------------
// NonReactiveUtil - Allows you to mark an object as 'non-reactive', i.e. Vue will ignore it.
//----------------------------------------------------------------------------------------------------------------------

/**
 * Mark an existing property non-configurable. (Vue ignores these entirely.)
 *
 * @param obj - The obj on which we are defining the property.
 * @param propName - The name of the property
 */
export function markNonConfigurable(obj : unknown, propName : string) : void
{
    const propertyDesc = Object.getOwnPropertyDescriptor(obj, propName);

    if(propertyDesc && propertyDesc.configurable)
    {
        propertyDesc.configurable = false;
        Object.defineProperty(obj, propName, propertyDesc);
    } // end if
} // end markNonConfigurable

//----------------------------------------------------------------------------------------------------------------------

export default { markNonConfigurable };

//----------------------------------------------------------------------------------------------------------------------
