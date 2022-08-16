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

interface MoviesProps {
  user: User;
  setScreen: (screen: any) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const onError = () => {
  alert('Error trying to hit the API');
};

const Movies = ({ user, setScreen }: MoviesProps) => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/movies/`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json?.movies) {
          if (!movies?.length) setMovies(json.movies);
        } else onError();
      })
      .catch(onError);
  });

  return (
    <div className="row gy-5">
      <div className="row mb-5 justify-content-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setScreen('Rented')}
        >
          Ver rentados por mi
        </button>
      </div>

      <h1 className="mb-4">Para rentar</h1>

      {movies.map(({ id, img, title, description }) => (
        <Movie
          key={id}
          user={user}
          id={id}
          img={img}
          title={title}
          description={description}
          setScreen={setScreen}
        />
      ))}
    </div>
  );
};

export default Movies;
