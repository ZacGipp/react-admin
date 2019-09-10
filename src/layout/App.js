import React from 'react';
import AppIni from "../component/layout/AppIni";
import appRoutes from "../router";
import {inject, observer} from "mobx-react";

@inject('appState')
@observer
export default class App extends React.Component {
  render() {
    const {appLoaded} = this.props.appState;
    return (
      <div>
        <AppIni />
        {
          appLoaded && appRoutes()
        }
      </div>
    );
  }
}
