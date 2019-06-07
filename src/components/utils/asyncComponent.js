import React from 'react';

export default function(fetchComponent) {
  return class AsyncComponent extends React.Component {
    constructor() {
      super();

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await fetchComponent();

      this.setState({ component });
    }

    render() {
      const { component: C } = this.state;

      return C && <C {...this.props}/>;
    }
  };
}