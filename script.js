document.getElementById('find-country').addEventListener('click', findCountryInfo);

function findCountryInfo() {
    const countryName = document.getElementById('country').value.trim();
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

    if (!countryName) {
        alert('Please enter a country name');
        return;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];
            const countryInfoDiv = document.getElementById('country-info');
            countryInfoDiv.innerHTML = `
                <div class="country">
                    <h2>${country.name.common}</h2>
                    <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                    <p><strong>Capital:</strong> ${country.capital}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Subregion:</strong> ${country.subregion}</p>
                    <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                </div>
            `;
        })
        .catch(error => {
            const countryInfoDiv = document.getElementById('country-info');
            countryInfoDiv.innerHTML = `<p class="error">${error.message}</p>`;
        });
}
