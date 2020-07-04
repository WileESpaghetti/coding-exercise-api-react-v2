import _ from 'lodash';
import Papaparse from 'papaparse';
import { GroupsService, PeopleService } from "./Services";

const enabledServices = [PeopleService, GroupsService];

class CsvUploadService {
    #enabledServices = [PeopleService, GroupsService];
    #defaults = {
        dynamicTyping: true,
        header: true,
        quoteChar: '"',
        skipEmptyLines: 'greedy',
        worker: true,
    }

    /**
     * @see https://www.papaparse.com/docs#config
     */
    constructor(config) {
        config = config || {};
        this.config = _.assign(this.#defaults, config);
    }

    upload(file) {
        return new Promise((resolve, reject) => {
            console.warn('this.config: %o', this.config)
            Papaparse.parse(file, _.assign(this.config, {error: reject, complete: resolve}))
        }).then(this.onParseComplete.bind(this))
          .catch(this.onFileReaderError)
          .then((results) => console.warn(results));
    }

    getCsvService(fields) {
        for (let i = 0; i < enabledServices.length; i++) {
            if (enabledServices[i].canProcessCsv(fields)) {
                console.log(enabledServices[i]);
                return enabledServices[i];
            }
        }
        return null;
    }

    onParseComplete(results) {
        console.log('CSV read complete');
        let fields = results.meta.fields;
        let service = this.getCsvService(fields);
        if (!service) {
            return Promise.reject('unknown CSV format');
        }

        return service.process(results.data);
    }

    onFileReaderError(error, file) {
        console.error('file error in %s: %s', file, error);
        return Promise.reject(error);
    }
}

export default CsvUploadService;
