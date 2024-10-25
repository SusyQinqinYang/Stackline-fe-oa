import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrProduct } from '../redux/productSlice';
import './product-overview.css';

export default function ProductDetails(props) {
  const currentProduct = useSelector(selectCurrProduct);

  return (
    <div className={`${props.className} product-details-wrapper`}>
      <div className="product-info">
        <img className="product-image" src={currentProduct.image} alt={currentProduct.title} />
        <p className="product-name">{currentProduct.title}</p>
        <p className="product-description">{currentProduct.subtitle}</p>
      </div>
      <div className="product-labels">
        {currentProduct.tags && currentProduct.tags.map((label, idx) =>
          <span className="product-label" key={idx}>{label}</span>
        )}
      </div>  
    </div>  
  );
}
