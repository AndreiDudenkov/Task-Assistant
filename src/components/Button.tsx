import React from 'react';


type propsType = {
    name: string
    callback: () => void
}


export const Buttoon = (props:propsType) => {

    const onClickHandler = () => {
       props.callback()

    }

    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}
