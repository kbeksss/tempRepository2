import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Button} from "reactstrap";
import {fetchProducts} from "../../store/actions/productsActions";
import {Link} from "react-router-dom";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import ShowTo from "../../hoc/ShowTo";

class Products extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }
    render() {
        return (
            <Fragment>
                <h2>
                    Products
                    <ShowTo role='admin'>
                        <Button
                            tag={Link}
                            to='/products/new'
                            color="primary"
                            className="float-right"
                        >
                            Add product
                        </Button>
                    </ShowTo>
                </h2>
                {this.props.products.map(product => (
                    <ProductListItem
                        key={product._id}
                        title={product.title}
                        id={product._id}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    products: state.products.products,
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapStateToProps,mapDispatchToProps)(Products);
