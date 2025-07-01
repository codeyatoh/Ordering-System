import React from 'react'
import styles from './dininglocation.module.css'
import Logo from '../../assets/images/logo.png'
import DineInImage from '../../assets/images/dine-in.png' 
import TakeOutImage from '../../assets/images/take-out.png'
function DiningLocation() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} alt="AJH Logo" className={styles.logo} />
        <h1 className={styles.title}>Dining Location</h1>
      </div>

      <div className={styles.optionsContainer}>
        <div className={styles.optionCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.optionTitle}>Dine-In</h2>
          </div>
          <div className={styles.imageContainer}>
            <img src={DineInImage} alt="Dine-in restaurant interior" className={styles.optionImage} />
          </div>
          <div className={styles.cardFooter}>
            <p className={styles.description}>Enjoy your coffee and pastries in our cozy cafe</p>
          </div>
        </div>

        <div className={styles.optionCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.optionTitle}>Take-Out</h2>
          </div>
          <div className={styles.imageContainer}>
            <img src={TakeOutImage} alt="Take-out coffee and pastries" className={styles.optionImage} />
          </div>
          <div className={styles.cardFooter}>
            <p className={styles.description}>Order to go and enjoy anywhere</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiningLocation