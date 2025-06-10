// Simple script to fetch projects
import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/projects',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();