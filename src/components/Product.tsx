import React from "react";
import { FaStar } from "react-icons/fa";

import { ProductType } from "../types/ProductType";
import styles from "./product.module.css";

interface IProps {
  index: number;
  product: ProductType;
  onFav: (title: string) => void;
}

const Product: React.FC<IProps> = ({ product, onFav }) => {
  const {
    actionBar,
    productClass,
    productBody,
    actionBarItem,
    actionBarItemLabel,
    productTitle,
  } = styles;

  return (
    <span className={productClass}>
      <span className={productTitle}>{product.title}</span>
      <p>
        <strong>
          Rating: {product.rating ? `${product.rating.rate}/5` : ""}
        </strong>
      </p>
      <p>
        <b>Price: ${+product.price}</b>
      </p>
      <p className={productBody}>
        <span>
          <b>Description:</b>
        </span>
        <br />
        {product.description}
      </p>
      <span className={actionBar}>
        <span
          className={`${actionBarItem} ${product.isFavorite ? "active" : ""}`}
          role="button"
          onClick={() => onFav(product.title)}
        >
          <FaStar />
          <span className={actionBarItemLabel}>
            {product.isFavorite ? "Remove from favorites" : "Add to favorites"}
          </span>
        </span>
      </span>
    </span>
  );
};

export default Product;
