import { useState, useEffect } from 'react';
import Input from './Input.jsx';
import Result from './Result.jsx';
import services from './services';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    services
      .getAllCountries()
      .then((response) => {
        setCountries(response.data);
        console.log("Completed getting all data!");
      })
      .catch((error) => console.log(`${error}`));
  }, [])

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCountryName(event.target.value);
  }

  return (
    <main>
      <h1>Data for Countries</h1>
      <Input value={countryName} onChange={handleInputChange} />
      <Result countries={countries} countryName={countryName}  />
    </main>
  )
}

export default App;