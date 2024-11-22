

document.getElementById('executeButton').addEventListener('click', async () => {
    try {
        const param = document.getElementById('param').value;
        if (param === "") {
            throw new Error('Param is required');
        }
        chrome.runtime.sendMessage({ action: "getCookies", param: param}, (response) => {
            console.log('Response:', response);
            setValueToTable(param, response.data);

        });
    } catch (error) {
        console.error('Error:', error);
    }
});


function setValueToTable(param,data) {
    const table = document.getElementById('table');
    const newRow = table.insertRow();

    const paramCell = newRow.insertCell(0);
    const dataCell = newRow.insertCell(1);

    paramCell.textContent = param;
    dataCell.textContent = JSON.stringify(data, null, 2);
}


