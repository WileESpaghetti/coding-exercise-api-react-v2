import _ from 'lodash';
export default {
    canProcessCsv: canProcessCsv,
    process: process,
    create: create,
    update: update,
    createOrUpdate: createOrUpdate
};

function canProcessCsv(fields) {
    return _.isEqual(fields, ['id', 'first_name', 'last_name', 'email_address', 'status', 'group_name']);
}

function process(data) {
    Promise.all(data.map(createOrUpdate)).then(() => {
        console.log('all people uploaded');
    });
    console.log(data);
}

function update(person) {
    return fetch("http://localhost:8000/api/people/" + person.id, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(person)
    });
}

function create(person) {
    return fetch("http://localhost:8000/api/people", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(person)
    });
}

function createOrUpdate(person) {
    update(person)
        .then(response => {
            console.debug(response);
            if (response.status == 404) {
                console.log('creating person %o', person);
                return create(person);
            } else if (!response.ok) {
                console.error('something went wrong creating person: %o' + person);
                return Promise.reject('something went wrong creating person: ' + JSON.stringify(person));
            } else {
                let person = response.json();
                console.log('updated person %o', person);
                console.debug(person);
                return person;
            }
        });
}
