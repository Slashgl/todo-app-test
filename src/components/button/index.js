import React from "react";
import styles from './styles.module.scss';

const ButtonCreateTodo = ({setIsActiveModal}) => {
    return (
        <button className={styles.input} onClick={() => setIsActiveModal(true)}>Create Todo</button>
    )
}

export default ButtonCreateTodo