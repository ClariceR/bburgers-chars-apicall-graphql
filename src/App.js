import './App.css';
import { useState, useEffect } from 'react';

const query = `
query {
  characters {
    id
    name
    image
  }
}
`;

const opts = {
  method: 'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify({ query }),
};

function Character({ name, image }) {
  return (
    <>
      <h2>{name}</h2>
      <img src={image} alt={name} height="150px" />
    </>
  );
}

function App() {
  const URL = `https://bobsburgers-api.herokuapp.com/graphql/`;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(URL, opts)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!data) return null;
  return (
    <div>
      {data.data.characters.map((character) => (
        <div className="characters-bkg" key={character.id}>
          <Character name={character.name} image={character.image} />
        </div>
      ))}
    </div>
  );
}

export default App;