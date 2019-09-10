/**
 * Created by Zed on 2019/8/6.
 */
import React from 'react';
import {dispatchCustomEvent, removeAppLoading} from "../../utils/ComUtils";
import Const from "../../utils/Const";
import PageUtils from "../../utils/PageUtils";
import {inject, observer} from "mobx-react";

@inject('appState')
@observer
export default class AppIni extends React.Component {

  componentDidMount() {
    this.init();
  }

  async init() {
    if (Const.DO_NOT_GET_USER_INFO_WITH_LIST.indexOf(PageUtils.currentPath()) === -1) {
      // 获取用户信息
      await this.props.appState.getUserInfo();
    }
    this.props.appState.setAppLoaded(true);

    removeAppLoading();
    window.onhashchange = this.handelHashChange;
  }

  render() {
    return '';
  }

  /**
   * 监听hash改变，并发出
   */
  handelHashChange = () => {
    dispatchCustomEvent(Const.EVENT.EVENT_WINDOW_HASH_CHANGE);
  };

}
