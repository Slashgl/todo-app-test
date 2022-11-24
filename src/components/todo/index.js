import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import {db} from "../../services/firebase";
import {query, collection, onSnapshot, deleteDoc, doc} from 'firebase/firestore';
import {GetTodos, setTodos} from "../../store";
import ButtonCreateTodo from "../button";
import ModalCreateTodo from "../modalCreateTodo";
import ModalUpdateTodo from "../modalUpdateTodo";
import styles from './styles.module.scss';

const Todo = () => {
    const dispatch = useDispatch();
    const [isActiveModal, setIsActiveModal] = useState(false);
    const [isActiveModalEdit, setIsActiveModalEdit] = useState(false);
    const [activeTodo, setActiveTodo] = useState(null);
    const todos = GetTodos();

    // Првоерка истекло ли отведённое время на задачу
    const checkedTimeIsUp = (timestamp) => {
        const now = +dayjs()
        const time = new Date(timestamp).getTime()
        return now > time
    }

    const checkingForTimeOut = (todo) => {
        return checkedTimeIsUp(todo.date) ? styles.failed : styles.todo
    }

    // Достаём данные из бд и записываем из в store
    const setDataInArray = () => {
        const q = query(collection(db, 'todos'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
                todosArr.push({...doc.data(), id: doc.id})
            });
            dispatch(setTodos(todosArr))
        })
        return () => unsubscribe()
    }

    // Проверка на открыто ли модалка
    // Установка активного туду
    const handleClickTodo = (todo) => {
        setIsActiveModalEdit(true)
        setActiveTodo(todo.id)
    }

    useEffect(() => {
        setDataInArray()
    }, [dispatch])

    return (<>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>To Do App</h1>
            <ButtonCreateTodo setIsActiveModal={setIsActiveModal}/>
            <div className={styles.line}></div>
            <ul className={styles.todos}>
                {todos?.map(todo => (
                    <li className={todo.checked ? todo.checked ? styles.checked : styles.todo : checkingForTimeOut(todo)} key={todo?.id} onClick={() => handleClickTodo(todo)}>
                        <img className={styles.images} src={todo.img} alt={'img'}/>
                        <div className={styles.name}>{todo?.title}</div>
                        <div className={styles.description}>{todo?.description}</div>
                        <div className={styles.date}>{todo.date}</div>
                        <div className={styles.delete} onClick={(e) => {
                            e.stopPropagation()
                            deleteDoc(doc(db, 'todos', todo.id))
                        }}></div>
                    </li>
                ))}
            </ul>
        </div>
        {isActiveModal && <ModalCreateTodo setIsActiveModal={setIsActiveModal}/>}
        {isActiveModalEdit && <ModalUpdateTodo setIsActiveModalEdit={setIsActiveModalEdit} activeTodo={activeTodo}/>}
    </>)
}

export default Todo