/* @flow */
import React,{Component} from 'react';
import type {ComponentType} from 'react';
/**
 * Create a wrapper composition to support Search Filter functionality
 * @param ComposedComponent
 * @returns {{Component}}
 */


function withSearchFilter(ComposedComponent:ComponentType<any>) {
    class DrawerWrapper extends Component {
        constructor(props){
            super(props);
            this.state = {filteredItems:[]};
        }
        toggleDrawer = (e) => {
            this.setState({isOpen: !this.state.isOpen});
        };
        closeDrawer = () => {
            this.setState({isOpen: false});
        };

        openDrawer = (e) => {
            this.setState({isOpen: true});
        };
        render(){
            return <ComposedComponent {...this.props} toggleDrawer={this.toggleDrawer} closeDrawer={this.closeDrawer}
                                      openDrawer={this.openDrawer} isDrawerOpen={this.state.isOpen}/>;
        }
    }

    return DrawerWrapper;
}

export default withSearchFilter;
