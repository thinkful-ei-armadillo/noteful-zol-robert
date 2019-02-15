import React from 'react';

export default function ValidationError(props){
    if(props.hasError){
        return (
            <div>{props.message}</div>
        )
    }

    return <></>
}
