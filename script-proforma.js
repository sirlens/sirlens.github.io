/*Para el formulario*/
let rowCount = 1;
function removeProductRow(row) {
    const productRow = document.querySelector(`.product-row[data-row="${row}"]`);
    if (productRow) {
        productRow.remove();
        calculateTotal(); // Recalcular el total después de eliminar
    }
}


function addProductRow() {
    rowCount++;
    const productDetails = document.querySelector(".product-details");
    const newRow = document.createElement("div");
    newRow.classList.add("product-row");
    newRow.setAttribute("data-row", rowCount); // Agregar un atributo para identificar la fila

    newRow.innerHTML = `
<input type="number" id="quantity${rowCount}" name="quantity${rowCount}" required>
<select id="tipo${rowCount}" name="tipo${rowCount}" required onchange="updatePrice(${rowCount})">
<option value="" disabled selected>Selecciona un producto</option>
<option value="camisetas">Camisetas</option>
<option value="short">Short</option>
<option value="medias">Medias</option>
<option value="casaca">Casaca</option>
<option value="buzos">Buzos</option>
<option value="cortavientos">Cortavientos</option>
<option value="otros">Otros</option>
</select>
<input type="text" id="description${rowCount}" name="description${rowCount}">
<input type="number" id="unitPrice${rowCount}" name="unitPrice${rowCount}" readonly>
<input type="number" id="amount${rowCount}" name="amount${rowCount}" readonly>
<button type="button" onclick="removeProductRow(${rowCount})">Eliminar</button>
`;

    productDetails.appendChild(newRow);
}


function updatePrice(row) {
    const tipo = document.getElementById(`tipo${row}`);
    const unitPrice = document.getElementById(`unitPrice${row}`);
    const selectedOption = tipo.value;

    // Habilita o deshabilita la edición del precio unitario según la selección
    if (selectedOption === 'otros') {
        unitPrice.removeAttribute('readonly');
    } else {
        unitPrice.setAttribute('readonly', 'true');
    }

    // Precios para productos predefinidos
    const prices = {
        camisetas: 40,
        short: 20,
        medias: 10,
        casaca: 30,
        buzos: 40,
        cortavientos: 30,
    };

    if (selectedOption in prices) {
        unitPrice.value = prices[selectedOption];
    } else {
        unitPrice.value = "";
    }
}


function calculateTotal() {
    let total = 0;
    let advance = parseFloat(document.getElementById("advance").value) || 0;

    for (let i = 1; i <= rowCount; i++) {
        const quantityInput = document.getElementsByName(`quantity${i}`)[0];
        const unitPriceInput = document.getElementsByName(`unitPrice${i}`)[0];
        const amountInput = document.getElementsByName(`amount${i}`)[0];

        if (quantityInput && unitPriceInput && amountInput) {
            const quantity = parseFloat(quantityInput.value) || 0;
            const unitPrice = parseFloat(unitPriceInput.value) || 0;
            const amount = quantity * unitPrice;
            total += amount;
            amountInput.value = amount.toFixed(2);
        }
    }

    document.getElementsByName("total")[0].value = total.toFixed(2);

    const balance = total - advance;
    document.getElementsByName("balance")[0].value = balance.toFixed(2);
}

/*Para la fecha*/
// Obtener el campo de fecha por su ID
const proformaDate = document.getElementById("proformaDate");

// Obtener la fecha actual en formato "YYYY-MM-DD"
const currentDate = new Date().toISOString().split('T')[0];

// Establecer la fecha actual como valor predeterminado
proformaDate.value = currentDate;