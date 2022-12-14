import { FormEvent, useRef } from 'react';

interface RegisterUserProps {
  setScreen: (screen: any) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const onError = () => {
  alert('Error trying to hit the API');
};

const RegisterUser = ({ setScreen }: RegisterUserProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${API_URL}/user/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameRef?.current?.value,
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
        password2: password2Ref?.current?.value,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json?.created) {
          setScreen('Login');
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
            onClick={() => setScreen('Login')}
          >
            Iniciar sesion
          </button>
        </div>

        <div className="form-group my-3">
          <label htmlFor="username">Nombre de Usuario</label>

          <input
            ref={usernameRef}
            type="text"
            className="form-control"
            id="username"
            placeholder="Nombre de Usuario"
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="email">Correo Electronico</label>

          <input
            ref={emailRef}
            type="email"
            className="form-control"
            id="email"
            placeholder="Correo Electronico"
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="password">Contrase??a</label>

          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="password"
            placeholder="Contrase??a"
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="password2">Confirmar Contrase??a</label>

          <input
            ref={password2Ref}
            type="password"
            className="form-control"
            id="password2"
            placeholder="Confirmar Contrase??a"
          />
        </div>

        <div className="row">
          <button type="submit" className="btn btn-primary my-3">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
