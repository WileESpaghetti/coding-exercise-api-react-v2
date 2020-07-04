import _ from 'lodash';
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class PeopleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            column: null,
            direction: null,
        };
    }

    static getDerivedStateFromProps(props, state) {
        let direction = state.direction === 'ascending' ? 'desc' : 'asc';
        let data = state.column ? _.orderBy(props.data, [state.column], direction) : props.data;
        if (data !== state.data) {
            return {
                data: data
            };
        }
        return null;
    }

    handleSort = (clickedColumn) => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    render() {
        const { column,direction } = this.state;
        const data = this.state.data || [];

        return (
                <Table sortable celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'first_name' ? direction : null}
                                onClick={this.handleSort('first_name')}
                                singleLine>First Name</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'last_name' ? direction : null}
                                onClick={this.handleSort('last_name')}
                            >Last Name</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'email_address' ? direction : null}
                                onClick={this.handleSort('email_address')}
                            >Email</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'group_name' ? direction : null}
                                onClick={this.handleSort('group_name')}
                            >Group</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'status' ? direction : null}
                                onClick={this.handleSort('status')}
                            >Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {
                            _.filter(data, this.props.filter).map((person, index) => {
                                return (
                                    <Table.Row key={`${person.email}-${index}`}>
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
        );
    }

}

export default PeopleTable
