document.addEventListener('DOMContentLoaded', function () {
    const userCountSelect = document.getElementById('user-count');
    const usersContainer = document.querySelector('.users');
    const modal = document.getElementById('user-modal');

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
            userElement.addEventListener('click', () => openUserModal(user));
            usersContainer.appendChild(userElement);
        });
    }

    function openUserModal(user) {
        const userInfo = user;
        modal.innerHTML = `
            <div class="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
                <div class="flex flex-col space-y-4">
                    <div class="flex space-x-4 items-start">
                        <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <img class="aspect-square h-full w-full" alt="User profile picture" src="${userInfo.avatar}">
                        </span>
                        <div class="flex flex-col justify-between">
                            <h2 class="text-lg font-semibold">${userInfo.last_name}, ${userInfo.first_name}</h2>
                            <p>${userInfo.username}</p>
                            <p>${userInfo.email}</p>
                            <p>${userInfo.gender}</p>
                            <p>${userInfo.phone_number}</p>
                            <p>${userInfo.date_of_birth}</p>
                        </div>
                    </div>
                    <div dir="ltr" data-orientation="horizontal">
                        <div class="flex space-x-1">
                            <div class="submenu-item px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md">Empleo</div>
                            <div class="submenu-item px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">Dirección</div>
                            <div class="submenu-item px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">Suscripción</div>
                        </div>
                    </div>
                    <div class="submenu-content"></div>
                </div>
            </div>
        `;
        modal.classList.add('open');

        const submenuItems = modal.querySelectorAll('.submenu-item');
        submenuItems.forEach((item, index) => {
            item.addEventListener('click', () => displaySubmenuContent(index, userInfo));
        });
    }

    function displaySubmenuContent(index, userInfo) {
        const submenuContent = modal.querySelector('.submenu-content');
        submenuContent.innerHTML = '';

        switch (index) {
            case 0: // Empleo
                submenuContent.innerHTML = `
                    <div class="p-4 border rounded-md">
                        <h3 class="text-lg font-semibold">${userInfo.employment.title}</h3>
                        <p class="mt-1">Habilidades: ${userInfo.employment.key_skill}</p>
                    </div>
                `;
                break;
            case 1: // Dirección
                submenuContent.innerHTML = `
                    <div class="p-4 border rounded-md">
                        <h3 class="text-lg font-semibold">Dirección</h3>
                        <p>Ciudad: ${userInfo.address.city}</p>
                        <p>Calle: ${userInfo.address.street_name}</p>
                        <p>Dirección: ${userInfo.address.street_address}</p>
                        <p>Código ZIP: ${userInfo.address.zip_code}</p>
                        <p>Estado: ${userInfo.address.state}</p>
                        <p>País: ${userInfo.address.country}</p>
                    </div>
                `;
                break;
            case 2: // Suscripción
                submenuContent.innerHTML = `
                    <div class="p-4 border rounded-md">
                        <h3 class="text-lg font-semibold">Suscripción</h3>
                        <p>Plan: ${userInfo.subscription.plan}</p>
                        <p>Estado: ${userInfo.subscription.status}</p>
                        <p>Método de pago: ${userInfo.subscription.payment_method}</p>
                        <p>Plazo: ${userInfo.subscription.term}</p>
                    </div>
                `;
                break;
            default:
                break;
        }
    }

    modal.addEventListener('click', function (event) {
        if (!event.target.closest('.max-w-2xl')) {
            modal.classList.remove('open');
            modal.innerHTML = '';
        }
    });
});