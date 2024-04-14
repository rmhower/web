new gridjs.Grid({
    search: true,
    sort: true,
    pagination: true,
    fixedHeader: true,
    height: "90%",

    columns: [
        { name: "id", width: "100px" },
        { name: "breed", width: "100px" }
    ],
    
    server: {
        url: "https://api-onzo.onrender.com/api/v1/inventory/",
        then: (data) => {
            data.sort((a,b) => b.id - a.id);
            return data.map((dogs) => [
                dogs.id,
                dogs.breed
            ]);
        }
    },
}).render(document.getElementById("table"));