import React, { Component } from 'react'
import {Divider, Header, Segment} from 'semantic-ui-react'
import PeopleTable from './PeopleTable'

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
                    <PeopleTable data={data}/>
                <Divider/>
                <Header as='h2'>Groups</Header>
                {
                    group_data.map((group, index) => {
                        return (
                            <Segment key={group.group_name}>
                               <Header as='h3'>{group.group_name}</Header>
                                <PeopleTable data={data} filter={{status: 'active', group_name: group.group_name}} />
                            </Segment>
                        );
                    })
                }
            </div>
        );
}

}

export default ResultsList
