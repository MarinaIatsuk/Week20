//Находим элементы
const select = document.querySelector('.list')
const input = document.querySelector('.input')
const btn = document.querySelector('.btn')
const result = document.querySelector('.result')
const message = document.querySelector('.message')
const loadingMessage = document.querySelector('.loading-message')


//Функция по направлению запроса на сервер и выдачи ответа
async function getInfo() {
    try {
        loadingMessage.style.display = 'block'; //Показали загрузку

        const infoResponse = await fetch(`https://swapi.nomoreparties.co/${select.value}/${input.value}`);
        const infoJson = await infoResponse.json();

        loadingMessage.style.display = 'none'; //убрали загрузку
        
        // console.log(JSON.stringify(infoJson)); //проверка полей
        if (select.value === 'people') {
            makeCharacterCard(infoJson)
        } else if (select.value === 'planets') {
            makePlanetCard(infoJson)
        } else if (select.value === 'films') {
            makeMoiveCard(infoJson)
        } else {
            throw new Error('Что-то пошло не так'); //почему не срабатывает?
        }
    } catch (error) {
        errorBlock.textContent = `Ошибка: ${error.message}`;
    } finally {
        message.textContent = 'Вами был сделан запрос. Вот результат: ';
    }
}

//вынесла функции по созданию карточек на каждую опцию:

//Персонаж
function makeCharacterCard(info) {
    result.textContent = ''
    const div = document.createElement('div')
    div.classList.add('wrapper')
    const template =
        `
            <p>Имя персонажа: <span>${info.name}</span></p>
            <p>Год рождения: <span>${info.birth_year}</span></p>
            <p>Вес: <span>${info.mass}</span></p>
            `
    div.innerHTML = template
    result.appendChild(div)
}

//Планета
function makePlanetCard(info) {
    result.textContent = ''
    const div = document.createElement('div')
    div.classList.add('wrapper')
    const template =
        `
            <p>Название планеты: <span>${info.name}</span></p>
            <p>Год длится: <span>${info.orbital_period}</span> дня/дней</p>
            <p>Диаметр: <span>${info.diameter}</span>  км.</p>
            `
    div.innerHTML = template
    result.appendChild(div)
}

//Фильм
function makeMoiveCard(info) {
    result.textContent = ''
    const div = document.createElement('div')
    div.classList.add('wrapper')
    const template =
        `
            <p>Название фильма: <span>${info.title}</span></p>
            <p>Дата выхода: <span>${info.release_date}</span></p>
            <p>Режиссер: <span>${info.director}</span></p>
            `
    div.innerHTML = template
    result.appendChild(div)
}

//Функция, которая не позволяет оставить поле с числом пустым
function showName() {
    if (input.value == '' || input.value < 1 || input.value > 10) { //Эти условия: "input.value<1 || input.value>10" Добавила, в случае если бы отсутствовали ограничения по числам в html
        alert('Введите число от 1 до 10')
    } else {
        getInfo()
    }
}

//обработчик события на кнопку
btn.addEventListener('click', showName);