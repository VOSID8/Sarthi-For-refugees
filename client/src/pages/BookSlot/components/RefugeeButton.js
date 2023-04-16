import { useState } from "react";
import styles from "../Styles/Button.module.css"

function RefugeeButton(props) {
    const [buttonClasses, setButtonClasses] = useState(styles.slotButton);

    const buttonClicked = () => {
        console.log("clicked")

        if(props.slot == props.value) {
            setButtonClasses(styles.slotButton);
        }else {
            props.changeValue(props.value);
            setButtonClasses(`${styles.slotButton} ${styles.selected}`) 
        }
    }


  return (
    <button onClick={buttonClicked} className={buttonClasses}>
        {props.value}
    </button>
  )
}

export default RefugeeButton