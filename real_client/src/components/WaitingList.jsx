import React from 'react';
import PersonWaiting from './PersonWaiting.jsx';
import styles from './styles/WaitingList.css';

const WaitingList = ({ queue }) => {
  return (
    <div>
      <ol className={styles.players}>{ queue.map((player, index) => {
        return <PersonWaiting player={player} key={index}/>;
      })}</ol>
    </div>
  );
}

export default WaitingList;