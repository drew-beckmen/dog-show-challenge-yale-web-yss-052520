document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById("table-body")
    const form = document.getElementById("dog-form")

    form.addEventListener("submit", () => {
        event.preventDefault()
        const name = event.target[0].value 
        const breed = event.target[1].value  
        const sex = event.target[2].value  

        fetch("http://localhost:3000/dogs/" + event.target[3].value, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify({
                name, 
                breed, 
                sex
            })
        })
        .then(getDogs()) 
    })

    function addDog(dog) {
        const tr = document.createElement("tr")
        const name = document.createElement("td")
        name.innerText = dog.name 
        const breed = document.createElement("td")
        breed.innerText = dog.breed 
        const sex = document.createElement("td")
        sex.innerText = dog.sex 
        const btn = document.createElement("button")
        btn.innerText = "Edit Dog"

        btn.addEventListener("click", () => {
            form.children[0].value = dog.name 
            form.children[1].value = dog.breed 
            form.children[2].value = dog.sex 
            form.children[3].value = dog.id 
        })


        tr.append(name, breed, sex, btn)
        table.append(tr)
    }

    function getDogs() {
        table.innerHTML = ""
        form.reset() 
        fetch("http://localhost:3000/dogs")
        .then(response => response.json())
        .then(dogs => {
            dogs.forEach(dog => addDog(dog))
        })
    }

    getDogs()
})