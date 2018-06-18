import React from 'react';
import PropTypes from 'prop-types';

import Tab from '../../components/Tab';
import Group from '../../components/Group';
import Game from '../../components/Game';
import Slider from '../../components/Slider';
import Card from '../../components/Card';
import Button from '../../components/Button';
import styles from './Home.css';

class Home extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }),
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
      topStories: PropTypes.array
    })
  };

  renderDay1() {
    return (
      <div className={styles.groups}>
        <Group title="Grupo G">
          <Game
            onPointChange={(value) => console.log(value)}
            schedule={{
              date: '18/06/2018',
              time: '12:00'
            }}
            teams={[
              { name: 'RUS', flag: '', point: 5 },
              { name: 'ARG', flag: '', point: 2 }
            ]}
          />
        </Group>
        <Group title="Grupo G">
          <Game
            onPointChange={(value) => console.log(value)}
            schedule={{
              date: '18/06/2018',
              time: '12:00'
            }}
            teams={[
              { name: 'RUS', flag: '', point: 5 },
              { name: 'ARG', flag: '', point: 2 }
            ]}
          />
        </Group>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className={styles.topHome}>
          <Card className={styles.userCard}>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
              </div>
              <div className={styles.userInfo}>
                <span className={styles.name}>Hola, <strong>Brian</strong>!</span>
                <span className={styles.company}>Cuponstar</span>
                <div className={styles.action}>
                  <Button size="sm" link href="/#">
                    Editar perfil
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <div className={styles.dashboard}>
            <Card>
              <Card.Title>FECHA 1 | PRÓXIMO PARTIDO 14/06/2018 12:00</Card.Title>
              <p><strong>RUSIA VS. ARABIA SAUDITA | EGIPTO VS URUGUAY</strong></p>
            </Card>
            <div className={styles.stadistics}>
              <Card>
                <Card.Title>Tu puntaje</Card.Title>
                <p><strong>21487</strong></p>
              </Card>
              <Card>
                <Card.Title>Posición</Card.Title>
                <p><strong>12</strong></p>
              </Card>
            </div>
          </div>
        </div>
        <Slider>
          <img link="https://google.com.ar" src="https://s3.amazonaws.com/bondacom-cdn/test/banner-desktop_coffee-1.png" alt="Name" />
          <img src="https://s3.amazonaws.com/bondacom-cdn/test/banner-desktop_coffee-1.png" alt="Name" />
        </Slider>
        <div>
          <Tab
            panes={[
              { menuItem: 'Fecha 1', render: () => this.renderDay1() },
              { menuItem: 'Fecha 2', render: () => null },
              { menuItem: 'Fecha 3', render: () => null }
            ]}
          />
          <Card>
            <div className={styles.actions}>
              <Button block className={styles.saveResults}>
                Guardar resultados
              </Button>
              <Button block className={styles.nextDate}>
                Siguiente fecha
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
