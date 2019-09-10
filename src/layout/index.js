import React from 'react';
import {
    Layout
} from 'antd';
import SideBar from "./SideBar";
import {menuRoutes} from "../router";
import NavUtils from "../utils/NavUtils";
import TopBreadcrumb from "./TopBreadcrumb";
import {inject, observer} from "mobx-react";

const {
    Header, Content, Footer,
} = Layout;

@inject('appState')
@observer
export default class Layouts extends React.Component {

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    SideBar.refreshSelectedKeys();
  }

  render() {
    const {menuMap} = this.props.appState;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar data={menuMap} />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <TopBreadcrumb data={menuMap} />

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {
                menuRoutes(menuMap)
              }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            我一段底部描述
          </Footer>
        </Layout>
      </Layout>
    );
  }

  init = () => {
    // console.log(this.props.history);
    NavUtils.setHistory(this.props.history);
  };

}
