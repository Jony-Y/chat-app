import React from 'react';
import PropTypes from 'prop-types';
import SearchFilter from "../../components/inputs/SearchFilter";
import SearchFilterBar from "../../components/inputs/SearchFilterBar";


const ChatList = ({chats, applyFilter}) =>(
    <div className="chat-list flex-start flex-column">
        <SearchFilterBar>
            <SearchFilter onFilter={(filter)=> console.log(filter)} containerClassName="m-t-10"/>
        </SearchFilterBar>
        <div className="flexbox-fill flex-column p-l-15 p-r-15">
            chat list here
        </div>
    </div>
);
ChatList.propTypes = {
  chats:PropTypes.array,
  applyFilter:PropTypes.func
};

export default ChatList;