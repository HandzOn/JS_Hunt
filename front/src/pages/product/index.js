import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import './styles.css';

const Product = ({match: {params}}) => {

  const [product, setProduct] = useState({});

  useEffect(() => {
    const {id} = params;
    loadProduct(id);
  }, [params]);

  const loadProduct = async (productID) => {
    const response = await api.get(`/products/${productID}`);
    setProduct(response.data);
  };

  return (
    <div className="product-info">
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>
        URL: <a href={product.url}>{product.url}</a>
      </p>
    </div>
  )
};

export default Product;