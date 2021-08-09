const pg = require('pg');
import axios from "axios";
import { createClient } from "../models/db";

export const getBookDetailsByISBN = async (req, res) => {
  try {
    let result = await axios.get(`http://openlibrary.org/api/books?bibkeys=ISBN:${req.params.isbn}&jscmd=details&format=json`);
    console.log(result.data);
    return res.json({ 'success': true, 'data': result.data });
  }
  catch (err) {

  }
};

export const allClassess = async (req, res) => {
  try {
    let client = await createClient();
    client.connect();
    let result = await client.query('SELECT * FROM ddc_class');
    await client.end();
    return res.json({ 'success': true, 'data': result.rows });
  }
  catch (err) {

  }
};


export const getParticularDccClass = async (req, res) => {
  try {
    const code = req.params.code;
    let client = await createClient();
    client.connect();
    let result = await client.query('SELECT * FROM ddc_sub_class WHERE class_id=($1)', [code]);
    await client.end();
    return res.json({ 'success': true, 'data': result.rows });
  }
  catch (err) {
  }
};

export const getSubclassCode = async (req, res) => {
  try {
    const id = req.params.id;
    let client = await createClient();
    client.connect();
    let result = await client.query('SELECT * FROM ddc_sub_class WHERE subclass_id=($1)', [id]);
    await client.end();
    console.log(result.rows[0]);
    return res.json({ 'success': true, 'data': result.rows[0] });
  }
  catch (err) {

  }
};

export const getSubDivision = async (req, res) => {
  try {
    let client = await createClient();
    client.connect();
    let result = await client.query('SELECT * FROM ddc_sub_division');
    await client.end();
    return res.json({ 'success': true, 'data': result.rows });
  }
  catch (err) {

  }
};

export const getSubDivisionCode = async (req, res) => {
  try {
    let unit = req.params.unit;
    let client = await createClient();
    client.connect();
    let result = await client.query('SELECT * FROM ddc_sub_division WHERE sub_division_unit=($1)', [unit]);
    await client.end();
    return res.json({ 'success': true, 'data': result.rows[0] });
  }
  catch (err) {

  }
};

export const addBook = async (req, res) => {
  try {
    console.log(req.body);
    const cdate = new Date();
    let client = await createClient();
    client.connect();
    let pquery = 'INSERT into m_books (category, sub_category, sub_division, call_no, accession_no, isbn, author_name, book_title, publisher, year_publication, format_type, total_pages, language, price, quantity, status, created_on, image_url) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)';
    let params = [req.body.category, req.body.subcategory, req.body.subdivision, req.body.callno, req.body.accessionno, req.body.isbn, req.body.authorname, req.body.booktitle, req.body.publisher, req.body.yearpublication, req.body.formattype, req.body.totalpages, req.body.language, req.body.price, req.body.quantity, req.body.status, cdate, req.body.imageurl];
    let result = await client.query(pquery, params);
    console.log(result);
    await client.end();
    return res.json({ 'success': true, 'data': 'Book added successfully' });
  }
  catch (err) {
    console.log(err.message);
  }
};

export const viewBooks = async (req, res) => {
  try {
    let client = await createClient();
    client.connect();
    let result = await client.query('SELECT * FROM m_books');
    await client.end();
    return res.json({ 'success': true, 'data': result.rows });
  }
  catch (err) {
    console.error(err);
  }
};

export const deleteBook = async (req, res) => {
  try {
    let client = await createClient();
    client.connect();
    let result = await client.query('DELETE FROM m_books WHERE book_id=($1)', [req.params.id]);
    await client.end();
    return res.json({ 'success': true, 'message': 'Book Deleted Successfully' });
  }
  catch (err) {

  }
};