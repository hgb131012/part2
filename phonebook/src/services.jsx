import axios from 'axios';
const dbURL = 'http://localhost:3004/persons';

const getAll = () => {
    return axios.get(dbURL);
}

const addNew = (person) => {
    return axios.post(dbURL, person);
}

const delOne = (id) => {
    return axios.delete(`${dbURL}/${id}`);
}

export default { getAll, addNew, delOne }