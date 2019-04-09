import React, { Component, Fragment } from 'react';
import { Table, Input, Button, List } from 'antd';
import store from '../../store/index'

//redux测试文件

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];


class Tom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.state = store.getState()
        // console.log(this.state.list)
        store.subscribe(this.changeB)
    }

    change = (e) => {
        const action = {
            type: 'change_input_value',
            value: e.target.value
        }
        store.dispatch(action)
        // console.log(e.target.value)
    }

    changeB = () => {
        this.setState(store.getState())
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <Input onChange={this.change} placeholder='大傻子'></Input>
                <div className='showChange'>{this.state.inputValue}</div>
                <Button>GO</Button>
                <List
                    bordered
                    dataSource={data}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </div>

        )
    }
}

export default Tom