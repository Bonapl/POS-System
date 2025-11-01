const username = document.getElementById('username');
const pass = document.getElementById('password');
const loginBtn = document.getElementById('submit');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (username.value === 'admin' && pass.value === '0305') {
        alert('Login successful!');
        window.location.href = 'Home.html';
    } else {
        alert('Invalid username or password!');
    }
}
);
