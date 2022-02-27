let current_data;
let all_coutnries;
class Home_element
{
    constructor(flag,name,population,region,capital)
    {
        this.flag = flag;
        this.name = name;
        this.population = population;
        this.region = region;
        this.capital = capital;
    }
    get_output()
    {
        return `
            <img src="${this.flag}" class="card__img" />
            <section class="card__info-wraper">
                <h3 class="card__heading">
                    ${this.name}
                </h3>
                <ul>
                    <li>
                        Population: <span class="card__info">
                        ${this.population}</span>
                    <li>
                    <li>
                        Region: <span class="card__info">
                        ${this.region}
                        </span>
                    <li>
                    <li>
                        Capital: <span class="card__info">
                        ${this.capital}</span>
                    <li>
                </ul>
            </section>`;
    }
}
function display_card(country)
{
    const countries_container = document.
    querySelector(".countries-container");
    const {flag,name,population,region,capital} = country;
    const element = new 
    Home_element(flag,name,population,region,capital);
    const article = document.createElement("ARTICLE");
    article.classList.add("card");
    article.innerHTML = element.get_output();
    countries_container.append(article);  
}
async function initial_req()
{
    const url = "https://restcountries.com/v2/all";
    const response = await fetch(url);
    const json_data = await response.json();
    current_data = json_data;
    all_coutnries = json_data;
    json_data.forEach(display_card);
}
function search_by_name()
{
    const value = document.querySelector(".search")
    .value;
    Array.from(document.querySelectorAll(".card"))
        .forEach(card=>
        {
            card.remove();
        });
    if(value.length === 0) 
    {
        current_data.forEach(display_card);
    }
    else
    {
        current_data.forEach(country=>
        {
            if(country.name.toLowerCase().startsWith(value.toLowerCase()))
            {
                display_card(country);
            }
        });
    }
}
function display_mode()
{
    document.documentElement.classList.
    toggle("dark-mode");
    document.querySelectorAll(".fa-moon").forEach(item=>
    {
        item.classList.toggle("far");
        item.classList.toggle("fas");
    });
    console.log("displaly mode");
}
async function filter()
{
    const select = document.querySelector(".filter");
    const value = select.options[select.selectedIndex].text;
    document.querySelector(".search").value = "";
    Array.from(document.querySelectorAll(".card"))
        .forEach(card=>
        {
            card.remove();
        });
    if(value === "all")
    {
        initial_req();
    }
    else
    {
        const response = await 
        fetch(`https://restcountries.eu/rest/v2/region/${value}`);
        const json_data = await response.json();
        current_data = json_data;
        json_data.forEach(display_card);
    }
}
function fill(country)
{
    const langs =[];
    const currs = [];
    country.languages.forEach(obj=>
    {
        langs.push(obj.name)
    });
    country.currencies.forEach(obj=>
    {
        currs.push(obj.code);
    });
    let borders = ``;
    country.borders.forEach(border=>
    {
        borders += `<button data-alpha3code="${border}" type="button" class="full-card__btn">
        ${border}</button>`;
    });
    const output =
    `<section class="display-mode">
                <button class="btn">
                    <i class="far fa-moon"></i>
                    Dark Mode
                </button>
            </section>
    <button type="button" class="full-card__quite">
            Back
        </button>
    <section class="full-card">
        <img class="full-card__img" src="${country.flag}" />
        <section class="full-card__info">
            <h3 class="full-card__heading">
                ${country.name}
            </h3>
            <section>
            <section class="full-card__lists">
                <ul class="full-card__list">
                    <li>
                        Native Name: <span class="card__info">
                        ${country.nativeName}
                    <li>
                    <li>
                        Population: <span class="card__info">
                        ${country.population}
                    <li>
                    <li>
                        Region: <span class="card__info">
                        ${country.region}
                    <li>
                    <li>
                        Sub region <span class="card__info">
                        ${country.subregion}
                    <li>
                    <li>
                        Capital: <span class="card__info">
                        ${country.capital}
                    <li>
                </ul>
                <ul class="full-card__list">
                    <li>
                        Top Level Domain: <span class="card__info">
                        ${country.topLevelDomain}
                    <li>
                    <li>
                        Currencies: <span class="card__info">
                        ${currs.toString()}
                    <li>
                    <li>
                        Languages: <span class="card__info">
                        ${langs.toString()}
                    <li>
                </ul>
            </section>
        </section>
        <section class="full-cards__borders">
            borders:
            <section class="full-card__btn-wraper">
                ${borders}
            </section>
        </section>
        </section>
    </section>`;
    const dp = document.querySelector(".detailed-page");
    dp.innerHTML = output;
    dp.classList.add("above");
    document.body.classList.add("no-scroll");
}
function more_info(element)
{
   const link = element.querySelector("img").getAttribute("src");
   const country = current_data.find(item=>
    {
        return (item.flag === link);
    });
    fill(country);
}
function go_back()
{
    const dp = document.querySelector(".detailed-page");
    document.body.classList.remove("no-scroll");
    dp.classList.remove("above");
}