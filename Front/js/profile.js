document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadProfileData();
    setupEventListeners();
});

function loadProfileData() {
    const user = getCurrentUser();
    if (user) {
        // Llenar datos del perfil
        document.getElementById('sidebarAvatar').src = user.avatar || 'https://via.placeholder.com/150';
        document.getElementById('sidebarUsername').textContent = user.username;
        document.getElementById('profileAvatar').src = user.avatar || 'https://via.placeholder.com/150';
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        
        // Mostrar último login (simulado)
        document.getElementById('lastLogin').textContent = new Date().toLocaleString();
    }
}

function setupEventListeners() {
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Cambiar avatar
    document.getElementById('changeAvatarBtn').addEventListener('click', () => {
        document.getElementById('avatarInput').click();
    });
    
    document.getElementById('avatarInput').addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('profileAvatar').src = event.target.result;
                document.getElementById('sidebarAvatar').src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Guardar cambios
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfileChanges();
    });
    
    // Botones de seguridad
    document.getElementById('logoutAllDevicesBtn').addEventListener('click', () => {
        if (confirm('¿Está seguro que desea cerrar sesión en todos los dispositivos?')) {
            alert('Sesiones cerradas en todos los dispositivos');
        }
    });
    
    document.getElementById('activityLogBtn').addEventListener('click', () => {
        alert('Mostrando historial de actividad...');
    });
}

function saveProfileChanges() {
    const user = getCurrentUser();
    const newData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        avatar: document.getElementById('profileAvatar').src
    };
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validar contraseñas si se están cambiando
    if (newPassword && currentPassword) {
        if (newPassword !== confirmPassword) {
            alert('Las contraseñas nuevas no coinciden');
            return;
        }
        newData.password = newPassword;
        newData.currentPassword = currentPassword;
    }
    
    // Simular actualización
    try {
        // En un sistema real, aquí harías una llamada a la API
        Object.assign(user, newData);
        localStorage.setItem('user', JSON.stringify(user));
        
        alert('Perfil actualizado correctamente');
        loadProfileData(); // Refrescar datos
        
        // Limpiar campos de contraseña
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        
    } catch (error) {
        console.error('Error al guardar cambios:', error);
        alert('Error al actualizar el perfil');
    }
}