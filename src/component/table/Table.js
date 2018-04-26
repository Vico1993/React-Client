import React, { Component } from 'react';

// Create a simple Table
import ReactTable from "react-table";
import fetch from 'isomorphic-fetch'

import './Table.css';
import 'react-table/react-table.css'

// Api to get Data
const defaultURL = 'https://zrn2cbypo9.execute-api.us-west-2.amazonaws.com/TakeHome/fruit'

class Table extends Component { 
    
    constructor() {
        super();
        
        this.state = {
            dataTable: [],
            loading: false,
            columns: [{
                Header: 'Favorites',
                headerClassName: 'my-favorites-column-header-group',
                columns: []
            }]
        }
    }

    // Construct columns from Data
    BuildColumns( data ) {
        
        let columns = [];

        if ( typeof data === Array || typeof data === Object ) {
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

    componentDidMount() {

        // Set if we get some data
        if ( typeof this.props.data !== "undefined" ) {
            this.setState({dataTable: this.props.data})
        }

        // Set if we get some columns
        if ( typeof this.props.columns !== "undefined" ) {
            this.setState({columns: this.props.columns})
        }

        // if we have data
        if ( this.state.dataTable.length > 0 ) {
            if ( this.state.columns.length > 0 ) {
                // And we have columns
                return false;
            } else {
                // Else let's build columns
                this.setState({columns: this.BuildColumns( this.state.dataTable )})
            }
        } else {
            // Else going to set default data
            var url = defaultURL
            if ( typeof this.props.url !== "undefined" && this.props.url !== "" ) {
                url = this.props.url
            } 

            this.setState({loading: true})

            // Loading data from the API
            fetch(url)
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
                    data = [];
                }

                this.setState({dataTable: data, loading: false, columns: columns});
            });
        }
    }

    render() {
        return (
            <div>
                <ReactTable
                    data={this.state.dataTable}
                    columns={this.state.columns}
                    loading={this.state.loading}
                    filterable={true}
                />
            </div>
        )
    }
}

export default Table;