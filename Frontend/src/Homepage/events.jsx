import { useState } from "react";
import "./App.css";

function Events() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="home-page">
      <section className="Card" id="Cards">
        <div
          className={`circle-card ${hoveredCard === "Zarzis" ? "hovered" : ""}`}
          onMouseEnter={() => setHoveredCard("Zarzis")}
          onMouseLeave={() => setHoveredCard(null)}
          data-country="Zarzis"
        >
          <img src="zarzis.jpg" alt="Zarzis" className="card-image" />
          {hoveredCard === "Zarzis" && <div className="image-name">Zarzis</div>}
        </div>
        <div
          className={`circle-card ${
            hoveredCard === "Kairouan" ? "hovered" : ""
          }`}
          onMouseEnter={() => setHoveredCard("Kairouan")}
          onMouseLeave={() => setHoveredCard(null)}
          data-country="Kairouan"
        >
          <img src="kairouan.jpg" alt="Kairouan" className="card-image" />
          {hoveredCard === "Kairouan" && (
            <div className="image-name">Kairouan</div>
          )}
        </div>
        <div
          className={`circle-card ${hoveredCard === "Djerba" ? "hovered" : ""}`}
          onMouseEnter={() => setHoveredCard("Djerba")}
          onMouseLeave={() => setHoveredCard(null)}
          data-country="Djerba"
        >
          <img src="djerba.webp" alt="Djerba" className="card-image" />
          {hoveredCard === "Djerba" && <div className="image-name">Djerba</div>}
        </div>
      </section>
    </div>
  );
}

export default Events;
