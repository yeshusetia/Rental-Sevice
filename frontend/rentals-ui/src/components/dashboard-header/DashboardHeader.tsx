import React from 'react'
import '../../styles/styles.scss';
import add from '../../app/assets/plus.svg'

function DashboardHeader() {
  return (
    <div className='top-header d-flex just-end' >

      <div className="post-property-btn d-flex gap-8">
        <img src={add} alt="" />
        <span className='white'>Post Listing </span>
      </div>
    
    </div>
  )
}

export default DashboardHeader
