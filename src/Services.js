import _ from "lodash";

let GroupsService;
let PeopleService;

class Service {
    #baseUrl = 'http://localhost:8000/api/';
    #defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    constructor(resource, fields) {
        this.resource = resource;
        this.fields = fields || [];
    }

    fetch(path, method, data) {
        let url = this.#baseUrl + path;
        return fetch(url,{
            method: method,
            body: JSON.stringify(data),
            headers: this.#defaultHeaders
        });
    }

    process(csvData) {
        return Promise.all(csvData.map(this.createOrUpdate.bind(this)))
            .then((results) => {
                console.log('all data uploaded');
                return results;
            });
    }

    canProcessCsv(fields) {
        return this.fields.length && _.isEqual(this.fields, fields);
    }

    get(id) {

    }

    getAll() {

    }

    create(data) {
        return this.fetch(`${this.resource}`, 'POST', data)
    }

    createOrUpdate(data) {
        return this.update(data)
            .then(response => {
                if (response.status === 404) {
                    return this.create(data);
                } else if (response.ok) {
                    return response.status !== 204 ? response.json() : null;
                } else {
                    return Promise.reject('something went wrong creating data: ' + JSON.stringify(data));
                }
            });
    }

    update(data) {
        return this.fetch(`${this.resource}/${data.id}`, 'PUT', data)
    }
}

GroupsService = new Service('groups', ['id', 'group_name']);
PeopleService = new Service('people', ['id', 'first_name', 'last_name', 'email_address', 'status', 'group_name']);

export default Service;
export {GroupsService, PeopleService};
