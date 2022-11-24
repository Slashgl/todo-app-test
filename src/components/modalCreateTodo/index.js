import React, {useEffect, useState} from "react";
import {addDoc, collection} from 'firebase/firestore';
import {db, storage} from "../../services/firebase";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {useForm} from "react-hook-form";
import {v4} from 'uuid';
import Input from "../input";
import styles from './styles.module.scss';

const ModalCreateTodo = ({setIsActiveModal}) => {
    const [imageUpload, setImageUpload] = useState();
    const {register, handleSubmit} = useForm();

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageUpload(e.target.files[0])
        }
    }

    const createUrlImages = async (data) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `image${v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then(url => {
                addDoc(collection(db, 'todos'), {
                    title: data.title, description: data.description, date: data.date, checked: false, img: url
                })
            })
            setImageUpload(null)
        })
    }

    const onSubmit = async (data) => {
        createUrlImages(data);
        setIsActiveModal(false);
    }

    useEffect(() => {
    }, [])

    return (
        <div className={styles.wrapper} onClick={() => setIsActiveModal(false)}>
            <form className={styles.content} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(onSubmit)}>
                <Input register={register} name={'title'} placeholder={'title'}/>
                <Input register={register} name={'description'} placeholder={'description'}/>
                <Input register={register} name={'date'} type={'date'} placeholder={'date'}/>
                <Input register={register} name={'file'} type={'file'} onChange={handleImageChange}/>
                <button className={styles.save}>Save</button>
            </form>
        </div>
    )
}

export default ModalCreateTodo