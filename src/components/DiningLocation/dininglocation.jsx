import React from 'react'
import styles from './dininglocation.module.css'
import cardStyles from '../ui/cards/dine-take.module.css'
import Logo from '../../assets/images/logo.png'
import DineIn from "../ui/cards/dine-in";
import TakeOut from "../ui/cards/take-out";
function DiningLocation() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} alt="AJH Logo" className={styles.logo} />
        <h1 className={styles.title}>Dining Location</h1>
      </div>
      <div className={cardStyles.optionsContainer}>
        <DineIn />
        <TakeOut />
      </div>
    </div>
  )
}

export default DiningLocation