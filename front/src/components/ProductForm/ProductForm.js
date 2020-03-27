import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {Editor} from 'react-draft-wysiwyg';
import FormElement from "../UI/Form/FormElement";

class ProductForm extends Component {
    state = {
        category: '',
        title: '',
        price: '',
        image: '',
        description: null,
    };
    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            let value = this.state[key];
            if(key === 'description'){
                value = JSON.stringify(value);
            }
            formData.append(key, value);
        });
        this.props.onSubmit(formData);
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };
    editorChangeHandler = description => {
        this.setState({description});
    };
    render() {
        const categoriesOptions = this.props.categories.map(c => ({title: c.title, id: c._id}));
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormElement
                    propertyName='category'
                    required
                    type='select'
                    title='Category'
                    onChange={this.inputChangeHandler}
                    options={categoriesOptions}
                    value={this.state.category}
                />
                <FormElement
                    propertyName='title'
                    required
                    type='text'
                    title='Title'
                    onChange={this.inputChangeHandler}
                    value={this.state.title}
                />
                <FormElement
                    propertyName='price' min={0}
                    required
                    type='number'
                    title='Price'
                    onChange={this.inputChangeHandler}
                    value={this.state.price}
                />
                <FormGroup row>
                    <Label sm={2} for="description">Description</Label>
                    <Col sm={10}>
                        <Editor
                            contentState={null}
                            onContentStateChange={this.editorChangeHandler}
                        />
                    </Col>
                </FormGroup>
                <FormElement
                    propertyName='image' min={0}
                    required
                    type='file'
                    title='Image'
                    onChange={this.fileChangeHandler}
                />
                <FormGroup row>
                    <Col sm={{offset:2, size: 10}}>
                        <Button type="submit" color="primary">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default ProductForm;
