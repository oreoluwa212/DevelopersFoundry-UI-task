import { ProductService } from "./product";

class ProductDetailsManager {
  constructor() {
    this.productService = new ProductService();
  }

  async init() {
    try {
      // Get product ID from URL
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");

      // Check if product ID is valid
      if (!productId || productId === "undefined") {
        throw new Error("No valid product ID provided in the URL.");
      }

      console.log("Fetching product with ID:", productId);

      // Fetch product details
      const product = await this.productService.getProductById(productId);

      // Log the product details for debugging
      console.log("Product details:", product);

      // Populate page with product details
      this.renderProductDetails(product);
    } catch (error) {
      console.error("Error loading product details:", error);

      // Display error message to user
      const errorContainer = document.getElementById("error-container");
      if (errorContainer) {
        errorContainer.textContent =
          "Failed to load product details. Please check the URL or try again later.";
        errorContainer.style.display = "block";
      }
    }
  }

  renderProductDetails(product) {
    const elements = {
      title: document.getElementById("product-title"),
      description: document.getElementById("product-description"),
      price: document.getElementById("product-price"),
      image: document.getElementById("product-image"),
      category: document.getElementById("product-category"),
      rating: document.getElementById("product-rating"),
    };

    // Safely update elements
    if (elements.title) elements.title.textContent = product.title;
    if (elements.description)
      elements.description.textContent = product.description;
    if (elements.price)
      elements.price.textContent = `$${product.price.toFixed(2)}`;
    if (elements.image) elements.image.src = product.image;
    if (elements.category) elements.category.textContent = product.category;
    if (elements.rating)
      elements.rating.textContent = `Rating: ${product.rating.rate} (${product.rating.count} reviews)`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const manager = new ProductidManager();
  manager.init();
});
