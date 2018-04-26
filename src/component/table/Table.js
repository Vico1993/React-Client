import React, { Component } from 'react';

// Create a simple Table
import ReactTable from "react-table";
import fetch from 'isomorphic-fetch'

import './Table.css';
import 'react-table/react-table.css'

class Table extends Component { 
    
    data = []
    columns = []

    constructor(props) {
        super(props);
        
        this.data = this.props.data
        this.columns = this.props.columns

        this.state = {
            loading: false
        }
    }

    // Construct columns from Data
    BuildColumns( data ) {
        
        let columns = [];

        if ( typeof data === "array" || typeof data === "object" ) {
            data.forEach((key, id)=>{
                if ( key === 'location_1' ) {
                    columns.push({
                        Header: 'location_1.type',
                        accessor: 'location_1.type'
                    })
                    columns.push({
                        Header: 'location_1.coordinates',
                        id:'location_1.coordinates',
                        accessor: data => {
                            let output = [];
                            data.location_1.coordinates.forEach((c, key) => {
                                output.push(c);
                            });
                            return output.join(', ');
                        }
                    })
                }
                else {
                    columns.push({
                        Header: key,
                        accessor: key
                    })
                }
            })                
        }

        return columns;
    }

    componentWillMount() {
        // if we have data
        if ( typeof this.props.data !== "undefined" && this.props.data.length > 0 ) {
            if ( typeof this.props.columns !== "undefined" && this.props.columns.length > 0 ) {
                return false;
            } else {
                // Else let's build columns
                this.columns = this.BuildColumns( Object.keys(this.data[0]) );
            }
        } else {
            // Else going to set default data
            this.setState({loading: true})

            // Loading data from the API
            fetch(this.props.url)
            .then(results => {
                return results.json();
            }).then(data => {
                var columns = [];
                if ( data.length > 0 ) {
                    // Sort to get the object with the most of element first to create column.
                    data.sort(function(a, b) {
                        return Object.keys(b).length - Object.keys(a).length;
                    });

                    columns = this.BuildColumns( Object.keys(data[0]) );
                } else {
                    data = {};
                }  

                this.data = data;
                this.columns = columns;
                this.setState({loading: false});
            });
        }
    }

    render() {
        return (
            <div>
                <ReactTable
                    data={this.data}
                    columns={this.columns}
                    loading={this.state.loading}
                    filterable={true}
                />
            </div>
        )
    }
}

// Default Props 
Table.defaultProps = {
    data: [],
    columns: [],
    url: 'https://zrn2cbypo9.execute-api.us-west-2.amazonaws.com/TakeHome/fruit'
};

export default Table;