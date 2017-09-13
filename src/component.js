/* eslint-env browser */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import init from './init';
import { scriptPath } from './constants';

class YMInitializer extends Component {

    componentDidMount() {
        init(this.props.accounts, this.props.options, this.props.version);
        let el = document.createElement('script');
        el.type = 'text/javascript';
        el.async = true;
        el.src = scriptPath(this.props.version);
        this.insertPoint.insertBefore(el, null);
    }

    render() {
        let setInsertPoint = (element) => {
            this.insertPoint = element;
        };
        return React.createElement(
            this.props.containerElement,
            {ref: setInsertPoint},
            this.props.children
        );
    }

}

YMInitializer.displayName = 'YMInitializer';

YMInitializer.propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.number).isRequired,
    containerElement: PropTypes.string,
    options: PropTypes.object,
    version: PropTypes.oneOf(['1', '2'])
};

YMInitializer.defaultProps = {
    containerElement: 'div',
    options: {},
    version: '1'
};

export { YMInitializer };
