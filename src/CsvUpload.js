import React, { Component } from 'react'
import { Button, Dimmer, Header, Input, Loader, Segment } from 'semantic-ui-react'
import CsvUploadService from "./CsvUploadService";

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

        if (files[0]) {
            this.setState({uploading: true})
            new CsvUploadService()
                .upload(files[0])
                .then(() => this.setState({uploading: false}))
            ;
        }
    }

    render() {
        return (
            <Segment>
                <Header as='h2'>Upload CSV File</Header>
                <Dimmer.Dimmable dimmed={this.state.active}>
                    <Dimmer active={this.state.uploading} inverted>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Input type="file" accept=".csv" ref={this.myRef} action={<Button id="do-upload-csv" onClick={this.handleClick}>Upload</Button>}/>
                </Dimmer.Dimmable>
            </Segment>
        );
    }
}

export default CsvUpload;
