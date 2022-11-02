import React, { useCallback, useEffect, useMemo, useState } from "react";
import lodash from "lodash";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

import { Button } from "./components/button";
import { Form } from "./components/form";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./App.module.css";
import { ProductType } from "./types/ProductType";
import Product from "./components/Product";

interface IFormData {
  title: string;
  description: string;
  price: string;
}

const App: React.FC<{}> = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    document.title = "Droppe refactor app";

    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((products) => setProducts(products));
  }, []);

  const favClick = useCallback(
    (title: string) => {
      const productClone = [...products];
      const idx = lodash.findIndex(productClone, { title });

      if (productClone[idx].isFavorite) {
        productClone[idx].isFavorite = false;
      } else {
        productClone[idx].isFavorite = true;
      }

      setProducts(productClone);
    },
    [products]
  );

  const numberOfFavourites = useCallback(
    () => products.filter((product) => product.isFavorite).length,
    [products]
  );

  const productsStates = useMemo(() => {
    return `Total products: ${products.length}
    - Number of favorites: ${numberOfFavourites()}`;
  }, [products, numberOfFavourites]);

  const onSubmit = (payload: IFormData) => {
    const updated = lodash.clone(products);
    updated.unshift({
      title: payload.title,
      description: payload.description,
      price: Number(payload.price),
      isFavorite: false,
      rating: {
        rate: 0,
        count: 0,
      },
    });

    setProducts(updated);
    setOpen(false);
    setIsShowingMessage(true);
    setMessage("Adding Product...");

    postPayload(payload);
  };

  const postPayload = (payload: IFormData) => {
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        setTimeout(() => {
          setIsShowingMessage(false);
          setMessage("");
        }, 2000);
      });
  };

  const renderProducts = useMemo(() => {
    if (products && products.length) {
      return products.map((product, index) => (
        <Product key={index} index={index} product={product} onFav={favClick} />
      ));
    } else {
      return <></>;
    }
  }, [products, favClick]);

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={styles.headerImageWrapper}>
          <img alt="logo" src={logo} className={styles.headerImage} />
        </div>
      </div>
      <span className={styles.bannerImageWrapper}>
        <img alt="banner" src={img1} className={styles.bannerImage} />
        <img alt="banner" src={img2} className={styles.bannerImage} />
      </span>

      <div className={styles.listWrapper}>
        <div className={styles.buttonWrapper}>
          <span role="button">
            <Button onClick={() => setOpen(true)}>Send product proposal</Button>
          </span>
          {isShowingMessage && (
            <div className={styles.messageContainer}>
              <i>{message}</i>
            </div>
          )}
        </div>

        <div className={styles.statsContainer}>
          <span>{productsStates}</span>
        </div>
        {renderProducts}
      </div>
      <Modal
        isOpen={isOpen}
        className={styles.reactModalContent}
        overlayClassName={styles.reactModalOverlay}
      >
        <div className={styles.modalContentHelper}>
          <div className={styles.modalClose} onClick={() => setOpen(false)}>
            <FaTimes />
          </div>
          <Form on-submit={onSubmit} />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default App;
