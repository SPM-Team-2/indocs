import React, { useRef } from 'react'
import ControlPoint from '../components/ControlPoint';
import styles from '../styles/edit.module.css'
import { useStoreState } from "easy-peasy";
import { useRouter } from 'next/router'

export default function edit() {
    const containerRef = useRef(null);
    const { images } = useStoreState((state) => state);
    const router = useRouter()
    // const srcObject = images[0].src;
    // const srcHeight = images[0].height;
    // const srcWidth = images[0].width;
    console.log(images)

    return (
        <div>
            <div className={styles.exit} onClick={() => router.back()}>X</div>
            <div className={styles.editPage}>
                <div className={styles.container} ref={containerRef}>
                    <ControlPoint container={containerRef} cssClass="top-left" initialDX={-10} initialDY={-10}></ControlPoint>
                    <ControlPoint container={containerRef} cssClass="top-right" initialDX={10} initialDY={-10}></ControlPoint>
                    <ControlPoint container={containerRef} cssClass="bottom-right" initialDX={50} initialDY={50}></ControlPoint>
                    <ControlPoint container={containerRef} cssClass="bottom-left" initialDX={-50} initialDY={50}></ControlPoint>
                </div>
                <div className={`${styles.button_container} ${styles.flex}`}>
                    <a href="/" className={`${styles.btn} ${styles.blue}`}>Edit</a>
                    <a href="/" className={`${styles.btn} ${styles.green}`}>Scan</a>
                </div>
                {
                    images.map((image) => {
                        return (
                            <img key={image.src} src={image.src} alt=""></img>

                        )
                    })
                }
            </div>
        </div>
    )
}
