import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'

class CsvUpload extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.getFileInputNode = this.getFileInputNode.bind(this);
        this.state = {};
    }
    getFileInputNode() {
        return this.myRef.current.inputRef.current;
    }

    handleClick() {
        let files = this.getFileInputNode().files;

        if (files.length > 0) {
            console.log(files[0]);
        }
    }
    render() {
        return (
            <Input type="file" accept=".csv" ref={this.myRef} action={<Button id="do-upload-csv" onClick={this.handleClick}>Upload</Button>}/>
        );
    }
}

export default CsvUpload;
