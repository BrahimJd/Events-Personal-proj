import "./App.css";

function events() {
  return (
    <div className="home-page">
      <section className="Card" id="Cards">
        <div className="circle-card" data-country="Zarzis">
          <img src="zarzis.jpg" alt="Zarzis" className="card-image" />
        </div>
        <div className="circle-card" data-country="Kairouan">
          <img src="kairouan.jpg" alt="Kairouan" className="card-image" />
        </div>
        <div className="circle-card" data-country="Djerba">
          <img src="djerba.webp" alt="Djerba" className="card-image" />
        </div>
      </section>
    </div>
  );
}
export default events;
