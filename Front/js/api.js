// Base de datos simulada
let users = [
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

// Obtener todos los usuarios (excepto el actual)
async function getUsers() {
    return new Promise(resolve => {
        setTimeout(() => {
            const currentUserId = getCurrentUser().id;
            resolve(users.filter(u => u.id !== currentUserId));
        }, 500);
    });
}

// Obtener usuario por ID
async function getUserById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id == id);
            if (user) resolve(user);
            else reject('Usuario no encontrado');
        }, 500);
    });
}

// Crear usuario
async function createUser(userData) {
    return new Promise(resolve => {
        setTimeout(() => {
            const gender = Math.random() > 0.5 ? 'men' : 'women';
            const randomId = Math.floor(Math.random() * 99) + 1;
            
            const newUser = {
                id: Math.max(...users.map(u => u.id)) + 1,
                avatar: userData.avatar || `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`,
                ...userData
            };
            users.push(newUser);
            resolve(newUser);
        }, 500);
    });
}

// Actualizar usuario
async function updateUser(userData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = users.findIndex(u => u.id == userData.id);
            if (index !== -1) {
                users[index] = { ...users[index], ...userData };
                resolve(users[index]);
            } else {
                reject('Usuario no encontrado');
            }
        }, 500);
    });
}

// Eliminar usuario
async function deleteUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const initialLength = users.length;
            users = users.filter(u => u.id != id);
            if (users.length < initialLength) resolve();
            else reject('Usuario no encontrado');
        }, 500);
    });
}