import { useState, useEffect } from 'react';
import services from './services.jsx';

const Message = ({ content }) => {
  if(content === '') {
    return (
      <p style={{visibility: 'hidden'}}>{content}</p>
    )
  } else {
    return (
      <p style={{color: 'green', borderRadius: '10px', border: 'green solid 2px', fontSize: '25px'}}>
        {content}
      </p>
    )
  }
  
}

const DelBtn = ({ delPerson, personId, personName }) => {
  return (
    <button style={{marginLeft: '10px'}} onClick={() => delPerson(personId, personName)}>Delete</button>
  )
}

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

const Persons = ({ persons, filteredPersons, delPerson }) => {
  if(filteredPersons.length === 0) {
    return (
      <div>
        {persons.map((person) => {
          return (
            <div key={`${person.name}`}>
              <span>{person.name}: {person.number}</span>
              <DelBtn delPerson={delPerson} personId={person.id} personName={person.name} />
            </div> )
        })}
      </div>
    )
  } else {
    return (
      <div>
        {filteredPersons.map((person) => {
          return (
            <div key={`${person.name}`}>
              <span>{person.name}: {person.number}</span>
              <DelBtn delPerson={delPerson} personId={person.id} personName={person.name} />
            </div>
          )
          })
        }
      </div>
    )
  }
}

const App = () => {
  const [newNum, setNewNum] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    services
      .getAll()
      .then((response) => {
        setPersons(response.data);
        console.log('Completed getting data!')
      })
      .catch((error) => console.log(`${error}`));
  }, [])

  const delPerson = (personId, personName) => {
    if(window.confirm(`Delete ${personName} ?`)) {
      services
        .delOne(personId)
        .then(() => setPersons(p => p.filter((person) => person.id != personId)))
        .catch((error) => console.log(`${error}`));
    } else return;
  }

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
      const newPerson = { name: personName, number: personNumber };
      setMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        services
        .addNew(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          console.log('New person added successfully!');
          setMessage('');
        })
        .catch(error => console.log(`${error}`));
      }, 2500);
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
      <Message content={message} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Form newName={newName} newNum={newNum} handleNameInputChange={handleNameInputChange} 
            handleNumInputChange={handleNumInputChange} addNewPerson={addNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredPersons={filteredPersons} delPerson={delPerson} />
    </div>
  )
}

export default App;