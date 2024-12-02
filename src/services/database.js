import AsyncStorage from '@react-native-async-storage/async-storage';
import Database from 'expo-sqlite';

const db = Database.openDatabase("recipeApp.db");

export const testDatabase = () => {
  console.log('Testing database connection...');
  return new Promise((resolve, reject) => {
    try {
      db.transaction(tx => {
        console.log('Inside transaction');
        tx.executeSql(
          'SELECT 1',
          [],
          (_, result) => {
            console.log('Query successful:', result);
            resolve(result);
          },
          (_, error) => {
            console.error('Query error:', error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Transaction error:', error);
      reject(error);
    }
  });
};