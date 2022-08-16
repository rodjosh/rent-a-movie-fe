import Image from 'next/image';

interface User {
  username: string;
  token: string;
}

interface Movie {
  id: string;
  img: string;
  title: string;
  description: string;
  user: User;
  setScreen: (screen: any) => void;
  rented?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Movie = ({
  user,
  setScreen,
  id,
  img,
  title,
  description,
  rented,
}: Movie) => {
  const onRent = () => {
    fetch(`${API_URL}/rent/movie/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieid: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json?.rented) {
          setScreen('Rent');
        }
      })
      .then(() => {
        setScreen('Rented');
      });
  };

  const onReturn = () => {
    fetch(`${API_URL}/delete/movie/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieid: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json?.deleted) {
          setScreen('List');
        }
      });
  };

  return (
    <div className="row col-6">
      <div className="col-4">
        <Image src={img} width="100%" alt={title} />
      </div>

      <div className="col-8">
        <h3>{title}</h3>
        <p>{description}</p>

        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={rented ? onReturn : onRent}
        >
          {rented ? 'Devolver' : 'Rentar'}
        </button>
      </div>
    </div>
  );
};

export default Movie;
