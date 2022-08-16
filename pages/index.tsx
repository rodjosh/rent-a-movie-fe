import { useState } from 'react';

import RentedMovies from 'components/Organisms/RentedMovies';
import RegisterUser from 'components/Molecules/RegisterUser';
import LoginUser from 'components/Molecules/LoginUser';
import Movies from 'components/Organisms/Movies';

interface User {
  username: string;
  token: string;
}

type Screens = 'Login' | 'Register' | 'Rented' | 'List';

const Home = () => {
  const [user, setUser] = useState<User>();
  const [screen, setScreen] = useState<Screens>('Login');

  if (!user) {
    if (screen === 'Login')
      return (
        <div className="container py-5">
          <LoginUser setUser={setUser} setScreen={setScreen} />
        </div>
      );

    return (
      <div className="container py-5">
        <RegisterUser setScreen={setScreen} />
      </div>
    );
  }

  if (screen === 'Rented') {
    return (
      <div className="container py-5">
        <RentedMovies user={user} setScreen={setScreen} />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Movies user={user} setScreen={setScreen} />
    </div>
  );
};

export default Home;
