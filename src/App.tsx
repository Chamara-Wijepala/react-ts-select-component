import { useState, useEffect } from "react";

import Select from "./components/Select";

import { SelectOption } from "./components/Select";

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

const categoryOptions = [
  { value: "electronics", index: 0 },
  { value: "jewelery", index: 1 },
  { value: "men's clothing", index: 2 },
  { value: "women's clothing", index: 3 },
];

const priceOptions = [
  { value: "Price Asc.", index: 0 },
  { value: "Price Desc.", index: 1 },
];

function App() {
  const [data, setData] = useState<Product[] | null>(null);
  const [categoryValues, setCategoryValues] = useState<SelectOption[]>([]);
  const [priceValues, setPriceValues] = useState<SelectOption[]>([]);

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
          <div className="select-panel">
            <Select
              multiple
              placeholder="Filter by category..."
              values={categoryValues}
              onChange={(option) => setCategoryValues(option)}
              options={categoryOptions}
            />

            <Select
              multiple={false}
              placeholder="Sort by price..."
              values={priceValues}
              onChange={(option) => setPriceValues(option)}
              options={priceOptions}
            />
          </div>

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
