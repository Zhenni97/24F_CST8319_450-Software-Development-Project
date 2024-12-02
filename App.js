import { useEffect } from 'react';
import AppNavigation from './src/navigation';
import { testDatabase } from './src/services/database';

export default function App() {
  useEffect(() => {
    testDatabase()
      .then(() => console.log('Database test successful'))
      .catch(error => console.error('Database test failed:', error));
  }, []);

  return (
    <AppNavigation />
  );
}