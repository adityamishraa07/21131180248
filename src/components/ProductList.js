import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TextField, MenuItem, Button, Grid, Typography } from '@material-ui/core';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ company: '', category: '', minPrice: 0, maxPrice: 10000, rating: 0 });
    const [sort, setSort] = useState('price');
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [filters, sort, page]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://20.244.56.144/test/companies/${filters.company}/categories/${filters.category}/products`, {
                params: {
                    top: 10,
                    minPrice: filters.minPrice,
                    maxPrice: filters.maxPrice,
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Top Products
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <TextField
                        select
                        label="Company"
                        name="company"
                        value={filters.company}
                        onChange={handleFilterChange}
                        fullWidth
                    >
                        <MenuItem value="AMZ">AMZ</MenuItem>
                        <MenuItem value="FLP">FLP</MenuItem>
                        <MenuItem value="SNP">SNP</MenuItem>
                        <MenuItem value="MYN">MYN</MenuItem>
                        <MenuItem value="AZO">AZO</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        select
                        label="Category"
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        fullWidth
                    >
                        <MenuItem value="Phone">Phone</MenuItem>
                        <MenuItem value="Computer">Computer</MenuItem>
                        <MenuItem value="TV">TV</MenuItem>
                        <MenuItem value="Earphone">Earphone</MenuItem>
                        <MenuItem value="Tablet">Tablet</MenuItem>
                        <MenuItem value="Charger">Charger</MenuItem>
                        <MenuItem value="Mouse">Mouse</MenuItem>
                        <MenuItem value="Keypad">Keypad</MenuItem>
                        <MenuItem value="Bluetooth">Bluetooth</MenuItem>
                        <MenuItem value="Pendrive">Pendrive</MenuItem>
                        <MenuItem value="Remote">Remote</MenuItem>
                        <MenuItem value="Speaker">Speaker</MenuItem>
                        <MenuItem value="Headset">Headset</MenuItem>
                        <MenuItem value="Laptop">Laptop</MenuItem>
                        <MenuItem value="PC">PC</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Min Price"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        type="number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Max Price"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        type="number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Rating"
                        name="rating"
                        value={filters.rating}
                        onChange={handleFilterChange}
                        type="number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        select
                        label="Sort By"
                        value={sort}
                        onChange={handleSortChange}
                        fullWidth
                    >
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                        <MenuItem value="discount">Discount</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {products.map(product => (
                    <Grid item xs={12} md={4} key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <div>
                                <img src="https://via.placeholder.com/150" alt={product.name} />
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography>Company: {product.company}</Typography>
                                <Typography>Category: {product.category}</Typography>
                                <Typography>Price: ${product.price}</Typography>
                                <Typography>Rating: {product.rating}</Typography>
                                <Typography>Discount: {product.discount}%</Typography>
                                <Typography>Availability: {product.availability ? 'Available' : 'Out of Stock'}</Typography>
                            </div>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <div>
                <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</Button>
                <Button onClick={() => handlePageChange(page + 1)}>Next</Button>
            </div>
        </div>
    );
};

export default ProductList;
