// AvatarContext.js
import React from 'react';

const AvatarContext = React.createContext({
    avatar: null,
    setAvatar: () => {},
    firstName: '', // new state
    setFirstName: () => {},
    lastName: '', // new state
    setLastName: () => {},
    placeholderText: '', // new state
    setPlaceholderText: () => {}, // new state
});

export default AvatarContext;