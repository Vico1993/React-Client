import React from 'react';
import { shallow } from 'enzyme';
import Table from './Table';

it('renders without data', () => {
    const tableComponent = shallow(<Table />);
    tableComponent.setState({data: [], columns: []})
    expect(tableComponent.find('ReactTable').length).toEqual(1);
});

it('if BuildCollumns don\'t receive parameters', () => {
    const tableComponent = shallow(<Table />);
    expect(tableComponent.instance().BuildColumns()).toEqual([]);
});

it('if BuildCollumns receive wrong parameter', () => {
    const tableComponent = shallow(<Table />);
    expect(tableComponent.instance().BuildColumns("")).toEqual([]);
    expect(tableComponent.instance().BuildColumns(1)).toEqual([]);
});

it('renders with props', () => {
    var data = [{
        "firstname": "Victor",
        "Lastname": "Piolin"
    }, {
        "firstname": "John",
        "Lastname": "Doe"
    }];

    const tableComponent = shallow(<Table data={data}/>);
    expect(tableComponent.find('ReactTable').length).toEqual(1);
});