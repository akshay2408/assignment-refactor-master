import FormDataType from "../types/FormDataType";
import { ProductType } from "../types/ProductType";

export const BASE_URL = "https://fakestoreapi.com/";

export const postPayload = (payload: FormDataType, callback: () => void) => {
  fetch(`${BASE_URL}products`, {
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(() =>
      setTimeout(() => {
        callback();
      }, 2000)
    );
};

export const fetchProduct = (callback: (products: ProductType[]) => void) => {
  fetch(`${BASE_URL}products`)
    .then((response) => response.json())
    .then((products) => callback(products));
};
