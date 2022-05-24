import axios from 'axios';

const register = async (username, password) => {    
    const response = await axios.post('/register', {username, password});  
    if(response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
}

const login = async (username, password) => {
    const response = await axios.post('/login', {username, password});
    if(response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
}


const checkLogin = async (token) => {
    const response = await axios.get('/checkuser', {headers: {"authorization": token}});
    return response;
}

// Remove a user from localStorage
const logout = () => {
    localStorage.removeItem('user');
}

// Get the user from localStorage
const getAuthUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

const authService = {
    register,
    login,
    getAuthUser,
    checkLogin,
    logout
  };

export default authService;