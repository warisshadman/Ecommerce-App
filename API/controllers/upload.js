const pg = require('pg');
const fs = require('fs-extra');
import { createClient } from "../models/db";

export const uploadBookCoverImage = async (req, res) => {
  try {
    const client = await createClient();
    client.connect();
    const file = req.file;
    console.log(file);
    if (!file) {
      const error = new Error('Please upload file');
      error.httpStatusCode = 400;
      return res.json({ 'success': false });
    } else {
      console.log(req.file.path);
      // const query = 'UPDATE m_books set image_url=$1 where book_id=$2';
      // const value = [req.file.orginalname];
      // var result = await client.query(query, value);
      await client.end();
      return res.json({ 'success': true, 'data': req.file });
    }
  }
  catch (err) {
    console.log(err);
  }
};