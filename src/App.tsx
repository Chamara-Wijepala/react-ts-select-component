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
  const [dataToRender, setDataToRender] = useState<
    Product[] | null | undefined
  >(data);
  const [categoryValues, setCategoryValues] = useState<SelectOption[]>([]);
  const [priceValues, setPriceValues] = useState<SelectOption[]>([]);

  function filterDataByCategory(data: Product[]) {
    return data.filter((product) => {
      return categoryValues.some(
        (category) => category.value === product.category
      );
    });
  }

  function sortDataById(data: Product[]) {
    return data.sort((product1, product2) => product1.id - product2.id);
  }

  function sortDataByPrice(data: Product[]) {
    return data.sort((product1, product2) =>
      priceValues[0].value === "Price Asc."
        ? product1.price - product2.price
        : product2.price - product1.price
    );
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => setData(data));
  }, []);

  useEffect(() => {
    setDataToRender(data);
  }, [data]);

  // handles data filtering
  useEffect(() => {
    if (categoryValues.length === 0 && data) {
      setDataToRender(data);

      if (priceValues.length > 0) {
        const dataToSort = [...data];
        const sortedData = sortDataByPrice(dataToSort);
        setDataToRender(sortedData);
      }
    }

    if (categoryValues.length > 0 && data) {
      const filteredData = filterDataByCategory(data);
      setDataToRender(filteredData);
    }
  }, [categoryValues]);

  // handles data sorting
  useEffect(() => {
    if (priceValues.length === 0 && dataToRender) {
      const dataToSort = [...dataToRender];
      const sortedData = sortDataById(dataToSort);
      setDataToRender(sortedData);
    }

    if (priceValues.length > 0 && dataToRender) {
      const dataToSort = [...dataToRender];
      const sortedData = sortDataByPrice(dataToSort);
      setDataToRender(sortedData);
    }
  }, [priceValues]);

  return (
    <>
      <header>
        <div className="container container-lg header-content">
          <h1>Custom Select Component</h1>

          <p>
            Built with <a href="https://fakestoreapi.com/">Fake Store API</a>
          </p>
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
              placeholder="Sort by price..."
              values={priceValues}
              onChange={(option) => setPriceValues(option)}
              options={priceOptions}
            />
          </div>

          <section className="product-list">
            {dataToRender?.map((product) => (
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
