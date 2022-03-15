import React from "react";
// here we will use contex API to pass states from one component to another with not direct contact and without
// to pass the states between intermidiate components

// create a context for logged in so other comonents can access it directly
const AuthContex = React.createContext({ // takes default contex often an object
    isLogged: false,
    onLogOut: () => {}
});

export default AuthContex;