import fetch from 'node-fetch';
import express from 'express'
import bodyParser from 'body-parser'

const app = express();
const port =  3000; // Use the PORT environment variable or 3000 by default

app.use(bodyParser.json());

// Endpoint for generating token
app.post('/generate-token', async (req, res) => {
  const apiKey = '4NKQ3-815C2-8T5Q2-16318-55301';
  const tokenResponse = await fetch('https://dev-test.cimet.io/generate-token', {
    method: 'POST',
    headers: {
      'Api-key': apiKey,
    },
  });
  const tokenData = await tokenResponse.json();
  res.json(tokenData);
});



app.use(express.json());

app.post('/get-products', async (req, res) => {
  const apiKey = '4NKQ3-815C2-8T5Q2-16318-55301';
  const authToken = req.headers['auth-token'];

  const productsResponse = await fetch('https://dev-test.cimet.io/plan-list', {
    method: 'POST',
    headers: {
      'Api-key': apiKey,
      'Auth-token': authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: 'eyJpdiI6IkVNUkZ1N0hlSHhHSnJ3Vjl4aUlxc0E9PSIsInZhbHVlIjoieFlxa1wvVDYxQWl5U2pxMDFcL0R6ZVVvdEN6Mkk0R29TRDN3ZnN0U3VGcER0cEFMa2NVb0xNcDJudjlRTHRUbGJkIiwibWFjIjoiMTE0MmU0MGE5YmJhMzY4Nzc4MDExNmZkNTI1MjZhMGE3OTQyMDZmOTc1MTVmZDM1Mzc3ZmJmNjhmMzllOGYxYSJ9',
    }),
  });

  const productsText = await productsResponse.text(); // Read response as text
  console.log('Response text:', productsText);

  try {
    const productsData = JSON.parse(productsText); // Try to parse as JSON
    console.log('Parsed JSON:', productsData);
    res.json(productsData);
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    res.status(500).json({ error: 'Error parsing JSON response' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
