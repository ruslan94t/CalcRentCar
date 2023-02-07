const tariff = Array.from(document.querySelectorAll('.tariff'));
let total = document.querySelector('#total');
let orderTariff = document.querySelector('#order_tariff');
let time = document.querySelector('#time');
let volume = document.querySelector('#volume');
let orderTime = document.querySelector('#order_time');
let option = Array.from(document.querySelectorAll('.option'));
let orderOption = document.querySelector('#order_option');




function tariffeUpdate(e) {
    currentSet.tariff = e.target.id;
    updatePrice();
    orderUpdate();
}

function timeUpdate(e) {
    currentSet.time = time.value;
    volume.value = currentSet.time;
    updatePrice();
    orderUpdate();
}


function optionUpdate(e) {
    e.stopPropagation();
    if (e.target.checked) {
        currentSet.option.push(e.target.id);

    } else {
        let index = currentSet.option.indexOf(e.target.id);
        currentSet.option.splice(index, 1);
        // let index = currentSet.option.indexOf(e.target.id);
        // currentSet.option.splice(index, 1);
        // console.log(index, e.target.id, currentSet.option)
    }
    updatePrice();
    orderUpdate();

}


function updatePrice() {
    let tarifePrice = currentSet.getTariffPrice();
    let optionPrice = currentSet.getOptionPrice();
    let totalPrice = tarifePrice * currentSet.time + optionPrice;
    total.value = totalPrice;
}


function orderUpdate() {
    orderTariff.value = currentSet.getTariffPrice() + '\u{20BD} /час';
    if (currentSet.time < 5) {
        orderTime.value = currentSet.time + ' /Часа';
    } else {
        orderTime.value = currentSet.time + ' /Часов';
    }

    orderOption.value = currentSet.getOptionPrice() + '\u{20BD} /Руб';

}



option.forEach(el => el.addEventListener('change', optionUpdate))
time.addEventListener("input", timeUpdate);
tariff.forEach(el => el.addEventListener('click', tariffeUpdate));


const priceInfo = {
    tariff: {
        economy: 100,
        comfort: 200,
        business: 350,
        premium: 550,
    },
    option: {
        option1: 100,
        option2: 150,
        option3: 150,
        option4: 200,
    },

};

let currentSet = {
    tariff: "economy",
    time: 2,
    option: [],

    getTariffPrice() {
        return priceInfo.tariff[this.tariff];
    },
    getOptionPrice() {
        let optionPrice = 0;

        if (!this.option.length == 0) {
            this.option.forEach((el) => {
                optionPrice += priceInfo.option[el]
            })

        }
        return optionPrice;

    }
};



