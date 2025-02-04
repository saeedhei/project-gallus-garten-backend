import 'dotenv/config';
import axios from 'axios';
import { Buffer } from 'buffer';

const { DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

const url = `http://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/_all_dbs`;

// Encode credentials in Base64
const encodedCredentials = Buffer.from(`${DB_USER}:${DB_PASS}`).toString('base64');

const getAllDbs = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Response data:', error.response?.data);
    } else if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
};

getAllDbs();
