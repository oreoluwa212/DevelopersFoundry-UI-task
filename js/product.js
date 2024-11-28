class Product {
    constructor({ 
      id, 
      title, 
      description, 
      price, 
      category, 
      image, 
      rating 
    }) {
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
    constructor() {
      this.baseUrl = "https://fakestoreapi.com/products";
    }
  
    async getProducts() {
      try {
        const response = await fetch(this.baseUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.map(productData => new Product(productData));
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    }
  
    async getProductById(id) {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const productData = await response.json();
        return new Product(productData);
      } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
      }
    }
  }
  
  export { Product, ProductService };