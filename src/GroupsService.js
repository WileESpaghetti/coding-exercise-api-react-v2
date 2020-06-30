import _ from 'lodash';
export default {
    canProcessCsv: canProcessCsv,
    process: process,
    create: create,
    update: update,
    createOrUpdate: createOrUpdate
};

function canProcessCsv(fields) {
    return _.isEqual(fields, ['id', 'group_name']);
}

function process(data) {
    Promise.all(data.map(createOrUpdate)).then(() => {
        console.log('all people uploaded');
    });
    console.log(data);
}

function update(group) {
    return fetch("http://localhost:8000/api/groups/" + group.id, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(group)
    });
}

function create(group) {
    return fetch("http://localhost:8000/api/groups", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(group)
    });
}

function createOrUpdate(group) {
    update(group)
        .then(response => {
            console.debug(response);
            if (response.status == 404) {
                console.log('creating group %o', group);
                return create(group);
            } else if (!response.ok) {
                console.error('something went wrong creating group: %o' + group);
                return Promise.reject('something went wrong creating group: ' + JSON.stringify(group));
            } else {
                let group = response.json();
                console.log('updated group %o', group);
                console.debug(group);
                return group;
            }
        });
}
