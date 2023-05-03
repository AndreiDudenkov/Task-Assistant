import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title:string) => void
    maxTitleLength: number
    recommendedTitleLength: number
}


export  const AddItemForm: FC<AddItemFormType> = ({addItem, maxTitleLength, recommendedTitleLength }) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean>(false)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }


    const isAddTaskNotPossible: boolean = !title.length || title.length > maxTitleLength || error

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            addItem(title.trim());

        } else {
            setError(true);
        }
        setTitle("");
    }

    const onKeyUpHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()


    const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{color: 'orange'}}>Title should be shooter</div>

    const longTitleErrorMessage = title.length > maxTitleLength &&
        <div style={{color: '#f23391'}}>Title is too long!!!</div>

    const errorMessage = error && <div style={{color: '#f23391'}}>Title is hard required!</div>
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyUpHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTaskHandler} disabled={isAddTaskNotPossible}>+</button>
            {longTitleWarningMessage}
            {longTitleErrorMessage}
            {errorMessage}
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

