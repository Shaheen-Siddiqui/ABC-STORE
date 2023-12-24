import { createContext, useReducer, useState } from "react";
import { filterReducer } from "../reducer/filterReducer";
import {products as allnewProducts} from '../../../db/products';
import {categories} from '../../../db/categories'


//---------//
export const filterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [productLoding] = useState(false);
  const [categoriesData] = useState(categories);
  const [products] = useState(allnewProducts);



  const [filterState, setfilterDispatch] = useReducer(filterReducer, {
    filteredArray: [],
    sort: null,
    search: "",
    rating: "",
    sofa: false,
    beds: false,
    loading: false,
    luxurySets: false,
    priceRange: 1200,
    dressingTables: false,
  });
  const {
    sort,
    search,
    filteredArray,
    rating,
    beds,
    sofa,
    luxurySets,
    dressingTables,
    priceRange,
  } = filterState;


  let filterBySearch =
    search.length > 0
      ? products.filter(({ title }) =>
          title.toLowerCase().includes(search.toLowerCase())
        )
      : products;

  let filterProductByCategories =
    filteredArray.length > 0
      ? filterBySearch.filter(({ category }) =>
          filteredArray.some((item) => item === category)
        )
      : filterBySearch;

  let sortProductByPrice = sort
    ? filterProductByCategories.sort((a, b) =>
        sort === "high_to_low" ? b.price - a.price : a.price - b.price
      )
    : filterProductByCategories;

  let filterProductByRating = rating
    ? sortProductByPrice.filter((item) => item.rating >= rating)
    : sortProductByPrice;

  const filterProductByPriceRange = priceRange
    ? filterProductByRating.filter(({ price }) => Number(price) <= priceRange)
    : filterProductByRating;

  return (
    <filterContext.Provider
      value={{
        setfilterDispatch,
        filterProductByPriceRange,
        priceRange,
        search,
        rating,
        sort,
        beds,
        sofa,
        luxurySets,
        dressingTables,
        filterBySearch,
        productLoding,
        categoriesData,
        products,
        filteredArray,
      }}
    >
      {children}
    </filterContext.Provider>
  );
};
