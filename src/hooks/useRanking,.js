import { useMemo } from 'react';

const useRanking = (users, currentUser) => {
  const currentUserRanking = useMemo(() => {
    if (!users || !currentUser) return null;

    // Ordenar los usuarios por puntos en orden descendente y por createdAt en caso de empate (usuarios más antiguos primero)
    const sortedUsers = [...users].sort((a, b) => {
      if (b.points === a.points) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return b.points - a.points;
    });

    // Encontrar la posición del usuario actual
    const index = sortedUsers.findIndex(user => user.username === currentUser.username);

    // La posición en el ranking es el índice + 1 (porque los índices son 0-based)
    return index !== -1 ? index + 1 : null;
  }, [users, currentUser]);

  return currentUserRanking;
};

export default useRanking;
