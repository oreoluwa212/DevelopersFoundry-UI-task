class Product {
  constructor({ id, title, description, price, category, image, rating }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.image = image;
    this.rating = rating;
  }
}

class ProductService {
  #fetchFromAPI = async ({ url, method = "GET", body = null }) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      return await response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  async getProducts() {
    const products = await this.#fetchFromAPI({ url: "" });
    return products.map((product) => new Product(product));
  }

  async getProductById(id) {
    const product = await this.#fetchFromAPI({ url: `${id}` });
    return new Product(product);
  }

  async deleteProductById(id) {
    const response = await this.#fetchFromAPI({
      url: `${id}`,
      method: "DELETE",
    });
    return response;
  }
}

export { Product, ProductService };
