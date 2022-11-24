import React from "react";
import {useForm} from "react-hook-form";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../services/firebase";
import Input from "../input";
import {GetTodos} from "../../store";
import styles from './styles.module.scss';

const ModalUpdateTodo = ({setIsActiveModalEdit, activeTodo}) => {
    const {register, handleSubmit} = useForm();
    const todos = GetTodos()
    console.log(todos)

    const onSubmit = async (data) => {
        todos.map(todo => {
            if(todo.id === activeTodo) {
                updateDoc(doc(db, 'todos', todo.id), {
                    title: data.title
                })
            }
        })
        setIsActiveModalEdit(false)
    }

    const checkedTodo = () => {
       todos.map(todo => {
           if(todo.id === activeTodo) {
               updateDoc(doc(db, 'todos', todo.id), {
                   checked: !todo.checked
               })
           }
       })
        setIsActiveModalEdit(false)
    }

    return (
        <div className={styles.wrapper} onClick={() => setIsActiveModalEdit(false)}>
            <form className={styles.content} onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
                <Input register={register} placeholder={'edit'} name={'title'}/>
                <button type={'button'} className={styles.checked} onClick={() => checkedTodo()}>Success</button>
                <button className={styles.save}>Save</button>
            </form>

        </div>
    )
}

export default ModalUpdateTodo