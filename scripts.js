//Modulo dolar UY
const dolarUruguayApi = "https://cotizaciones-brou.herokuapp.com/api/currency/latest"

let dolarUy;

class DolarUy {
    constructor(responseData) {
        this.sell = responseData.rates["USD"].sell;
        this.buy = responseData.rates["USD"].buy;
    }
}

async function getDolarUyData() {
    const response = await fetch(dolarUruguayApi);
    const responseData = await response.json();
    dolarUy = new DolarUy(responseData);
}

getDolarUyData();

//Modulo dolar AR

const dolarArgentinaApi = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

//Convertir esto en interfaces de typescript
class DolarBlueAr {
    constructor(dolarData) {
        this.sell = dolarData.venta;
        this.buy = dolarData.compra;
    }
}

class DolarTuristaAr {
    constructor(dolarData) {
        this.sell = dolarData.venta;
        this.buy = dolarData.compra;
    }
}

class DolarOficialAr {
    constructor(dolarData) {
        this.sell = dolarData.venta;
        this.buy = dolarData.compra;
    }
}

let dolarBlueAr;
let dolarTuristaAr;
let dolarOficialAr;

async function getDolarArData() {
    const response = await fetch(dolarArgentinaApi);
    const responseData = await response.json();
    const dolarData = responseData.map(x => x.casa)
    const filtredDolarData = dolarData.filter(dolar => ['Dolar Blue', 'Dolar turista', 'Dolar Oficial'].includes(dolar.nombre))
    console.log(filtredDolarData);
    saveDolarArData(filtredDolarData);
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

