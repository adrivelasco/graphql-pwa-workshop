import React from 'react';
import cs from 'classnames';

import TextField from '../../components/TextField';
import Button from '../../components/Button';
import styles from './CreateAccount.css';

class CreateAccount extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    reEmail: '',
    password: '',
    rePassword: '',
    genre: '',
    clientCode: '',
    firstPlace: '',
    secondPlace: '',
    thirdPlace: '',
    fourthPlace: ''
  };

  render() {
    return (
      <div>
        <form>
          <p>
            Completá el siguiente formulario con tus datos para registrarte en el sistema y responde las 4 preguntas para obtener puntos adicionales al finalizar el torneo; tendrás tiempo para modificarlas hasta 8vos de final ingresando a <strong>MI PERFIL</strong>.
          </p>
          <div className={styles.fields}>
            <div className={styles.grid}>
              <div className={styles.gridCol}>
                <TextField
                  required
                  placeholder="Nombre*"
                />
              </div>
              <div className={styles.gridCol}>
                <TextField
                  required
                  placeholder="Apellido*"
                />
              </div>
              <div className={styles.gridCol}>
                <TextField
                  required
                  placeholder="Correo electrónico*"
                />
              </div>
              <div className={styles.gridCol}>
                <TextField
                  required
                  placeholder="Confirmar correo electrónico*"
                />
              </div>
              <div className={styles.gridCol}>
                <TextField
                  required
                  type="password"
                  placeholder="Contraseña*"
                />
              </div>
              <div className={styles.gridCol}>
                <TextField
                  required
                  placeholder="Repetir contraseña*"
                  type="password"
                />
              </div>
            </div>
            <div className={styles.genre}>
              <TextField required type="radio" label="Hombre" name="genre" />
              <TextField required type="radio" label="Mujer" name="genre" />
            </div>
            <TextField
              required
              placeholder="Ingrese su Código de clientes"
              label="Código de cliente"
            />
            <TextField
              required
              placeholder="Seleccionar"
              label="¿Qué equipo ganará la copa?"
              type="password"
              selector
            >
              <option>Argentina</option>
            </TextField>
            <TextField
              required
              placeholder="Seleccionar"
              label="¿Qué equipo queda en 2do puesto?"
              type="password"
              selector
            >
              <option>Argentina</option>
            </TextField>
            <TextField
              required
              placeholder="Seleccionar"
              label="¿Qué equipo queda en 3er puesto?"
              type="password"
              selector
            >
              <option>Argentina</option>
            </TextField>
            <TextField
              required
              placeholder="Seleccionar"
              label="¿Qué equipo queda en 4to puesto?"
              type="password"
              selector
            >
              <option>Argentina</option>
            </TextField>
            <br />
          </div>
        </form>
        <div className={styles.signup}>
          <Button
            active
            block
            onClick={(event) => console.log('Crear una nueva cuenta')}
          >
            Enviar
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
