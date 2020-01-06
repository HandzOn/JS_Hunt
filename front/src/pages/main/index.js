import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import './styles.css';

const Main = () => {

  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (page = 1) => {
    const {data} = await api.get(`/products?page=${page}`);
    const {docs, ...apiProductInfo} = data;
    setProducts(docs);
    setProductInfo(apiProductInfo);
    setPage(page);
  };

  const prevPage = () => {
    if (page === 1) return;
    const pageNumber = page - 1;
    loadProducts(pageNumber);
  };

  const nextPage = () => {
    if (page === productInfo.totalPages) return;
    const pageNumber = page + 1;
    loadProducts(pageNumber);
  };

  return (
    <>
      <div className="product-list">
        {
          products.map(product => (
            <article key={product._id}>
              <strong>{product.title}</strong>
              <p>{product.description}</p>
              <a href="#">Acessar</a>
            </article>
          ))
        }
        <div className="actions">
          <button disabled={page === 1} onClick={prevPage}>Anterior</button>
          <button disabled={page === productInfo.totalPages} onClick={nextPage}>Próximo</button>
        </div>
      </div>
    </>
  );
};

export default Main;