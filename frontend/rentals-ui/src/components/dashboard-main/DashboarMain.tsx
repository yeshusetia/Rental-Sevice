import React, { useState, useEffect } from 'react';
import DashboardHeader from '../dashboard-header/DashboardHeader';
import '../../styles/styles.scss';
import Chip from './chip/chip';
import Category from './category-card/category';
import { subCategoriesData, chips } from '../../constants/subCategoriesData';
import CardComponent from '../common-components/card-components/CardComponent';
import '../componets.styles.scss';
import categoriesData from '../../constants/categories.json';
import { useRentals } from '../../context/RentalContext';
import InsightComponent from '../common-components/insight-component/InsightComponent';
import CitiesComponent from '../common-components/cities-component/CitiesComponent';

function DashboarMain() {
  const { rentals, setRentals } = useRentals();
  const [filteredRentals, setFilteredRentals] = useState(rentals);
  const [activeChip, setActiveChip] = useState('PROPERTY'); // Default active chip
  const { activeCategory, setActiveCategory } = useRentals();
  const [activeSubCategory, setActiveSubCategory] = useState('-1'); // Default to 'All Items'

  // Define subcategories based on active category
  const subCategories = [
    { label: 'All Items', value: '-1' },
    ...subCategoriesData[activeCategory] 
  ];

  // Handle subcategory selection and filtering
  const handleCategoryClick = (subCategory: string) => {
    setActiveSubCategory(subCategory);

    if (subCategory === '-1') {
      // Show all items when 'All Items' is selected
      setFilteredRentals(rentals);
    } else {
      // Filter rentals based on the selected subcategory
      const filtered = rentals.filter((rental: any) => rental.category === subCategory);
      setFilteredRentals(filtered);
    }
  };

  // When the active category changes, select "All Items" by default and filter rentals
  useEffect(() => {
    setActiveSubCategory('-1'); // Reset to 'All Items' when category changes
    setFilteredRentals(rentals); // Show all rentals initially
  }, [activeCategory, rentals]);

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
              {chips.map((chip: any) => (
                <Chip
                  key={chip.value}
                  label={chip.label}
                  isActive={activeChip === chip.value}
                  onClick={() => {
                    setActiveChip(chip.value);   // Update the local state
                    setActiveCategory(chip.value);  // Update the context state
                  }}
                />
              ))}
            </div>

            <div className="search-compo"></div>
          </div>
        </div>

        <div className="page-two" style={{ height: '1000px' }}>
          <div className="width-100 d-flex just-center">
            <span className='h2-b'>Browse From Top Categories</span>
          </div>

          <div className="categories d-flex gap-24 just-center pt-32">
            {categoriesData[activeCategory as keyof typeof categoriesData].map((category: any) => (
              <Category
                key={category.name}
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
            {subCategories.map((spaceCategory) => (
              <div
                key={spaceCategory.value}
                onClick={() => handleCategoryClick(spaceCategory.value)}
                className={`space-category ${activeSubCategory === spaceCategory.value ? 'active-space-category' : ''}`}
              >
                <span>{spaceCategory.label}</span>
              </div>
            ))}
          </div>

          <div className="cards-section d-flex just-center">
            {filteredRentals.map((rental: any) => (
              <CardComponent
                key={rental.id} // Add key to avoid warnings
                rental={rental}  // Passing the entire rental object
              />
            ))}
          </div>

          <div className="insights">
            <InsightComponent />
          </div>

          <div className="cities">
            <CitiesComponent />
          </div>

            

        </div>
      </div>
    </div>
  );
}

export default DashboarMain;

