import React, {ChangeEvent} from 'react';


type SuperCheckBoxType = {
    isDone: boolean
    callback: (newIsDone:boolean) => void
}

export const SuperCheckBox = (props:SuperCheckBoxType) => {
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        props.callback(e.currentTarget.checked)
   }
    return (
        <input
            type='checkbox'
            checked={props.isDone}
            onChange={onChangeHandler}/>

    );
};

