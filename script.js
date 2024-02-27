document.addEventListener('DOMContentLoaded', function () {
    const userCountSelect = document.getElementById('user-count');
    const usersContainer = document.querySelector('.users');

    userCountSelect.addEventListener('change', function () {
        const selectedCount = userCountSelect.value;
        getUsers(selectedCount);
    });

    function getUsers(count) {
        fetch(`https://random-data-api.com/api/v2/users?size=${count}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                renderUsers(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function renderUsers(users) {
        usersContainer.innerHTML = '';
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.classList.add('user');
            userElement.innerHTML = `
                <div class="user-info">
                    <img src="${user.avatar}" alt="User avatar">
                    <div>
                        <p class="name">${user.first_name}</p>
                        <p>${user.email}</p>
                        <p class="username">${user.username}</p>
                    </div>
                </div>
            `;
            usersContainer.appendChild(userElement);
        });
    }
});