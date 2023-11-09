import React from 'react';

function FormikStepWithValues({children, formValues}) {
    return (
        <>
            {children({formValues})}
        </>
    )
}

export default FormikStepWithValues;