import React from 'react'
import Loader from 'react-loader-spinner'
import styles from './loader.module.scss'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export const Load = () => (
    <div className={styles.loader}>
        <Loader
            type="Rings"
            color="#333333"
            height={200}
            width={100}
        />
    </div>
)


export const ModalLoader = () => (
    <div className={styles.modalloader}>
        <Loader
            type="ThreeDots"
            color="#333333"
            height={100}
            width={100}
        />
    </div>
)
