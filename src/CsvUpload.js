import React, { Component } from 'react'
import { Button, Dimmer, Header, Input, Loader, Message, Segment, Transition } from 'semantic-ui-react'
import CsvUploadService from "./CsvUploadService";

class CsvUpload extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.getFileInputNode = this.getFileInputNode.bind(this);
        this.state = {
            uploadStatus:false
        };
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
                .then((result) => {
                    console.warn('status: %o', result);
                    this.setState({
                        uploading: false,
                        uploadStatus: true,
                    })
                })
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
                <Transition visible={this.state.uploadStatus} animation='scale' duration={500}>
                    <Message positive>
                        <Message.Header>Upload Complete!</Message.Header>
                        <p>
                            Refresh the page to view the results
                        </p>
                    </Message>
                </Transition>
            </Segment>
    );
    }
}

export default CsvUpload;
