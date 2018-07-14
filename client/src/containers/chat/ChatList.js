import React from 'react';
import MenuList from "../../components/menu/MenuList";
const ChatList = ({children}) => (
    <MenuList className="flexbox-fill h-fill flex-column overflow-y-auto">
        {children}
    </MenuList>
);

export default ChatList;