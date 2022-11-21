import React, {useState} from "react";
import ButtonCreateTodo from "../button";
import ModalCreateTodo from "../modalCreateTodo";
import styles from './styles.module.scss';


const Todo = () => {
    const [isActiveModal, setIsActiveModal] = useState(false);

    const todos = [
        {title: 'react', id: 1, checked: false},
        {title: 'english', id: 2, checked: false},
        {title: 'dota2', id: 3, checked: true}
    ]

    return (
        <>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>To Do App</h1>
                <ButtonCreateTodo setIsActiveModal={setIsActiveModal}/>
                <div className={styles.line}></div>
                <ul className={styles.todos}>
                    {
                        todos.map(todo => (
                            <li className={styles.todo} key={todo.id}>{todo.title}</li>
                        ))
                    }
                </ul>
            </div>
            {
                isActiveModal && <ModalCreateTodo/>
            }
        </>
    )
}

export default Todo