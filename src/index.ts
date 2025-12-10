import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from '../ormconfig';
import app from './app';

dotenv.config();

const PORT = Number(process.env.PORT || 3000);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized');
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    server.on('error', (err) => {
      console.error('Server error:', err);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
