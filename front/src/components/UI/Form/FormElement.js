import React from 'react';
import {Col, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import PropTypes from 'prop-types';

const FormElement = props => {
    let inputChildren = undefined;
    if(props.type === 'select'){
        const options = [
            {id: '', title: 'Please select ' + props.title},
            ...props.options
        ];
        inputChildren = options.map(o => (
          <option key={o.id} value={o.id}>
              {o.title}
          </option>
        ))
    }
    return (
        <FormGroup>
            <Label sm={2} for={props.propertyName}>{props.title}</Label>
            <Col sm={10}>
                <Input
                    invalid={!!props.error}
                    type={props.type} id={props.propertyName}
                    name={props.propertyName}
                    value={props.value}
                    onChange={props.onChange}
                    required={props.required}
                    autoComplete={props.autoComplete}
                    placeholder={props.placeholder}
                    children={inputChildren}
                />
                <FormFeedback>{props.error}</FormFeedback>
            </Col>
        </FormGroup>
    );
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    autoComplete: PropTypes.string,
};

export default FormElement;
