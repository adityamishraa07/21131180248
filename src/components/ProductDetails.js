import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            // You would need to implement an endpoint to get a product by ID or filter from the list.
            const response = await axios.get(`http://20.244.56.144/test/product/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <img src="https://via.placeholder.com/150" alt={product.name} />
            <Typography variant="h4">{product.name}</Typography>
            <Typography>Company: {product.company}</Typography>
            <Typography>Category: {product.category}</Typography>
            <Typography>Price: ${product.price}</Typography>
            <Typography>Rating: {product.rating}</Typography>
            <Typography>Discount: {product.discount}%</Typography>
            <Typography>Availability: {product.availability ? 'Available' : 'Out of Stock'}</Typography>
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
                Back
            </Button>
        </div>
    );
};

export default ProductDetails;
