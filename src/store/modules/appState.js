import {action, observable} from "mobx";
import _ from "lodash";
import {filterAsyncRouter} from "../../router";
import configMenu from "../../router/menuMap";
import request from "../../utils/request";
import apiUrl from "../../utils/apiUrl";
import baseState from "../baseState";

export default class appState extends baseState {
  @observable userInfo = '';
  @observable appLoaded = false;
  @observable menuMap = [];

  @action
  setUserInfo(data) {
    this.userInfo = data;
    this.setMenuMap(data);
  }

  @action
  setAppLoaded(bool) {
    this.appLoaded = bool;
  }

  @action
  setMenuMap(data) {
    const {urls = {}, type} = data;
    // 此处通过用户信息接口的urls、type字段控制访问者可访问的路由数组
    // type === 1时为金麦客超级管理员，urls为空，此时返回所有路由
    this.menuMap = (type !== 1 && _.isEmpty(urls)) ? [] : filterAsyncRouter(_.cloneDeep(configMenu), urls);
  }

  // 获取用户信息
  getUserInfo = () => {
    return this.fetch({
      url: apiUrl.GET_USER_INFO,
      setState: this.setUserInfo,
    });
  };

}

export function login(userInfo) {
  let {username, password, validateCode, validateCodeKey} = userInfo;
  const validMark = '%jmake&';
  const formatKey = '@';
  const formatStr = validMark + formatKey + validMark;
  let loginName = username.trim();
  loginName = formatStr.replace(formatKey, loginName);
  password = formatStr.replace(formatKey, password);
  const data = {
    loginName,
    password
  };

  const token = sessionStorage.getItem('accessToken'); // 扫码登录时存下的accessToken
  return request({
    url: apiUrl.LOGIN,
    headers: {
      validateCode: validateCode,
      validateCodeKey: validateCodeKey,
      'AAA-Token': token || ''
    },
    data,
  });
}
