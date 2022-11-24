const TAG = 'agenda-HTML-CSS';
window.addEventListener('load', () => {
    registerServiceWorker();
})

class Person {
    static id = 0;
    name = '';
    firstName = '';
    phone = '';
    email = ''

    constructor(name, firstName, phone, email) {
        Person.id++;
        this.id = Person.id;
        this.name = name;
        this.firstName = firstName;
        this.phone = phone;
        this.email = email;
    }
}

let persons = [];

function createPerson() {
    let name = document.getElementById('nume').value;
    let firstName = document.getElementById('prenume').value;
    let phone = document.getElementById('telefon').value;
    let email = document.getElementById('Email').value;
    let person = new Person(name, firstName, phone, email);

    if (!name || !firstName || !phone || !email) {
        alert('Invalid person added')
        return
    }
    persons.push(person);
    readPersons(null);
    clearForm()

}

function updateNumber() {
    const personsNumber = document.getElementById('persons_number')
    personsNumber.innerText = `Numar persoane: ${persons.length}`;
}

function readPersons(id) {

    if (id != null)
        document.getElementById('btnModifica').outerHTML = document.getElementById('btnModifica').outerHTML
    //! Stiu ca e o practica proasta pentru paginile mai mari, dar nu stiam cum sa scot un event listener cu o functie anonima si nici cum sa trimit functia mea in event listener cu un parametru fara sa o declansez

    let rows = document.querySelectorAll('#persons tr');
    for (let i = 0; i < rows.length; i++) {
        rows[i].parentElement.removeChild(rows[i]);
    }

    let personsTable = document.getElementById('persons');
    for (let i = 0; i < persons.length; i++) {
        let currentPerson = persons[i];
        personsTable.insertAdjacentHTML(
            'beforeend',
            `<tr id="person_${currentPerson.id}">
                <td>${currentPerson.name}</td>
                <td>${currentPerson.firstName}</td>
                <td>${currentPerson.phone}</td>
                <td>${currentPerson.email}</td>
                <td><input type="button" value="Modify" onclick="modifyPerson(${currentPerson.id});"></td>
                <td><input type="button" value="Delete" onclick="deletePerson(${currentPerson.id});"></td>
            </tr>`
        );
    }
    updateNumber()

}

const modifyPerson = (id) => {
    let name = document.getElementById('nume');
    let firstName = document.getElementById('prenume');
    let phone = document.getElementById('telefon');
    let email = document.getElementById('Email');

    persoana = persons.filter((person) => person.id == id)

    name.value = persoana[0].name
    firstName.value = persoana[0].firstName
    phone.value = persoana[0].phone
    email.value = persoana[0].email

    btnModifica = document.getElementById('btnModifica')
    btnModifica.addEventListener('click', () => {
        saveModified(id)
    })
}


const saveModified = (id) => {
    index = persons.findIndex(person => person.id == id)

    let name = document.getElementById('nume').value;
    let firstName = document.getElementById('prenume').value;
    let phone = document.getElementById('telefon').value;
    let email = document.getElementById('Email').value;


    persons[index].phone = phone
    persons[index].firstName = firstName
    persons[index].name = name
    persons[index].email = email
    clearForm()

    readPersons(id)
}

const clearForm = () => {
    let inputs = document.querySelectorAll('form.controls input')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
    }
    document.getElementById('nume').focus()
}

function deletePerson(id) {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].id == id) {
            persons.splice(i, 1);
        }
    }
    readPersons(null);
}


document.addEventListener('DOMContentLoaded', () => {
    let addBtn = document.getElementById('btnAdauga');
    let btnModifica = document.getElementById('btnModifica');

    addBtn.addEventListener('click', function (e) {
        e.preventDefault();
        createPerson();
    })

    btnModifica.addEventListener('click', (e) => {
        e.preventDefault()
    })
    readPersons(null);
})

const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./serviceWorker.js');
        } catch (e) {
            console.log('Service worker registration failed');
        }
    }
}

