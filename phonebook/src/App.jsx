import { useState } from 'react';

const Form = (props) => {
  return (
    <form>
      <div>
        name: <input style={{marginLeft: '13px'}} 
                value={props.newName}
                onChange={props.handleNameInputChange}/>
      </div>
      <div>
        number: <input value={props.newNum} onChange={props.handleNumInputChange}/>
      </div>
      <div>
        <button style={{marginTop: '10px'}} 
          type="submit" onClick={() => props.addNewPerson(props.newName, props.newNum)}>add
        </button>
      </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <div>
        filter shown with: <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const Persons = ({ persons, filteredPersons }) => {
  if(filteredPersons.length === 0) {
    return (
      <div>
        {persons.map((person) => <p key={`${person.name}`}>{person.name}: {person.number}</p>)}
      </div>
    )
  } else {
    return (
      <div>
        {filteredPersons.map((person) => <p key={`${person.name}`}>{person.name}: {person.number}</p>)}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newFilter, setNewFilter] = useState('');

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

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    console.log(event.target.value);
  }

  const filteredPersons = newFilter.trim() === '' ?
    persons : persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Form newName={newName} newNum={newNum} handleNameInputChange={handleNameInputChange} 
            handleNumInputChange={handleNumInputChange} addNewPerson={addNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredPersons={filteredPersons} />
    </div>
  )
}

export default App;