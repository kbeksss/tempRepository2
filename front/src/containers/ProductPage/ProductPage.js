import React, {Component} from 'react';
import {fetchProduct} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {convertFromRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';

class ProductPage extends Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
    }
    getDescription = () => {
        try{
            const description = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.product.description)));
            return <Editor readOnly toolbarHidden editorState={ description}/>
        } catch(e){
            return 'no description available'
        }
    };
    render() {
        if(!this.props.product) return null;
        return (
            <div>
                <h1>{this.props.product.title}</h1>
                {this.getDescription()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    product: state.products.product
});
const mapDispatchToProps = dispatch => ({
    fetchProduct: id => dispatch(fetchProduct(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(ProductPage);
