import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import MdSearch from  'react-icons/lib/md/search';
import MdClear from 'react-icons/lib/md/clear';
import {lightGray} from "../../themes/colors";

const iconStyle = {fontSize:25, fill:lightGray};

class SearchFilter extends Component {

    constructor(props){
        super(props);
        this.state = {filter:''}
    }

    handleInputChange = (e) => {
        const filter = e.target.value;
        this.setState({filter:filter});
        this.props.onChange(filter);
    };

    clearFilter = () => {
        this.setState({filter:''});
        this.props.onChange('');
    };

    render(){
        const {containerClassName, containerStyle, ...rest} = this.props;
        delete rest.onChange;
        const {filter} = this.state;
        return (
            <div className={`flexbox-fill flex-start-center filter-input ${containerClassName}`} style={containerStyle}>
                <MdSearch style={iconStyle}/>
                <Input onChange={this.handleInputChange} value={filter} className="p-0 w-fill" {...rest} placeholder="Search..."/>
                {filter && <MdClear style={iconStyle} onClick={this.clearFilter}/>}
            </div>
        )
    }
}

SearchFilter.propTypes = {
    onChange:PropTypes.func.isRequired,
    containerClassName:PropTypes.string,
    containerStyle:PropTypes.object
};

export default SearchFilter;