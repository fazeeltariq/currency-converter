let URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

async function getRates(from, to, amount) {
    try {
        from = from.toLowerCase();
        to = to.toLowerCase();

        let response = await fetch(URL);
        let data = await response.json();

        let eurRates = data.eur;
        let fromRate = eurRates[from];
        let toRate = eurRates[to];

        let euros = amount / fromRate;
        let finalValue = euros * toRate;

        return finalValue;   

    } catch (err) {
        console.error(err);
        return null;
    }
}

let price = document.querySelector(".price");

async function setDefaultRate() {
    let rate = await getRates("BUSD", "PKR", 1);
    price.innerText = "1 USD = " + rate.toFixed(2);
}

setDefaultRate();

async function getConversion (from, to, amount) {
    return await getRates (from, to, amount);
}

let select1 = document.querySelector("#opt1");
let select2 = document.querySelector("#opt2");


let codes = Object.keys(countryList);

for (let code of codes) {
    let option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = code;
    select1.prepend(option1);

    let option2 = document.createElement("option");
    option2.value = code;
    option2.textContent = code;
    select2.prepend(option2);
}

select1.value = "PKR";
select2.value = "USD";


let img1 = document.querySelector("#imgg1");
let img2 = document.querySelector("#imgg2");

let fromcode = countryList[select1.value];
let tocode = countryList[select2.value];

img1.src = `https://flagsapi.com/${fromcode}/flat/64.png`;
img2.src = `https://flagsapi.com/${tocode}/flat/64.png`;

select1.addEventListener("change", async () => {
    let fromCurrency = select1.value;
    let toCurrency = select2.value;

    img1.src = `https://flagsapi.com/${countryList[fromCurrency]}/flat/64.png`;
    img2.src = `https://flagsapi.com/${countryList[toCurrency]}/flat/64.png`;

    let amount = document.querySelector(".inputff").value;

    let result = await getConversion(fromCurrency, toCurrency, amount);

    price.innerText = `1 ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
});

select2.addEventListener("change", async () => {
    let fromCurrency = select1.value;
    let toCurrency = select2.value;

    img1.src = `https://flagsapi.com/${countryList[fromCurrency]}/flat/64.png`;
    img2.src = `https://flagsapi.com/${countryList[toCurrency]}/flat/64.png`;

    let amount = document.querySelector(".inputff").value;

    let result = await getConversion(fromCurrency, toCurrency, amount);

    price.innerText = `1 ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;

});

let button = document.querySelector (".exchButt");


button.addEventListener (("click"), async() => {
    let amount = document.querySelector(".inputff").value;
    let fromCurrency = select1.value;
    let toCurrency = select2.value;
    let result = await getConversion(fromCurrency, toCurrency, amount);

    price.innerText = ` ${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
})


