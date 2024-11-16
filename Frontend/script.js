// Example: Simple validation
document.querySelector('form').addEventListener('submit', function(event) {
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        event.preventDefault();  // Prevent form submission
    }
});
