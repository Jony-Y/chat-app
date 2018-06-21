import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './form.css';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {isValidated: false};
    }


    /**
     * Them main function that validates the form and fills in the error messages.
     * @returns bool Returns a boolean showing if the form is valid for submission or not.
     **/
    validate = () => {
        const formEl = this.formEl;
        for (let elem of formEl.elements) {
            const errorLabel = elem.parentNode.querySelector(".form-text-helper");
            if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
                errorLabel.textContent = !elem.validity.valid?elem.validationMessage:"";
            }
        }
        return formEl.checkValidity()
    };

    /**
     * This is the method that is called on form submit.
     * It stops the default form submission process and proceeds with custom validation.
     **/
    submitHandler = event => {
        event.preventDefault();
        if (this.validate()) {
            this.props.onSubmit();
        }
        this.setState({ isValidated: true, isValid:true });
    };

    render() {
        const {className, children, ...rest} = this.props;
        const {isValidated} = this.state;
        return (
            <form {...rest} className={`form ${className} ${isValidated?'form-validated':""}`}
                  ref={form => (this.formEl = form)} noValidate onSubmit={this.submitHandler}>
                {children}
            </form>
        );
    }
}

Form.propTypes = {
  className:PropTypes.string,
  children:PropTypes.node.isRequired,
  onSubmit:PropTypes.func.isRequired
};


export default Form;