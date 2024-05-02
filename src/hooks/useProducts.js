import axios from "axios";
import { useEffect, useState } from "react";

export function useProducts() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const fetchData = async () => {
    try {
      const data = await axios.get("/api/products");
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);

  return { filteredProducts, allProducts };
}
