import { useState } from 'react';
import styles from './App.module.css'
import CssReceiver from '../CssReceiver/CssReceiver';

function App() {
  const [left, setLeft] = useState(5);
  const [bbox, setBbox] = useState({});

  console.log(bbox ? bbox : 'no bbox yet');

  return (
    <header className={styles.header}>
      <input value={left} onChange={e => setLeft(e.target.value)} />
      <div className={styles.arena}>
        <CssReceiver css={{left: `${left}vw`}} setCornerCenter={setBbox} />
      </div>
    </header>
  );
}

export default App;
