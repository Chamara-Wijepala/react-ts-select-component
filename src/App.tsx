import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function App() {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => setData(data));
  }, []);

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
            {data?.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt="" />

                <div className="product-info">
                  <p className="name">{product.title}</p>

                  <p className="price">${product.price}</p>

                  <div className="rating">
                    <span>{product.rating.rate}/5</span>

                    <span>{product.rating.count} reviews</span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
