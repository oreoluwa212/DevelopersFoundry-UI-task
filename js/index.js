class ProductService {
    async #fetchData(endpoint, method = "GET", body) {
      const fetchOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      };
      const response = await fetch(
        `${"https://fakestoreapi.com/products"}/${endpoint}`,
        fetchOptions
      );
      return await response.json();
    }
   
    getProducts() {
      return this.#fetchData("");
    }
   
    getProductById(id) {
      return this.#fetchData(id);
    }
   
    deleteProduct(id) {
      return this.#fetchData(id, "DELETE");
    }
  }
   
  class Product {
    constructor({ id, title, price, description, category, image, rating }) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.description = description;
      this.category = category;
      this.image = image;
      this.rating = rating;
    }
  }
   
  const productService = new ProductService();
   
  productService.getProductById(5).then((product) => console.log(product));
  productService.getProducts().then((products) => console.log(products));
   
  const product = new Product({
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  });
   
  console.log(product);