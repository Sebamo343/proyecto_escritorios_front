// Base de datos simulada
const mockUsers = [
    { 
        id: 1, 
        username: 'admin', 
        password: 'admin123', 
        role: 'admin', 
        email: 'admin@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    { 
        id: 2, 
        username: 'user1', 
        password: 'user123', 
        role: 'user', 
        email: 'user1@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
];

// Función de login
function login(username, password) {
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('authToken', 'simulated-token');
        localStorage.setItem('user', JSON.stringify(user));
        return true;
    }
    return false;
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Verificar autenticación
function checkAuth() {
    if (!localStorage.getItem('authToken')) {
        window.location.href = 'login.html';
    }
}

// Obtener usuario actual
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}