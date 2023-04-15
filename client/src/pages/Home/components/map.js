import styles from "../Styles/map.module.css"

function LocationMap() {
  return (
    <div className="container">
        <div className="mapContainer">
            <img src="http://res.cloudinary.com/slzr/image/upload/v1500321012/world-map-1500_vvekl5.png" />
            <div className={`${styles.point} ${styles.venezuela} ${styles.tippy}`} title="Venezuela"></div>
            <div className={`${styles.point} ${styles.brasil} ${styles.tippy}`} title="Brasil"></div>
            <div className={`${styles.point} ${styles.argentina} ${styles.tippy}`} title="Argentina"></div>
            <div className={`${styles.point} ${styles.colombia} ${styles.tippy}`} title="Colombia"></div>
            <div className={`${styles.point} ${styles.panama} ${styles.tippy}`} title="Panamá"></div>
            <div className={`${styles.point} ${styles.mexico} ${styles.tippy}`} title="Mexico"></div>
            <div className={`${styles.point} ${styles.usa} ${styles.tippy}`} title="Estados Unidos"></div>
            <div className={`${styles.point} ${styles.arabia} ${styles.tippy}`} title="Arabia Saudi"></div>
            <div className={`${styles.point} ${styles.turquia} ${styles.tippy}`} title="Turquía"></div>     
            <div className={`${styles.point} ${styles.rusia} ${styles.tippy}`} title="Rusia"></div>
            <div className={`${styles.point} ${styles.china} ${styles.tippy}`} title="China"></div>
            <div className={`${styles.point} ${styles.japon} ${styles.tippy}`} title="Japon"></div>
            <div className={`${styles.point} ${styles.australia} ${styles.tippy}`} title="Australia"></div>
        </div>
    </div>


  )
}

export default LocationMap