document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadUsers();
    showCurrentUser();
    
    // Eventos
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('saveUserBtn').addEventListener('click', saveUser);
    document.getElementById('avatar').addEventListener('input', updateAvatarPreview);
});

// Mostrar usuario actual
function showCurrentUser() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('currentUserAvatar').src = user.avatar;
        document.getElementById('currentUserName').textContent = user.username;
        document.getElementById('currentUserRole').textContent = user.role;
    }
}

// Cargar usuarios
async function loadUsers() {
    try {
        const users = await getUsers();
        renderUsersTable(users);
    } catch (error) {
        console.error("Error cargando usuarios:", error);
    }
}

// Renderizar tabla
function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>
                <img src="${user.avatar}" class="rounded-circle me-2" width="40" height="40">
                ${user.username}
            </td>
            <td>${user.email}</td>
            <td><span class="badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}">${user.role}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${user.id}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${user.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Eventos para botones
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => editUser(btn.dataset.id));
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => confirmDelete(btn.dataset.id));
    });
}

// Editar usuario
async function editUser(id) {
    try {
        const user = await getUserById(id);
        const modal = new bootstrap.Modal(document.getElementById('userModal'));
        
        document.getElementById('modalTitle').textContent = 'Editar Usuario';
        document.getElementById('userId').value = user.id;
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        document.getElementById('role').value = user.role;
        document.getElementById('avatar').value = user.avatar;
        document.getElementById('avatarPreview').src = user.avatar;
        
        modal.show();
    } catch (error) {
        console.error("Error editando usuario:", error);
    }
}

// Confirmar eliminación
async function confirmDelete(id) {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
        try {
            await deleteUser(id);
            loadUsers();
        } catch (error) {
            console.error("Error eliminando usuario:", error);
        }
    }
}

// Actualizar avatar preview
function updateAvatarPreview() {
    const url = document.getElementById('avatar').value;
    document.getElementById('avatarPreview').src = url || 'https://via.placeholder.com/150';
}

// Guardar usuario
async function saveUser() {
    const userData = {
        id: document.getElementById('userId').value || null,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value,
        avatar: document.getElementById('avatar').value
    };

    try {
        if (userData.id) {
            await updateUser(userData);
        } else {
            await createUser(userData);
        }
        
        loadUsers();
        bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
        document.getElementById('userForm').reset();
    } catch (error) {
        console.error("Error guardando usuario:", error);
    }
}