import request from "../utils/request";
import {extendObservable} from "mobx";

export default class baseState {

  constructor() {
    Object.getOwnPropertyNames(this.__proto__).forEach(k => {
      const item = this[k];
      if (typeof item === 'function') {
        const funStr = item.toString() || "";
        funStr.split(",").forEach(kv => {
          if (kv.split(":")[0].trim() === "loading") {
            let loadingKey = kv.split(":")[1].trim().replace(/"/g, "");
            if (loadingKey) {
              loadingKey += "Loading";
              if (!this.hasOwnProperty(loadingKey)) {
                const obj = {};
                obj[loadingKey] = false;
                extendObservable(this, obj);
              }
            }
          }
        });
      }
    });
  }

  fetch(data, success, fail) {
    const {setState, cache, loading = ""} = data;
    const loadingKey = (loading || "") + "Loading";
    if (loading) {
      // 自动管理loading，如果正在请求将返回
      if (this[loadingKey]) {
        return;
      }
      this[loadingKey] = true;
    }
    return request({
      url: data.url,
      method: data.method || 'post',
      data: data.data || {}
    }, res => {
      if (typeof cache !== "undefined") {
        const mergeKey = "merge_" + (cache || data.url);
        if (res && this[mergeKey] && res.currentPage !== 1) {
          res.result = this[mergeKey].result.concat(res.result);
        }
        this[mergeKey] = res;
      }
      if (setState) {
        if (typeof setState === "function") {
          setState.call(this, res);
        } else if (typeof this[setState] === "function") {
          this[setState](res);
        }
      }
      success && success(res);
      if (loading) {
        this[loadingKey] = false;
      }
    }, err => {
      fail && fail(err);
      if (loading) {
        this[loadingKey] = false;
      }
    });
  }
}
