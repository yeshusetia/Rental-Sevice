import React, { useState } from 'react';
import DashboardHeader from '../dashboard-header/DashboardHeader';
import '../../styles/styles.scss';
import Chip from './chip/chip';
import Category from './category-card/category';
import thumbsUp from '../../app/assets/thumbs-up.svg';
import home from '../../app/assets/home.svg';
import compass from '../../app/assets/compass.svg';
import dollarSign from '../../app/assets/dollar-sign.svg';
import moreHorizontal from '../../app/assets/more-horizontal.svg';
import { click } from '@testing-library/user-event/dist/click';
import CardComponent from '../common-components/card-components/CardComponent';
import '../componets.styles.scss';
function DashboarMain() {

    const [activeChip, setActiveChip] = useState('Places'); // Default active chip
    const [activeSpaceCategory, setActiveSpaceCategory] = useState('-1'); 
    const chips = ['Places', 'Rides', 'Things'];
    const categories = [
        { iconPath: thumbsUp, name: 'Holiday Rentals', bgColor: '#FDEBEC' },
        { iconPath: home, name: 'Residential Spaces', bgColor: '#F1F8ED' },
        { iconPath: compass, name: 'Event Spaces', bgColor: '#F6EDF4' },
        { iconPath: dollarSign, name: 'Commercial Properties', bgColor: '#EAF2F9' },
        { iconPath: moreHorizontal, name: 'More', bgColor: '#FEF3EB' },
      ];
      const spaceCategories = [ 
        {label:'All Items',value:'-1'},
        {label:'Residential Spaces',value:'RESIDENTIAL'},
        {label:'Sports Venues',value:'SPORTS_VENUE'},
        {label:'Meeting Spaces',value:'MEETING_SPACE'},
        {label:'Vans & Buses',value:'VANS_BUSES'},
        {label:'Cars and Suvs',value:'CARS_SUVS'} 
    ];
    const cards=[1,2,3,4,5]

    const handleCategoryClick = (value: string) => {
        setActiveSpaceCategory(value);
      };

  return (
    <div>
      <div className="content-container d-flex flex-dir-col" style={{ width: '100%', height: '100%' }}>
        <DashboardHeader />
        <div className="bg-image d-flex just-center center-align">
           <div className="bg-img-main d-flex flex-dir-col gap-36">
            <div>
                <span className='fs-64'>Discover Your <span>Perfect Rental</span></span>
            </div>
            <div className='d-flex just-center'>
                <span className='fs-32'>Rent Cars, Houses, and Items in Just a Few Clicks</span>
            </div>

            <div className="chips-main d-flex just-center">
            {chips.map((chip) => (
                <Chip
                key={chip}
                label={chip}
                isActive={activeChip === chip}
                onClick={() => setActiveChip(chip)}
                />
            ))}
            </div>

            <div className="search-compo">

            </div>
           </div>
        </div>

        <div className="page-two" style={{ height: '1000px' }}>

            <div className="width-100 d-flex just-center ">
                <span className='h2-b'>Browse From Top Categories</span>
            </div>

           <div className="categories d-flex gap-24 just-center pt-32">
           {categories.map((category) => (
                <Category
                name={category.name}
                bgColor={category.bgColor}
                iconPath={category.iconPath}
                />
            ))}
           </div>

           <div className="width-100 d-flex just-center pt-32">
                <span className='h2-b'>Featured Listing</span>
            </div>

            <div className="space-categories d-flex gap-24 just-center pt-32">
                {spaceCategories.map((spaceCategory)=>(
                    <div onClick={()=>handleCategoryClick(spaceCategory.value)} className={`space-category ${activeSpaceCategory == spaceCategory.value  ? 'active-space-category' : ''}`} >
                        <span>{spaceCategory.label}</span>

                    </div>
                ))}

            </div>

            <div className="cards-section d-flex just-center">

                    {cards.map((card)=>(
                    <CardComponent/>
                    ))}
        
            </div>

        </div>
      </div>
    </div>
  );
}

export default DashboarMain;