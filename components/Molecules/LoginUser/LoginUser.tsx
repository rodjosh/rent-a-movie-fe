import { FormEvent, useRef } from 'react';

interface User {
  username: string;
  token: string;
}

interface LoginUserProps {
  setUser: (user: User) => void;
  setScreen: (screen: any) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const onError = () => {
  alert('Error trying to hit the API');
};

const LoginUser = ({ setUser, setScreen }: LoginUserProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${API_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameRef?.current?.value,
        password: passwordRef?.current?.value,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json?.refresh && json?.access) {
          setUser({
            username: usernameRef?.current?.value ?? '',
            token: json?.access,
          });
        } else onError();
      })
      .catch(onError);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="col-12 row justify-content-center mb-3">
          <button
            type="button"
            className="col-3 btn btn-primary"
            onClick={() => setScreen('Register')}
          >
            Registrarse
          </button>
        </div>

        <div className="form-group my-3">
          <label htmlFor="username">Nombre de Usuario</label>

          <input
            ref={usernameRef}
            type="text"
            className="form-control"
            id="username"
            placeholder="username"
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="password">Contraseña</label>

          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="password"
            placeholder="Contraseña"
          />
        </div>

        <div className="row">
          <button type="submit" className="btn btn-primary my-3">
            Iniciar Sesion
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
