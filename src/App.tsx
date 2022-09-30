function App() {
  return (
    <>
      <header>
        <div className="container container-lg">
          <h1>Custom Select Component</h1>
        </div>
      </header>

      <main>
        <div className="container container-md">
          <section className="product-list">
            <div className="product-card">
              <img
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                alt=""
              />

              <p className="name">
                Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
              </p>

              <p className="price">$109.95</p>

              <div className="rating">
                <span>3.9/5</span>

                <span>120 reviews</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
