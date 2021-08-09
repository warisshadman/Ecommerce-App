const pg = require('pg');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
import { createClient } from '../models/db';

export const register = async (req, res) => {
  try {
    let created_on = new Date();
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');
    let client = await createClient();
    client.connect();
    let pgQuery = 'INSERT into m_users (firstname, lastname, email, hash, salt, designation, organisation, role, contact_no, identity_proof, identity_card_no, created_on) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
    let params = [req.body.firstname, req.body.lastname, req.body.email, hash, salt, req.body.designation, req.body.organisation, req.body.role, req.body.contact, req.body.idProof, req.body.idCardNo, created_on];
    const result = await client.query(pgQuery, params);
    await client.end();
    return res.json({ 'success': true, 'message': 'User registered successfully' });
  }
  catch (err) {
    return res.json({ 'success': false, 'message': 'Oops! Something went wrong.' });
    console.log(err.message);

  }

};

export const login = async (req, res) => {
  try {
    // console.log(req.body.email)
    const email = req.body.email;
    const password = req.body.password;
    let client = await createClient();
    client.connect();
    let result = await client.query('SELECT * FROM m_users WHERE LOWER(email) = LOWER($1)', [email]);
    let user = result.rows[0];
    let passwordResult = getHashedPassword(password, user.salt, user.hash);
    await client.end();
    const token = generateJwt(user);
    const tokenObj = {
      'token': token,
      'fullName': user.username,
      'userType': user.role
    };
    return res.json({ 'success': true, 'message': 'LoggedIn Successfully', 'data': tokenObj });
  }
  catch (err) {
    console.log(err);
  }
};

const getHashedPassword = function (password, salt, hash) {
  const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  return hash === newHash;
};

const generateJwt = function (user) {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    id: user.id,
    username: user.username,
    fullName: user.fullname,
    exp: parseInt(expiry.getTime() / 1000),
  }, 'llp');
};