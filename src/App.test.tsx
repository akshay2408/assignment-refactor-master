import React from "react";
import { render, waitFor } from "@testing-library/react";

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


});
