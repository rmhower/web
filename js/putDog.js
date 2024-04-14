document.addEventListener('DOMContentLoaded', function () {
    const idSelect = document.getElementById('id');

    // Fetching the list of dog IDs to populate the dropdown
    fetch('https://api-onzo.onrender.com/api/v1/inventory/')
        .then(res => res.json())
        .then(data => {
            data.forEach(dog => {
                let option = document.createElement('option');
                option.value = dog.id;
                option.textContent = dog.id; // Display the dog ID in the option text
                idSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Failed to load dog IDs:', error);
            $.toaster({ priority: 'danger', title: 'Error', message: 'Failed to load dog IDs.' });
        });

    const formEl = document.querySelector('.form');
    formEl.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(formEl);
        const id = formData.get('id');
        const breed = formData.get('breed');

        if (id === "" || breed === "") {
            $.toaster({ priority: 'danger', title : 'Error', message: "Fields cannot be left blank."});
        } else {
            fetch('https://api-onzo.onrender.com/api/v1/inventory/', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ breed: breed, id: parseInt(id) })
            }).then(res => res.json())
              .then(data => console.log(data))
              .then(error => console.log(error))
              $.toaster({ priority: 'success', title : 'Dogs', message: "Dog breed successfully updated."});
        }
    });
});
