import { useState } from 'react';
import styles from './App.module.css'
import CssReceiver from '../CssReceiver/CssReceiver';

function App() {
  const [skew, setLeft] = useState(0);
  const [bbox, setBbox] = useState(null);

  console.log(bbox ? `TOP LEFT: left=${bbox.tl.left} top=${bbox.tl.top}` : 'no bbox yet');

  return (
    <header className={styles.header}>
      <input value={skew} onChange={e => setLeft(e.target.value)} />
      <div className={styles.arena}>
        <CssReceiver css={{transform: `skew(${skew}deg, 10deg)`}} setCornerCenter={setBbox} />
      </div>
    </header>
  );
}

export default App;
