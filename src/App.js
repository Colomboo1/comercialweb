import React, { useState, useEffect} from 'react';
import axios from "axios";
import Header from './components/header';
import SlideShow from './components/slide';
import ProductList from './components/productList';
import FilterList from './components/filterList';
import Footer from './components/footer';
import './App.scss';

const filtration = [];
const FiltrationContext = React.createContext(filtration)

function App() {
  const [slideItems, setSlideItems] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [filtrationItems, setFiltrationItems] = useState(filtration);
  useEffect(() => {
      axios.get('https://comercialweb.vercel.app/src/assets/json/body.json')
      .then(function (response) {
        setSlideItems(response.data.slides);
        setProductItems(response.data.products);
        setFilterItems(response.data.filters);
      })
      .catch(function (error) {
          console.log(error);
      });
  }, []);

  return (
    <FiltrationContext.Provider value={[filtrationItems, setFiltrationItems]} >
      <div className="app">
        <Header />
        <SlideShow items={slideItems} controller={true} autoplay={true} velocity="400" interval="5000" />  
        <h2 className='linea'><span>productos</span></h2>
        <div className="product-container">
          <FilterList items={filterItems} />
          <ProductList items={productItems}/>
        </div>
        <Footer />
      </div>
    </FiltrationContext.Provider>
  );
}

export default App;
export {FiltrationContext};