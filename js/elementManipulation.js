import { ProductService } from "./product.js";

class DOMManager {
  static createEventCard({ id, image, title, date, description }) {
    const card = document.createElement("div");
    card.className = "event_card";

    const img = document.createElement("img");
    img.src = image;
    img.alt = title;
    card.appendChild(img);

    const content = document.createElement("div");
    content.className = "event_content";

    const eventTitle = document.createElement("p");
    eventTitle.className = "event_title";
    eventTitle.textContent = title;
    content.appendChild(eventTitle);

    const eventDate = document.createElement("p");
    eventDate.className = "event_date";
    eventDate.innerHTML = `${date} <span class="dot">•</span> 6pm`;
    content.appendChild(eventDate);

    const eventDescription = document.createElement("p");
    eventDescription.textContent = description;
    content.appendChild(eventDescription);

    const button = document.createElement("button");
    button.innerHTML = `View details <i class="bi bi-arrow-up-right"></i>`;
    button.addEventListener("click", () => {
      window.location.href = `html/productdets.html?id=${id}`;
    });
    content.appendChild(button);

    card.appendChild(content);
    return card;
  }
  static renderCards(container, cardsData) {
    console.log("container:", container);
    cardsData.forEach((cardData) => {
      const card = DOMManager.createEventCard(cardData);
      container.appendChild(card);
    });
  }
}

(async () => {
  const eventsContainer = document.getElementById("eventId");
  const productService = new ProductService();
  const products = await productService.getProducts();

  const productsData = products.map((product) => ({
    image: product.image,
    title: product.title,
    date: "Available Now",
    description: product.description,
  }));

  DOMManager.renderCards(eventsContainer, productsData);
})();
