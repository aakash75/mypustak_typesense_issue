import React from 'react'
import styles from "../../styles/CategoryNavbar.module.css";
import CategoriesDrawer from "../Drawers/CategoriesDrawer2";
const AllCategory = (props) => {
  return (
      <div className='d-none  d-sm-flex'>

          <div className={styles.navmainDiv}>
              <CategoriesDrawer
                  drawer={props.drawer}
                //   setdrawer={props.setdrawer}
              />
               
          </div>
    </div>
  )
}

export default AllCategory