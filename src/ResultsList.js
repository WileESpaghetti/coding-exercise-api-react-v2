import _ from 'lodash';
import React, { Component } from 'react'
import {Divider, Header, Segment, Table} from 'semantic-ui-react'

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            group_data: [],
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/people")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));

        fetch("http://localhost:8000/api/groups")
            .then(response => response.json())
            .then(data => this.setState({ group_data: data.data }));
    }

    render() {
        var data = this.state.data || [];
        var group_data = this.state.group_data || [];

            return (
                <div>
                    <Header as='h2'>People</Header>
                <Table sortable celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                      <Table.HeaderCell>Last Name</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Group</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>

                  {
                      data.map((person, index) => {
                          return (
                              <Table.Row key={index}>
                                  <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                                  <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                                  <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                                  <Table.Cell singleLine>{ person.group_name }</Table.Cell>
                                  <Table.Cell singleLine>{ person.status }</Table.Cell>
                              </Table.Row>
                          );
                        })
                  }

                  </Table.Body>
                </Table>
                <Divider/>
                <Header as='h2'>Groups</Header>
                {
                    group_data.map((group, index) => {
                        return (
                            <Segment>
                               <Header as='h3'>{group.group_name}</Header>
                            <Table celled padded>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                                        <Table.HeaderCell>Email</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        _.filter(data, {status: 'active', group_name: group.group_name}).map((person, index) => {
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                                                    <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                                                    <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                                                    <Table.Cell singleLine>{ person.status }</Table.Cell>
                                                </Table.Row>
                                            );
                                        })
                                    }
                                </Table.Body>
                            </Table>
                            </Segment>
                        );
                    })
                }
            </div>
        );
}

}

export default ResultsList
