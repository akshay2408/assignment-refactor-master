import React from "react";
import ReactModal from "react-modal";
import { render, waitFor, fireEvent } from "@testing-library/react";

import App from "./App";

describe("App Testing", () => {

  it("is getting products", async () => {
    const { getByTestId, getAllByTestId } = render(<App />);

    const numberOfFavourites = getByTestId("numberOfFavourites");
    const totalProducts = getByTestId("totalProducts");
    expect(numberOfFavourites.textContent).toBe("0");
    await waitFor(async () => expect(await getAllByTestId('product')[0]).toBeInTheDocument())
    expect(totalProducts.textContent).toBe("5");

  });

  it('is adding & removing from favourite', async () => {
    let { getByTestId, getAllByTestId, getAllByText } = render(<App />);

    const numberOfFavourites = getByTestId("numberOfFavourites");
    expect(numberOfFavourites.textContent).toBe("0");
    await waitFor(async () => expect(await getAllByTestId('product')[0]).toBeInTheDocument());

    const favouriteButton = await getAllByText('Add to favorites')[0];
    expect(favouriteButton).toBeInTheDocument();    
    favouriteButton.click();

    const removeFavourite = await getAllByText('Remove from favorites')[0];
    expect(numberOfFavourites.textContent).toBe("1");
    expect(removeFavourite).toBeInTheDocument();
    removeFavourite.click();

    expect(numberOfFavourites.textContent).toBe("0");

  });

  it("is adding product", async () => {
    const { container, getByTestId, getByText } = render(<App />);
    ReactModal.setAppElement(container);

    const addProductBtn = await getByTestId('addProductBtn');
    
    expect(addProductBtn).toBeInTheDocument();
    addProductBtn.click();
    waitFor(() =>  expect(getByTestId('addProductModal')).toBeInTheDocument());

    const titleInput = getByTestId('titleInput');
    const priceInput = getByTestId('priceInput');
    const descriptionInput = getByTestId('descriptionInput');
    const submitButton = getByTestId('submitProduct');

    expect(titleInput).toBeInTheDocument();
    fireEvent.change(titleInput, { target: { value: "Test Product" }});

    expect(priceInput).toBeInTheDocument();
    fireEvent.change(priceInput, { target: { value: "100" }});
    
    expect(descriptionInput).toBeInTheDocument();
    fireEvent.change(descriptionInput, { target: { value: "Description" }});

    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(getByText('Test Product')).toBeInTheDocument();
  });



});
