// NPM Packages
import axios from 'axios';

const baseUrl = '/api/notes';

function getAll() {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 5000,
    content: 'This note is not saved on the server',
    important: true,
  };
  return request.then((response) => [...response.data, nonExisting]);
}

function create(newObject) {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
}

function update(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
}

export default { getAll, create, update };
