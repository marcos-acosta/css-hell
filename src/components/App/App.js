import { useState } from 'react';
import Box from '../Box/Box';
import styles from './App.module.css'

function App() {
  const [width, setWidth] = useState(5);

  return (
    <header className={styles.header}>
      <input value={width} onChange={e => setWidth(e.target.value)} />
      <div className={styles.arena}>
        <Box width={width} />
      </div>
    </header>
  );
}

export default App;
