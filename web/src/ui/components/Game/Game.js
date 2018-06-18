import React from 'react';
import PropTypes from 'prop-types';

import Team from './Team';
import styles from './Game.css';

const Game = ({ teams, editable, onPointChange, schedule, result, totalPoints, finished }) => {
  return (
    <div className={styles.root}>
      <div className={styles.teams}>
        {teams.map((team, i) => (
          <Team
            key={i}
            onPointChange={onPointChange}
            editable={editable}
            flag={team.flag}
            name={team.name}
            point={team.point}
          />
        ))}
      </div>
      <div className={styles.info}>
        <div className={styles.date}>
          {schedule.date} - {schedule.time}
        </div>
        <div className={styles.results}>
          <div className={styles.final}>
            <div className={styles.label}>
              Resultado Final
            </div>
            <div className={styles.point}>
              {result.team1}
            </div>
            <div className={styles.point}>
              {result.team2}
            </div>
          </div>
          <div className={styles.total}>
            Total: {totalPoints}
          </div>
        </div>
      </div>
    </div>
  );
};

Game.Team = Team;

Game.propTypes = {
  editable: PropTypes.bool,
  finished: PropTypes.bool,
  totalPoints: PropTypes.string,
  result: PropTypes.shape({
    team1: PropTypes.string,
    team2: PropTypes.string
  }).isRequired,
  schedule: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string
  }).isRequired
};

Game.defaultProps = {
  editable: false,
  totalPoints: '?',
  result: {
    team1: '?',
    team2: '?'
  }
};

export default Game;
