import React from 'react';
import FaUser from 'react-icons/lib/fa/user';
import {gray} from "../themes/colors";

const avatarStyle = {
    height:35,
    width:35,
    borderRadius:'50%',
    border:`1.5px solid ${gray}`
};
const Avatar = () => (
    <div className="flex-center" style={avatarStyle}>
        <FaUser style={{fontSize:25, color:gray}}/>
    </div>
);

export default Avatar;