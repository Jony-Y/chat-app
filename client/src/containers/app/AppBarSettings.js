import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from "../../components/buttons/IconButton";
import MdMoreVert from 'react-icons/lib/md/more-vert';
import {gray} from "../../themes/colors";
import Menu from "../../components/menu/Menu";
import MenuItem from "../../components/menu/MenuItem";
import withMenu from "../../components/menu/withMenu";
class AppBarSettings extends Component {
    render(){
        const {onLogout, closeMenu, toggleMenu, isMenuOpen, anchorEl} = this.props;
        return (
            <div>
                <IconButton onClick={toggleMenu} tooltip="Settings" className="icon-btn-sm"><MdMoreVert style={{fontSize:25, color:gray}}/></IconButton>
                <Menu anchorEl={anchorEl} open={isMenuOpen} onClick={toggleMenu} onClose={closeMenu}>
                    <MenuItem onClick={closeMenu && onLogout}>Logout</MenuItem>
                </Menu>
            </div>
        )
    }
}

AppBarSettings.propTypes = {
    onLogout:PropTypes.func.isRequired
};

export default withMenu(AppBarSettings);