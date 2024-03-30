import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUsers } from "./useUsers";

export function useProducts() {
  const { user } = useUsers();
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/products");

        if (user.username) {
          const productsByUsername = data.data.filter(
            (e) => e.owner === user.username
          );
          setProducts(productsByUsername);
        }
        // Si se proporciona un username, buscar por ese username
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchData();
  }, [user, user]); // Se añade username a las dependencias

  return { products };
}
