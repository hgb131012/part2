import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');

  const addNewPerson = (personName, personNumber) => {
    event.preventDefault();
    if(personName.trim() === '' || personNumber.trim() === '') {
      setNewName('');
      setNewNum('');
      return;
    }
    if(persons.some((person) => person.name === personName)) {
      alert(`${personName} is already added to phonebook`);
    } else {
      setPersons(prePersons => [...prePersons, {name: personName, number: personNumber}]);
    }
    setNewName('');
    setNewNum('');
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  }

  const handleNumInputChange = (event) => {
    setNewNum(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          name: <input style={{marginLeft: '13px'}} value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNumInputChange} />
        </div>
        <div>
          <button style={{marginTop: '10px'}} type="submit" onClick={() => addNewPerson(newName, newNum)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={`${person.name}`}>{person.name}: {person.number}</p>)}
    </div>
  )
}

export default App;