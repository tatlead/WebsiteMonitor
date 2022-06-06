import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Badge, Card, Container } from 'react-bootstrap';

function App() {
  const [results, setResults] = useState();

  useEffect(() => {
    const id = setInterval(() => axios.get('https://website-monitor.thomas1234567123123.workers.dev/').then((response) => setResults(response.data)), 1000);
    return () => clearInterval(id);
  }, []);

  const cards = !results ? [] : results.map((x, key) => {
    return (
      <Card key={key} border={x.ok ? "success" : "danger"} style={{marginTop: 30}}>
        <Card.Body>
          <Card.Title><Badge pill bg={x.ok ? "success" : "danger"} style={{marginRight: 10}}>{x.ok ? "Online" : "Offline"}</Badge>{x.url}</Card.Title>
          <Card.Text>
            HTTP Status Code: {x.status}<br/>
            Last ping: {new Date(x.time).toTimeString()}
          </Card.Text>
          <Button variant="outline-primary" href={x.url} target="_blank">Visit Website</Button>
        </Card.Body>
      </Card>
    )
  })
  
  return (
    <div className="App">
      <Container>
        <h2 style={{marginTop: 80}}>Website Monitor</h2>
        <p>
          A mini project that ping the websites by using Cloudflare Worker and store the records by Cloudflare Worker KV. 
          This react app is deployed on Cloudflare Pages.
        </p>
        {cards}
      </Container>
    </div>
  );
}

export default App;
