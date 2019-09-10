/**
 * 数据状态管理
 */
import {store} from "rfx-core";
import appState from "./modules/appState";
import accountState from "./modules/accountState";

export default store.setup({
  appState,
  accountState,
});
