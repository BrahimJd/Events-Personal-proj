import "./App.css";
import Navbar from "./Navbar";
import Events from "./events";

function homepage() {
  return (
    <div className="App">
      <Navbar />
      <section className="welcome-section" id="home">
        <h1>Welcome to Tunisia</h1>
        <p>Explore exciting events and attractions across the country.</p>
      </section>
      <Events />
      <section className="events" id="events">
        <h2>Events in Tunisia</h2>
        <p>Discover exciting events happening across Tunisia.</p>

        <div className="event-grid">
          <div className="event">
            <h3>Monastir</h3>
            <img src="/monastir.jpg" alt="Monastir Boat Festival" />
            <p>
              Description: The Monastir Boat Festival is an annual celebration
              of maritime culture, featuring boat parades, water sports
              competitions, seafood festivals, and live music performances.
            </p>
            <p>Location: Monastir, Monastir Governorate.</p>
            <p>Date: Typically held in the summer months.</p>
            <p>
              Activities: Boat parades, water skiing, jet skiing, snorkeling,
              seafood tastings, live concerts, and more.
            </p>
          </div>
          <div className="event">
            <h3>Sousse</h3>
            <img src="sousse.jpg" />
            <p>
              Description: The Sousse Beach Carnival is a lively event held on
              the sandy shores of Sousse, featuring beach games, sandcastle
              competitions, beach volleyball tournaments, and beachside
              concerts.
            </p>
            <p>Location: Sousse, Sousse Governorate.</p>
            <p>Date: Typically held in the summer months.</p>
            <p>
              Activities: Beach games, sandcastle building, beach volleyball,
              sunbathing, swimming, beach parties, and live music.
            </p>
          </div>
          <div className="event">
            <h3>Mahdia</h3>
            <img src="/mahdia.jpg" />
            <p>
              Description: The Mahdia Sea Festival celebrates the coastal
              heritage of Mahdia, with a focus on fishing traditions, seafood
              cuisine, boat races, and cultural performances.
            </p>
            <p>Location: Mahdia, Mahdia Governorate.</p>
            <p>Date: Typically held in the summer months.</p>
            <p>
              Activities: Fishing competitions, seafood tastings, boat races,
              traditional music and dance performances, and craft markets.
            </p>
          </div>

          <div className="event">
            <h3>Bizerte</h3>
            <img src="/bizerte.jpg" />
            <p>
              Description: The Bizerte Olive Festival celebrates the olive
              harvest season in the northern town of Bizerte, featuring olive
              picking tours, olive oil tastings, cooking demonstrations, and
              cultural exhibitions.
            </p>
            <p>Location: Bizerte, Bizerte Governorate.</p>
            <p>Date: Typically held in the autumn months.</p>
            <p>
              Activities: Olive picking tours, olive oil tastings, cooking
              demonstrations, traditional music and dance performances, and
              olive-related crafts.
            </p>
          </div>
          <div className="event">
            <h3>Hammamet</h3>
            <img src="hammamet.jpg" alt="Hammamet Event" />
            <p>
              Description: Hammamet, known as the &quot;Tunisian
              Saint-Tropez,&quot; is a charming coastal town famous for its
              beautiful beaches, historical sites, and vibrant arts scene.
              Visitors can explore the medina&apos;s narrow streets, relax on
              pristine white sands, and enjoy water sports such as windsurfing
              and sailing.
            </p>
            <p>Location: Hammamet, Nabeul Governorate.</p>
            <p>Date: Year-round destination.</p>
            <p>
              Activities: Sunbathing, swimming, water sports, exploring
              historical sites, visiting art galleries and museums, shopping in
              the medina, and enjoying local cuisine.
            </p>
          </div>
          <div className="event">
            <h3>Tozeur</h3>
            <img src="tozeur.jpg" alt="Tozeur Event" />
            <p>
              Description: Tozeur is an oasis city located in southwestern
              Tunisia, known for its stunning desert landscapes, palm groves,
              and traditional Berber culture. Visitors can explore the ancient
              medina, take a camel ride through the Sahara Desert, visit nearby
              Star Wars film locations, and experience the unique architecture
              of Tozeur&apos;s red brick buildings.
            </p>
            <p>Location: Tozeur, Tozeur Governorate.</p>
            <p>Date: Year-round destination, best visited in cooler months.</p>
            <p>
              Activities: Desert excursions, camel rides, exploring the medina,
              visiting museums and cultural sites, experiencing traditional
              Berber hospitality, and shopping for handicrafts.
            </p>
          </div>
        </div>
      </section>
      <footer className="footer" id="Contact">
        Agile.Project@example.com
      </footer>
    </div>
  );
}
export default homepage;
