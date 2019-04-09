import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Axios from 'axios';
import { Layout, Menu, Breadcrumb, Icon, } from 'antd';
import Tom from './page/member/tom'
import Bill from './page/member/bill'
import Alex from './page/member/alex'

import './App.css';

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            list: [],
            style:{   //设置style行内样式  {this.state.style}引用没毛病
                background:'black'
            }
        }
    }
    
    componentDidMount() {
        this.getList()
    }

    getList() {
        Axios.get('http://localhost:3000/leftSide.json')
            .then((response) => {
                this.setState({
                    list: response.data.menu
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <div className="">
                                <img src={require('./static/logo.png')} className="logo" alt="" />
                                <div className="logo-text">别打脸9527</div>
                            </div>
                            <div>
                                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                                    {
                                        this.state.list.map((item, index) => {
                                            if (item.second) {
                                                return (
                                                    <SubMenu key={index} title={<span><Icon
                                                        type={item.type} /><span>{item.first}</span></span>}>
                                                        {
                                                            item.second.map((item1, ind) => {
                                                                return (
                                                                    <Menu.Item
                                                                        key={String(index) + String(ind)}>{item1.action_name}<Link
                                                                            to={item1.action}>Tom</Link></Menu.Item>
                                                                );
                                                            })
                                                        }
                                                    </SubMenu>
                                                );
                                            } else {
                                                return (
                                                    <SubMenu key={index} title={<span><Icon
                                                        type="user" /><span>{item.first}</span></span>}>
                                                    </SubMenu>
                                                );
                                            }
                                        }
                                        )

                                    }

                                </Menu>
                            </div>
                        </Sider>
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0 }} />
                            <Content style={{ margin: '0 16px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>User</Breadcrumb.Item>
                                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                </Breadcrumb>
                                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                    <Route exact path="/" component={Tom} />
                                    <Route path="/Bill" component={Bill} />
                                    <Route path="/Alex" component={Alex} />
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                Ant Design ©2018 Created by Ant UED
                            </Footer>
                        </Layout>
                    </Layout>
                </Router>
            </Fragment>
        );
    }
}

export default App;
