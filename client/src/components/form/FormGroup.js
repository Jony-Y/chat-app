import React from 'react';
import FormTextHelper from "./FormTextHelper";

const FormGroup = ({children, className}) => (
    <div className={`form-group flexbox-fill flex-column ${className}`}>
        {children}
        <FormTextHelper/>
    </div>
);

export default FormGroup;