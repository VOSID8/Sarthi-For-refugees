import { useState } from "react";
import styles from "../Styles/Button.module.css"

function Button(props) {
    const [buttonClasses, setButtonClasses] = useState(styles.slotButton);

    const buttonClicked = () => {
        console.log("clicked")

        if(props.slotList.includes(props.value)) {
            props.removeValue(props.value);
            setButtonClasses(styles.slotButton);
        }else {
            props.addValue(props.value);
            setButtonClasses(`${styles.slotButton} ${styles.selected}`) 
        }
    }


  return (
    <button onClick={buttonClicked} className={buttonClasses}>
        {props.value}
    </button>
  )
}

export default Button