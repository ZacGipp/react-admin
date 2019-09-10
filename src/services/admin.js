/**
 * Created by Zed on 2019/8/9.
 */
import apiUrl from "../utils/apiUrl";
import request from "../utils/request";

// 用户列表
export function getUserPage(data) {
  return request({
    url: apiUrl.ADMIN.USER_LIST,
    data,
  });
}
