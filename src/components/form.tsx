import React, { ChangeEvent, useCallback, useState } from "react";

import FormDataType from "../types/FormDataType";
import { Button } from "./button";
import styles from "./form.module.css";

type inputEventType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type IFormProps = {
  onSubmit: (payload: FormDataType) => void;
};

const initialData: FormDataType = {
  title: "",
  description: "",
  price: "",
};

export const Form: React.FC<IFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormDataType>(initialData);

  const onChange = useCallback((e: inputEventType) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    },
    [formData, setFormData]
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.title) {
      alert("Your product needs a title");
      return;
    }

    if (!formData.description) {
      alert("Your product needs some content");
      return;
    }

    onSubmit(formData);
    setFormData(initialData);
  };

  return (
    <form 
      className={styles.form} onSubmit={(event) => handleSubmit(event)}>
      <span className={styles.label}>Product title: *</span>

      <input
        data-testid="titleInput"
        placeholder="Title..."
        value={formData.title}
        name={"title"}
        onChange={onChange}
        className={styles.input}
      />

      <span className={styles.label}>Product details: *</span>

      <input
        data-testid="priceInput"
        placeholder="Price..."
        type="number"
        value={formData.price}
        name="price"
        onChange={onChange}
        className={styles.input}
      />

      <textarea
        data-testid="descriptionInput"
        placeholder="Start typing product description here..."
        value={formData.description}
        name="description"
        onChange={onChange}
        className={styles.textarea}
      />

      <Button testId="submitProduct">Add a product</Button>
    </form>
  );
};
