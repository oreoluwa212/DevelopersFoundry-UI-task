import { ProductService } from "./product.js";

class DOMManager {
  static createEventCard({ id, image, title, date, description }) {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4"; // Bootstrap responsive column

    const card = document.createElement("div");
    card.className = "event_card card h-100 shadow-sm";

    const img = document.createElement("img");
    img.src = image;
    img.alt = title;
    img.className = "card-img-top";
    card.appendChild(img);

    const content = document.createElement("div");
    content.className = "event_content card-body";

    const eventTitle = document.createElement("h5");
    eventTitle.className = "event_title card-title";
    eventTitle.textContent = title;
    content.appendChild(eventTitle);

    const eventDate = document.createElement("p");
    eventDate.className = "event_date card-text text-muted";
    eventDate.innerHTML = `${date} <span class="dot">•</span> 6pm`;
    content.appendChild(eventDate);

    const eventDescription = document.createElement("p");
    eventDescription.className = "card-text";
    eventDescription.textContent =
      description.length > 100
        ? description.substring(0, 100) + "..."
        : description;
    content.appendChild(eventDescription);

    const button = document.createElement("a");
    button.href = `html/productdets.html?id=${id}`;
    button.className = "btn btn-primary";
    button.innerHTML = `View details <i class="bi bi-arrow-up-right"></i>`;
    content.appendChild(button);

    card.appendChild(content);
    col.appendChild(card);

    return col;
  }

  static renderCards(container, cardsData) {
    container.innerHTML = ""; // Clear existing content
    cardsData.forEach((cardData) => {
      const card = DOMManager.createEventCard(cardData);
      container.appendChild(card);
    });
  }
}

(async () => {
  const eventsContainer = document.getElementById("eventId");
  const productService = new ProductService();

  try {
    const products = await productService.getProducts();

    const productsData = products.map((product) => ({
      id: product.id,
      image: product.image,
      title: product.title,
      date: "Available Now",
      description: product.description,
    }));

    DOMManager.renderCards(eventsContainer, productsData);
  } catch (error) {
    console.error("Error loading products:", error);
    eventsContainer.innerHTML = `
      <div class="col-12 text-center">
        <p class="alert alert-danger">Failed to load products. Please try again later.</p>
      </div>
    `;
  }
})();
