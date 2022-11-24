import React from "react";
import styles from './styles.module.scss';

const Input = ({placeholder, register, name, type, onChange}) => {
    return (
        <input className={styles.input} type={type} placeholder={placeholder} {...register(name)} onChange={onChange}/>
    )
}

export default Input