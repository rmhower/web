const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    if(data.id == "" || data.breed == ""){
        $.toaster({ priority: 'danger', title : 'Error', message: "Fields cannot be left blank."});
    }
    else {
        fetch('https://api-onzo.onrender.com/api/v1/inventory/', {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
          .then(data => console.log(data))
          .then(error => console.log(error))
          $.toaster({ priority: 'success', title : 'Dogs', message: "Dog successfully added."}); 
    }
});