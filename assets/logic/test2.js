const staff = [
    {
        "id": 0,
        "name": "Adam Me",
        "address": "11-03,3233 California St",
        "category": "Maketing"
    },
    {
        "id": 1,
        "name": "John Lee",
        "address": "11-03,3233 Texas St",
        "category": "Maketing"
    },
    {
        "id": 2,
        "name": "Chung Lee",
        "address": "11-03,3233 Bac Kinh St",
        "category": "Head of Department"
    },
    {
        "id": 3,
        "name": "Chung Lee Chang",
        "address": "11-03,3288 Bac Kinh St",
        "category": "Head of Department"
    },
    {
        "id": 4,
        "name": "Rick",
        "address": "Seattle St",
        "category": "Boss"
    },
    {
        "id": 5,
        "name": "EoRick",
        "address": "A Ave 200 St",
        "category": "Head of Department"
    },
    {
        "id": 6,
        "name": "EoRick",
        "address": "A Ave 200 St",
        "category": "Boss"
    },
    {
        "id": 7,
        "name": "Rick Chi",
        "address": "A Ave 200 St",
        "category": "Employee"
    },
    {
        "id": 8,
        "name": "BitOffice",
        "address": "200 Texas, California",
        "category": "Employee"
    },
    {
        "id": 9,
        "name": "Yee Ling",
        "address": "200 Thuong Hai",
        "category": "Employee"
    },
    {
        "id": 10,
        "name": "BitOffice",
        "address": "200 Texas, California",
        "category": "Employee"
    }
]

window.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.box-search-input');
    const buttonAZ = document.querySelector('#buttonAZ');
    const buttonAddress = document.querySelector('#buttonAddress');
    const resultsContainer = document.querySelector('.result-container');
    const iconClose = document.querySelector('.icon-close');
    let isSorted = false;

    input.addEventListener('input', function (e) {
        const value = e.target.value.toLowerCase();
        console.log("my value ==> ", value);
        if (value) {
            iconClose.style.top = '0px';
            iconClose.style.display = 'block';
        } else {
            iconClose.style.display = 'none';
        }
        if (value === '') {
            renderResults([]);
            return;
        }
        const filteredStaff = staff.filter(function (person) {
            return (
                person.name.toLowerCase().includes(value) ||
                person.address.toLowerCase().includes(value) ||
                person.category.toLowerCase().includes(value)
            );
        });

        renderResults(filteredStaff);
    });

    iconClose.addEventListener('click', function () {
        input.value = '';
        iconClose.style.display = 'none';
        renderResults([]);
    });

    buttonAZ.addEventListener('click', function () {
        if (isSorted) {
            renderResults(staff);
            isSorted = false;
        } else {
            const sortedStaff = [...staff].sort((a, b) => a.name.localeCompare(b.name));
            renderResults(sortedStaff);
            isSorted = true;
        }
    });
    buttonAddress.addEventListener('click', function () {
        const value = input.value.toLowerCase();
        const filteredStaff = filterStaffByAddress(staff, value);
        renderResults(filteredStaff);
    });

    function renderResults(filteredStaff) {
        resultsContainer.innerHTML = '';

        if (filteredStaff.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        const resultsList = document.createElement('div');
        resultsList.classList.add('results-list');

        filteredStaff.forEach(function (person) {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            const img = document.createElement('img');
            img.src = 'https://www.w3schools.com/howto/img_avatar.png';

            const containerInfo = document.createElement('div');
            containerInfo.classList.add('container-info');

            const name = document.createElement('p');
            name.classList.add('name');
            name.textContent = person.name;

            const address = document.createElement('p');
            address.classList.add('address');
            address.textContent = person.address;

            const badge = document.createElement('div');
            badge.classList.add('badge');

            const categorySpan = document.createElement('span');
            categorySpan.textContent = person.category;

            badge.appendChild(categorySpan);
            containerInfo.appendChild(name);
            containerInfo.appendChild(address);
            containerInfo.appendChild(badge);
            resultItem.appendChild(img);
            resultItem.appendChild(containerInfo);
            resultsList.appendChild(resultItem);
        });

        resultsContainer.appendChild(resultsList);
    }
    function filterStaffByAddress(staffData, value) {
        return staffData.filter(item => {
            const address = item.address.toLowerCase();
            return address.includes(value);
        });
    }
});