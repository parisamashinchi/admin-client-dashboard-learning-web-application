import React from 'react';
import {Icon} from 'antd'

const navIcon = (props) => {
    let navIcons = false;
    if (props.items.icon) {
        navIcons = <span className="pcoded-micon">
            <Icon type={props.items.icon} />
        </span>;
    }
    return navIcons;
};

export default navIcon;