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
<input type="number" id="unitPrice${rowCount}" name="unitPrice${rowCount}">
<input type="number" id="amount${rowCount}" name="amount${rowCount}" readonly>
<button class="only-screen button-front" type="button" onclick="removeProductRow(${rowCount})">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <path
    d="m24,78c0,4.968 4.029,9 9,9h30c4.968,0 9-4.032 9-9l6-48h-60l6,48zm33-39h6v39h-6v-39zm-12,0h6v39h-6v-39zm-12,0h6v39h-6v-39zm43.5-21h-19.5c0,0-1.344-6-3-6h-12c-1.659,0-3,6-3,6h-19.5c-2.487,0-4.5,2.013-4.5,4.5s0,4.5 0,4.5h66c0,0 0-2.013 0-4.5s-2.016-4.5-4.5-4.5z" />
</svg>
</button>
`;

    productDetails.appendChild(newRow);
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

function downloadPDF() {
    const $elementoParaConvertir = document.getElementById('enviarCliente'); // <-- Aquí puedes elegir cualquier elemento del DOM
    window.print();
}
