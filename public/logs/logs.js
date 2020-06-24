getData = async () => {
    const response = await fetch('/getAllData');
    const data = await response.json();
    // console.log(data);

    data.map((value) => {
        console.log(value);
        const row = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdLat = document.createElement('td');
        const tdLon = document.createElement('td');
        const tdTimestamp = document.createElement('td');
        const tableBody = document.getElementById('tableBody');

        tableBody.append(row);

        if (value.name != '' || value.name == null) {
            tdName.textContent = value.name;
        }
        else {
            tdName.textContent = 'Unknown !';
        }
        tdLat.textContent = value.lat;
        tdLon.textContent = value.lon;
        tdTimestamp.textContent = new Date(value.timestamp).toLocaleString();


        row.append(tdName, tdLat, tdLon, tdTimestamp);
    });
}
getData();