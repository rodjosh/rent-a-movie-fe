import { useEffect, useState } from 'react';

import Movie from 'components/Atoms/Movie';

interface User {
  username: string;
  token: string;
}

interface MovieType {
  id: string;
  title: string;
  description: string;
  img: string;
}

interface RentedMoviesProps {
  user: User;
  setScreen: (screen: any) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const onError = () => {
  alert('Error trying to hit the API');
};

const RentedMovies = ({ user, setScreen }: RentedMoviesProps) => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/rent/movie`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json?.rents) {
          if (!movies?.length) setMovies(json.rents);
        } else onError();
      })
      .catch(onError);
  });

  return (
    <div className="row">
      <div className="row mb-5 justify-content-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setScreen('List')}
        >
          Ver peliculas para rentar
        </button>
      </div>
      <h1 className="mb-4">Rentados por mi</h1>

      {movies.map(({ id, img, title, description }) => (
        <Movie
          key={id}
          user={user}
          id={id}
          img={img}
          title={title}
          description={description}
          setScreen={setScreen}
          rented
        />
      ))}
    </div>
  );
};

export default RentedMovies;
