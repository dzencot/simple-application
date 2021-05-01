import express from 'express';
import pgp from 'pg-promise';

const router = express.Router();

const db = pgp()({
  user: 'postgres',
  host: 'database',
  database: 'testdb',
  password: 'postgres',
  port: 5432,
});

const getUsers = async (request, response) => {
  const results = await db.any('SELECT firstname, lastname FROM persons');
  response.status(200).send(results);
};

const createUser = async (request, response) => {
  const { firstname, lastname } = request.body

  await db.none('INSERT INTO persons (firstname, lastname) VALUES ($1, $2)', [firstname, lastname]);
  response.status(201).send({ result: 'Successful' });
};

router.get('/persons', (req, res) => {
  getUsers(req, res);
});

router.post('/person', (req, res) => {
  createUser(req, res);
});

export default router;
