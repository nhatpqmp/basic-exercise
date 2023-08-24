import React from 'react';

const HelloWorld = ({name}) => {
    return (
        <h1>
            HelloWorld. My name is: {{name}}
        </h1>
    );
};

export default HelloWorld;