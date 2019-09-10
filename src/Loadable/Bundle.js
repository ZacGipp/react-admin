/**
 * Created by walljack@163.com on 2017/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import DefaultLoading from "./DefaultLoading";

class Bundle extends React.Component {

  state = {
    mod: null,
  };

  componentDidMount() {
    // 加载初始状态
    this.load(this.props);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {mod} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (mod !== prevState.mod) {
      return {
        mod: mod.default ? mod.default : mod,
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.load !== this.props.load) {
  //     this.load(nextProps);
  //   }
  // }
  //
  load(props) {
    // 重置状态
    this.setState({
      mod: null
    });
    // 传入组件的组件
    props.load(mod => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    // if state mode not undefined,The container will render children
    return this.state.mod ? this.props.children(this.state.mod) : <DefaultLoading />;
  }
}

Bundle.propTypes = {
  load: PropTypes.func,
  children: PropTypes.func
};

export default Bundle;
