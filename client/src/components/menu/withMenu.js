/* @flow */
import React,{Component} from 'react';
import type {ComponentType} from 'react';
/**
 * Create a wrapper composition to support Menu functionality
 * @param ComposedComponent
 * @returns {{Component}}
 */


function withMenu(ComposedComponent:ComponentType<any>) {
    class MenuWrapper extends Component {
        constructor(props){
            super(props);
            this.state = {isOpen:false, anchorEl:null};
        }
        toggleMenu = (e) => {
            this.setState({isOpen: !this.state.isOpen, anchorEl:e.currentTarget});
        };
        closeMenu = () => {
            this.setState({isOpen: false, anchorEl:null});
        };

        openMenu = (e) => {
            this.setState({isOpen: true, anchorEl:e.currentTarget});
        };
        render(){
            return <ComposedComponent {...this.props} toggleMenu={this.toggleMenu} closeMenu={this.closeMenu}
                                      openMenu={this.openMenu} isMenuOpen={this.state.isOpen} anchorEl={this.state.anchorEl}/>;
        }
    }

    return MenuWrapper;
}

export default withMenu;
