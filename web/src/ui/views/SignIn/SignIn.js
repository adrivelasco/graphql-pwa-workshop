import React from 'react';

import TextField from '../../components/TextField';
import Button from '../../components/Button';
import styles from './SignIn.css';

class SignIn extends React.Component {
  render() {
    return (
      <div>
        <form>
          <div className={styles.fields}>
            <TextField
              placeholder="Usuario"
            />
            <TextField
              placeholder="Contraseña"
              type="password"
            />
            <Button
              block
              active
              onClick={(event) => console.log('Login')}
            >
              Ingresar
            </Button>
          </div>
        </form>
        <div className={styles.signup}>
          <Button
            active
            onClick={(event) => console.log('Crear una nueva cuenta')}
          >
            Crear una nueva cuenta
          </Button>
        </div>
      </div>
    );
  }
}

export default SignIn;
