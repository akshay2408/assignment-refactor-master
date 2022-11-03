import React, { useCallback, useEffect, useMemo, useState } from "react";
import lodash from "lodash";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

import { Button } from "./components/button";
import { Form } from "./components/form";
import styles from "./App.module.css";
import { ProductType } from "./types/ProductType";
import Product from "./components/Product";
import FormDataType from "./types/FormDataType";
import { fetchProduct, postPayload } from "./Api/Api";
import { defaultProduct } from "./utils/Helper";

const App: React.FC<{}> = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    document.title = "Droppe refactor app";
    
    fetchProduct((data) => setProducts(data));
  }, []);

  const onClickfavourite = useCallback(
    (index: number) => {
      const productsClone = [...products];
      productsClone[index].isFavorite = !productsClone[index].isFavorite;
      setProducts(productsClone);
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

  const onSubmit = useCallback((payload: FormDataType) => {
    const updated = lodash.clone(products);

    updated.unshift({
      title: payload.title,
      description: payload.description,
      price: Number(payload.price),
      ...defaultProduct
    });

    setProducts(updated);
    setOpen(false);
    setIsShowingMessage(true);
    setMessage("Adding Product...");

    // Api with callback function
    postPayload(payload, () => {
      setIsShowingMessage(false);
      setMessage("");
    });
  }, [products]);

  const renderProducts = useMemo(() => {
    if (products && products.length) {
      return products.map((product, index) => (
        <Product
          key={index}
          index={index}
          product={product}
          onClickfavourite={onClickfavourite}
        />
      ));
    } else {
      return <></>;
    }
  }, [products, onClickfavourite]);

  const renderMessage = useMemo(
    () =>
      isShowingMessage && (
        <div className={styles.messageContainer}>
          <i>{message}</i>
        </div>
      ),
    [isShowingMessage, message]
  );

  const renderModal = useMemo(
    () => (
      <Modal
        isOpen={isOpen}
        className={styles.reactModalContent}
        overlayClassName={styles.reactModalOverlay}
      >
        <div className={styles.modalContentHelper}>
          <div className={styles.modalClose} onClick={() => setOpen(false)}>
            <FaTimes />
          </div>
          <Form onSubmit={onSubmit} />
        </div>
      </Modal>
    ),
    [isOpen, onSubmit]
  );

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={styles.headerImageWrapper}>
          <img alt="logo" src="images/droppe-logo.png" className={styles.headerImage} />
        </div>
      </div>
      <span className={styles.bannerImageWrapper}>
        <img alt="banner" src="images/img1.png" className={styles.bannerImage} />
        <img alt="banner" src="images/img2.png" className={styles.bannerImage} />
      </span>

      <div className={styles.listWrapper}>
        <div className={styles.buttonWrapper}>
          <span role="button">
            <Button onClick={() => setOpen(true)}>Send product proposal</Button>
          </span>
        </div>
        {renderMessage}
        <div className={styles.statsContainer}>
          <span>{productsStates}</span>
        </div>
        {renderProducts}
      </div>
        {renderModal}
    </React.Fragment>
  );
};

export default App;
