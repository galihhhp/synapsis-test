import axios from 'axios';

const usersService = {
  getAllUsers: async () => {
    const res = await axios.get('http://localhost:3000/api/users');
    return res.data.data;
  },
  postUser: async (val) =>
    await axios.post('http://localhost:3000/api/users', val),
  deleteUser: async (_id) =>
    await axios.delete(`http://localhost:3000/api/users/${_id}`),
  deleteAllUser: async () =>
    await axios.delete('http://localhost:3000/api/users'),
  updateUser: async (_id, val) =>
    await axios.put(`http://localhost:3000/api/users/${_id}`, val),
};

export default usersService;
