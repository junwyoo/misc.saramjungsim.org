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

function setTemperature(value) {
    const maxGraphValue = value > config.maxTemp ? config.maxTemp : value;
    temperature.style.height = (maxGraphValue - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    const thousands = parseInt(value / 1000);

    if (thousands > 0) {
        temperature.dataset.value = thousands + "," + (value % 1000) + units[config.unit];
        return;
    }

    temperature.dataset.value = value + units[config.unit];
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
                const {count} = res;

                if (count) {
                    const integerCount = parseInt(count);
                    if (!isNaN(integerCount)) {
                        setTemperature(count);
                    }
                }
            },
            error: function(res, status) {
                setTemperature(0);
            }
        });
    });
}

