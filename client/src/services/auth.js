import axios from 'axios';

const register = async (username, password) => {    
    return await axios.post('/register', {username, password});  
}

const login = async (username, password) => {
    return await axios.post('/login', {username, password});
}

const authService = {
    register,
    login,
  };

export default authService;