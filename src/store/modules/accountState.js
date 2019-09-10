import {action, observable} from "mobx";
import request from "../../utils/request";
import apiUrl from "../../utils/apiUrl";
import baseState from "../baseState";

export default class accountState extends baseState {
  @observable rolePage = '';
  @observable userPage = '';

  @action
  setRolePage(data) {
    this.rolePage = data;
  }

  @action
  setUserPage(data) {
    this.userPage = data;
  }

  // 角色列表
  getRolePage(data) {
    return this.fetch({
      url: apiUrl.ACCOUNT.ALL_ROLE_LIST,
      data,
      setState: this.setRolePage,
    });
  }

  // 用户列表
  getUserPage(data) {
    return this.fetch({
      url: apiUrl.ADMIN.USER_LIST,
      data,
      setState: this.setUserPage,
    });
  }
}

// 角色修改
export function roleModify(data) {
  return request({
    url: apiUrl.ACCOUNT.ROLE_MODIFY,
    data,
  });
}

// 角色删除
export function roleDelete(data) {
  return request({
    url: apiUrl.ACCOUNT.ROLE_DELETE + data.id,
  });
}
