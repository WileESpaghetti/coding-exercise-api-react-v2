import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class CsvUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Input type="file" id="csv-upload" accept=".csv"/>
        );
    }
}

export default CsvUpload;
