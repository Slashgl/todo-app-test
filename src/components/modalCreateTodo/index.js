import React from "react";
import {useForm} from "react-hook-form";
import Input from "../input";
import styles from './styles.module.scss';


const ModalCreateTodo = () => {
    const { register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data)

    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
                <Input register={register} name={'title'} placeholder={'title'}/>
                <Input register={register} name={'description'} placeholder={'description'}/>
                <Input register={register} name={'date'} placeholder={'date'}/>
                <button className={styles.save}>Save</button>
            </form>
        </div>
    )
}

export default ModalCreateTodo