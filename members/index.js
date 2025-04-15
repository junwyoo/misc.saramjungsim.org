const units = {
    person: "명"
};

const config = {
    minTemp: 0,
    maxTemp: 7500,
    unit: "person"
};

const queryServer = 'https://saramjungsim.com:8443/memberCount';

const registrationLink = document.getElementById("link-to-registration");

registrationLink.addEventListener("click", () => {
    window.open("https://join.saramjungsim.org");
});

const temperature = document.getElementById("temperature");

function toCommaString (value) {
    const thousands = parseInt(value / 1000);
    const ones = value % 1000;
    const stringOnes = ones + "";

    if (thousands === 0) {
        return stringOnes;
    }

    let concatedOnes = stringOnes;

    while (concatedOnes.length !== 3) {
        concatedOnes = "0" + concatedOnes;
    }

    return thousands + "," + concatedOnes;
}

function setTemperature(value) {
    const maxGraphValue = value > config.maxTemp ? config.maxTemp : value;
    temperature.style.height = (maxGraphValue - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    const commaString = toCommaString(value);

    temperature.dataset.value = commaString + units[config.unit];
}

function setLastUpdateText(value) {
    const date = new Date(value);
    if (!value || date.toString() === 'Invalid Date') {
        console.log('invalid date')
        return;
    }

    const lastUpdate = document.getElementById("lastUpdate");

    const superScriptNode = document.createElement("sup");
    const timeContent = document.createTextNode("(마지막 업데이트: " + date.toLocaleString() + ")");

    lastUpdate.appendChild(superScriptNode);
    lastUpdate.appendChild(timeContent);
}

document.body.onload = function() {
    $(function() {
        $.ajax({
            type: 'GET',
            url: queryServer,
            crossDomain: true,
            headers: {
               'Access-Control-Allow-Origin': '*'
            },
            success: function(res, status) {
                const {count, lastUpdate} = res;

                if (count) {
                    const integerCount = parseInt(count);
                    if (!isNaN(integerCount)) {
                        setTemperature(count);
                    }
                }

                if (lastUpdate) {
                    const parsedLastUpdate = parseInt(lastUpdate);
                    if (!isNaN(parsedLastUpdate)) {
                        setLastUpdateText(parsedLastUpdate);
                    }
                }
            },
            error: function(res, status) {
                setTemperature(0);
            }
        });
    });
}

