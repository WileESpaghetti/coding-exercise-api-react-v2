import Papaparse from 'papaparse';
import PeopleService from "./PeopleService";

const enabledServices = [PeopleService];

/**
 * @see https://www.papaparse.com/docs#config
 */
var defaults = {
    complete: onParseComplete,
    dynamicTyping: true,
    error: onFileReaderError,
    header: true,
    quoteChar: '"',
    skipEmptyLines: 'greedy',
    worker: true,
}

export default {
    upload: upload,
};

function upload(file, config) {
    if (!config) {
        config = defaults;
    }

    Papaparse.parse(file, config)
}

function getCsvService(fields) {
    for (let i = 0; i < enabledServices.length; i++) {
        if (enabledServices[i].canProcessCsv(fields)) {
            console.log(enabledServices[i]);
            return enabledServices[i];
        }
    }
    return null;
}

function onParseComplete(results, file) {
    let fields = results.meta.fields;
    let service = getCsvService(fields);
    if (!service) {
        return; // TODO handle unknown CSV format
    }

    service.process(results.data);
}

function onFileReaderError(error, file) {
    console.error('file error in %s: %s', file, error);
}
