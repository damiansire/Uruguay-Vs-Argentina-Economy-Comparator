//Modulo dolar UY
const dolarUruguayApi = "https://cotizaciones-brou.herokuapp.com/api/currency/latest"

let dolarUy;

let dolarBlueAr;

let dolarTuristaAr;

let dolarOficialAr;

const cardContainer = document.getElementsByClassName("card-container")[0];

class DolarUy {
    constructor(responseData) {
        this.sell = responseData.rates["USD"].sell;
        this.buy = responseData.rates["USD"].buy;
        this.screenText = "Dolar Uruguay";
        this.img = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/1200px-Flag_of_Uruguay.svg.png";
    }
}

async function getDolarUyData() {
    const response = await fetch(dolarUruguayApi);
    const responseData = await response.json();
    dolarUy = new DolarUy(responseData);
    renderDolar(dolarUy);
}

getDolarUyData();

//Modulo dolar AR

const dolarArgentinaApi = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

//Convertir esto en interfaces de typescript
class DolarBlueAr {
    constructor(dolarData) {
        this.sell = dolarData.venta;
        this.buy = dolarData.compra;
        this.screenText = "Dolar Blue AR"
        this.img = "https://www.andbank.es/observatoriodelinversor/wp-content/uploads/2014/01/DOLAR_blue.jpg";
    }
}

class DolarTuristaAr {
    constructor(dolarData) {
        this.sell = dolarData.venta;
        this.buy = dolarData.compra;
        this.screenText = "Dolar Turista AR"
        this.img = "https://www.cronista.com/files/image/127/127578/5ff77245dc84c.jpg";
    }
}

class DolarOficialAr {
    constructor(dolarData) {
        this.sell = dolarData.venta;
        this.buy = dolarData.compra;
        this.screenText = "Dolar Oficial AR"
        this.img = "https://resizer.iproimg.com/unsafe/880x/filters:format(webp)/https://assets.iprofesional.com/assets/jpg/2020/08/501745.jpg?7.2.4";
    }
}

async function getDolarArData() {
    const response = await fetch(dolarArgentinaApi);
    const responseData = await response.json();
    const dolarData = responseData.map(x => x.casa)
    const filtredDolarData = dolarData.filter(dolar => ['Dolar Blue', 'Dolar turista', 'Dolar Oficial'].includes(dolar.nombre))
    console.log(filtredDolarData);
    saveDolarArData(filtredDolarData);
    renderDolar(dolarBlueAr);
    renderDolar(dolarTuristaAr);
    renderDolar(dolarOficialAr);
}

function saveDolarArData(filtredDolarData) {
    let dolarOficial = filtredDolarData.find(dolar => dolar.nombre == "Dolar Oficial");
    let dolarTurista = filtredDolarData.find(dolar => dolar.nombre == "Dolar turista");
    console.log(dolarTurista)
    let dolarBlue = filtredDolarData.find(dolar => dolar.nombre == "Dolar Blue");
    dolarBlueAr = new DolarBlueAr(dolarBlue);
    dolarTuristaAr = new DolarTuristaAr(dolarTurista);
    dolarOficialAr = new DolarOficialAr(dolarOficial);
}

getDolarArData();

//Renderizado

function getDolarHtml(dolar) {
    return `<div class="card"><img
                    src="${dolar.img}">
                <div class="coin-data">
                    <p>${dolar.screenText}</p>
                    <p> <span class="legend"> Compra: </span> $${dolar.buy}</p>
                    <p> <span class="legend"> Venta: </span> $${dolar.sell}</p>
                </div>
            </div>
            `
}

function renderDolar(dolar) {
    const dolarHtml = getDolarHtml(dolar)
    cardContainer.insertAdjacentHTML("beforeend", dolarHtml);
}