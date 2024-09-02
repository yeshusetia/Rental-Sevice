import React from 'react'
import  '../card-components/CardComponent.scss'
import  '../../../styles/styles.scss'
import demoImg from '../../../app/assets/demo-house.png'
import heart from '../../../app/assets/heart.svg'
function CardComponent() {
  return (
  <div className="main-card d-flex flex-dir-col">

    <div className="photo">
        <img src={demoImg} alt="" />

    </div>
    <div className="bottom-card d-flex flex-dir-col gap-8">
        <div><span className='h5'>85,000 LKR</span> <span className='h6'>/Month</span></div>
        <div><span className='h5-b'>Luxury villa in Rego Park</span></div>
      
        <div className='d-flex center-align just-space width-100'>
            <span className='h6'>3 Bedrooms</span>
            <span className='separator'></span>
            <span className='h6'>2 Bathrooms</span>
            <span className='separator'></span>
            <span className='h6'>2500 Square FT</span>
        </div>

    </div>
    
    <div className="bottom-card-seller d-flex just-space center-align">
    <div className="seller-info d-flex gap-8 ">
        <div className="seller-name-alpha d-flex just-center center-align">
            <span className='h6'>M</span>
        </div>
        <div className="seller-name d-flex flex-dir-col just-center">
            <span className='h6'>
            Anne Liza
            </span>
            <span className='grey h7'>
            Property Seller
            </span>
        </div>
        
    </div>

     <div className="heart d-flex just-center center-align">
        <img src={heart} alt="" />

     </div>
    </div>

  </div>
  )
}

export default CardComponent
