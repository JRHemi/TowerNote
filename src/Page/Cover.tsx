import styles from "./Cover.module.css"
import { useRef, ChangeEventHandler } from "react"

export const Cover = () => {

    const fileInputRef = useRef<HTMLInputElement>(null)

    const onChangeCoverImage = () => {
        fileInputRef.current?.click()
    }

    const onCoverImageUpload:ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.target;
        console.log(target?.files?.[0])
    }

    return (
        <div className={styles.cover}>
            <img src="https://static.vecteezy.com/system/resources/previews/022/737/904/non_2x/modern-city-scape-silhouette-simple-minimalist-blue-city-skyline-background-urban-cityscape-silhouettes-illustration-vector.jpg" alt="Cover" className={styles.image}/>
            <button className={styles.button} onClick={onChangeCoverImage}>Change cover</button>
            <input onChange={onCoverImageUpload} style={{ display: "none" }} ref={fileInputRef} type="file"/>
        </div>
    )
}