import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUsers(query) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null); // Cambiado a null para un estado inicial más claro
  const [users, setUsers] = useState(null); // Cambiado a null para un estado inicial más claro
  const [userByQuery, setUserByQuery] = useState(null); // Cambiado el nombre para evitar confusión
  const isLoading = status === "loading";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/users");
        // Si hay sesión y no se está cargando, buscar por email del usuario de la sesión
        setUsers(data.data);
        if (session && !isLoading && session.user?.email) {
          const userByEmail = data.data.find(
            (e) => e.email === session.user.email
          );
          setUser(userByEmail);
        }
        if (query) {
          const userByQuery = data.data.find((e) => e.username === query || e._id == query);
          setUserByQuery(userByQuery);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchData();
  }, [session, query, isLoading]); // Se añade username a las dependencias

  // Combinamos user y userByQuery en un solo estado para simplificar el retorno
  // y hacer el hook más predecible en su uso.
  const resultUser = query ? userByQuery : user;

  return { session, isLoading, user: resultUser, users };
}
