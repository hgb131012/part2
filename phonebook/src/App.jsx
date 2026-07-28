import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addNewPerson = (personName) => {
    event.preventDefault();
    if(persons.some((person) => person.name === personName)) {
      alert(`${personName} is already added to phonebook`);
    } else {
      setPersons(prePersons => [...prePersons, { name: personName }]);
    }
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div style={{marginBottom: '10px'}}>
          name: <input onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit" onClick={() => addNewPerson(newName)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p key={`${person.name}`}>{person.name}</p>
        )
      })}
    </div>
  )
}

export default App;