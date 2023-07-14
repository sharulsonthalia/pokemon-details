const getinfo = async() => {
    try{
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        const allPokemon = data.results;
        console.log(allPokemon)
        render(allPokemon)

    } catch(err){
        const message = `sorry, error`
        render(message)
    }
}

const render = (pokemonArr) => {
    const ul = document.querySelector(`ul`);
    for (const i in pokemonArr){
        const urlArr = pokemonArr[i].url.split(`/`)
        const urlIndex = urlArr[6]
        ul.innerHTML += `<a href='' data-pokemon-number='${urlIndex}'>
        <li>${pokemonArr[i].name}</li></a>`
    }
    const linkArr = document.querySelectorAll(`a`);
    for (let i = 0; i < linkArr.length; i++) {
        linkArr[i].addEventListener(`click`, async(event) => {
            event.preventDefault()
            const num = linkArr[i].dataset.pokemonNumber
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
            const data = await response.json();
            renderImg(data)
        })
    }
}

const renderImg = (pokemonData) => {
    const body = document.querySelector(`body`)
 
    body.innerHTML = ``

    const p = document.createElement(`p`)
    p.innerHTML = `<h1>${pokemonData.name}</h1>`
    body.appendChild(p)

    body.innerHTML += `<img src = ${pokemonData.sprites.front_default} width= '200px'>`
    
    const space = document.createElement(`br`)
    body.appendChild(space)

    const button = document.createElement(`button`)
    button.innerText = `Go Back!`
    body.appendChild(button)

    backbutton()
}

const backbutton = () => {
    const button = document.querySelector(`button`)
    const body = document.querySelector(`body`)
    button.addEventListener(`click`, () => {
        body.innerHTML= ``
        body.innerHTML += `<h1>Pokemon Names</h1>`
        body.innerHTML += `<ul></ul>`
        getinfo()
    })
}


getinfo()
