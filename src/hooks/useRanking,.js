import { useMemo } from 'react';

const useRanking = (users, currentUser) => {
  const currentUserRanking = useMemo(() => {
    if (!users || !currentUser) return null;

    // Ordenar los usuarios por puntos en orden descendente
    const sortedUsers = [...users].sort((a, b) => b.points - a.points);

    // Asignar ranking a cada usuario
    let ranking = 1;
    let previousPoints = null;
    let rankOffset = 0;

    for (let i = 0; i < sortedUsers.length; i++) {
      const user = sortedUsers[i];
      if (previousPoints !== null && user.points === previousPoints) {
        rankOffset++;
      } else {
        ranking += rankOffset;
        rankOffset = 0;
      }

      previousPoints = user.points;

      if (user.username === currentUser.username) {
        return ranking;
      }
    }

    return null;
  }, [users, currentUser]);

  return currentUserRanking;
};

export default useRanking;
