import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUsers(username) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null); // Cambiado a null para un estado inicial más claro
  const [users, setUsers] = useState(null); // Cambiado a null para un estado inicial más claro
  const [userByUsername, setUserByUsername] = useState(null); // Cambiado el nombre para evitar confusión
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
        if (username) {
          const userByUsername = data.data.find((e) => e.username === username);
          setUserByUsername(userByUsername);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchData();
  }, [session, username, isLoading]); // Se añade username a las dependencias

  // Combinamos user y userByUsername en un solo estado para simplificar el retorno
  // y hacer el hook más predecible en su uso.
  const resultUser = username ? userByUsername : user;

  return { session, isLoading, user: resultUser, users };
}
