/* eslint-env browser */
'use strict';

import React, { Component, DOM, PropTypes } from 'react';
import init from './init';
import { scriptPath } from './constants';

class YMInitializer extends Component {

    componentDidMount() {
        init(this.props.accounts, this.props.options, this.props.version);
        let insertPoint = document.getElementsByTagName('script')[0];
        let el = document.createElement('script');
        el.type = 'text/javascript';
        el.async = true;
        el.src = scriptPath(this.props.version);
        insertPoint.parentNode.insertBefore(el, insertPoint);
    }

    render() {
        return this.props.children || DOM.script(null);
    }

}

YMInitializer.displayName = 'YMInitializer';

YMInitializer.propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.number).isRequired,
    options: PropTypes.object,
    version: PropTypes.oneOf(['1', '2'])
};

YMInitializer.defaultProps = {
    options: {},
    version: '1'
};

export { YMInitializer };
