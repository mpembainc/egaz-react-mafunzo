import axios from 'axios';

const URL = 'http://localhost:3000/users';

export const getUsers = () => axios.get(URL);
export const postUser = (data) => axios.post(URL, data);
export const deleteUser = (id) => axios.delete(`${URL}/${id}`);
export const updateUser = (data, id) => axios.put(`${URL}/${id}`, data);
