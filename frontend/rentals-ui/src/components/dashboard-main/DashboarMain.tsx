import React, { useState, useEffect } from "react";
import DashboardHeader from "../dashboard-header/DashboardHeader";
import "../../styles/styles.scss";
import Chip from "./chip/chip";
import Category from "./category-card/category";
import { subCategoriesData, chips } from "../../constants/subCategoriesData";
import CardComponent from "../common-components/card-components/CardComponent";
import "../componets.styles.scss";
import categoriesData from "../../constants/categories.json";
import { useRentals } from "../../context/RentalContext";
import InsightComponent from "../common-components/insight-component/InsightComponent";
import CitiesComponent from "../common-components/cities-component/CitiesComponent";
import SearchBarComponent from "../common-components/searchbar-component/SearchBarComponent";

function DashboarMain() {
  const {
    rentals,
    activeCategory,
    activeLocation,
    searchQuery,
    setActiveCategory,
    setActiveSubCategory,
  } = useRentals();

  const [filteredRentals, setFilteredRentals] = useState(rentals);
  const [activeChip, setActiveChip] = useState("PROPERTY"); // Default active chip
  const [activeSubCategory, setActiveSubCategoryState] = useState("-1"); // Default to 'All Items'

  // Define subcategories based on active category
  const subCategories = [
    { label: "All Items", value: "-1" },
    ...subCategoriesData[activeCategory],
  ];

  // Handle subcategory selection and filtering
  const handleCategoryClick = (subCategory: string) => {
    setActiveSubCategoryState(subCategory); // Update subcategory locally
  };

  // Filtering logic inside useEffect
  useEffect(() => {
    let filtered = rentals;

    // Apply the subcategory filter
    if (activeSubCategory !== "-1") {
      filtered = filtered.filter((rental: any) => rental.category === activeSubCategory);
    }

    // Apply the search query filter (if provided)
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((rental: any) =>
        rental.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply the location filter (if not set to 'ALL')
    if (activeLocation !== "ALL") {
      filtered = filtered.filter((rental: any) => rental.location === activeLocation);
    }

    setFilteredRentals(filtered); // Update the filtered rentals state
  }, [activeSubCategory, searchQuery, activeLocation, rentals]);

  return (
    <div className="content-container d-flex flex-dir-col" style={{ width: "100%", height: "100%" }}>
      <DashboardHeader />
      <div className="bg-image d-flex just-center center-align">
        <div className="bg-img-main d-flex flex-dir-col gap-36">
          <div>
            <span className="fs-64">
              Discover Your <span>Perfect Items</span>
            </span>
          </div>
          <div className="d-flex just-center">
            <span className="fs-32">
              Sale and Rent Cars, Houses, and Items in Just a Few Clicks
            </span>
          </div>
          {/* Search bar section */}
          <SearchBarComponent />

          <div className="chips-main d-flex just-center">
            {chips.map((chip: any) => (
              <Chip
                key={chip.value}
                label={chip.label}
                isActive={activeChip === chip.value}
                onClick={() => {
                  setActiveChip(chip.value); // Update local state
                  setActiveCategory(chip.value); // Update context state
                }}
              />
            ))}
          </div>

          <div className="search-compo"></div>
        </div>
      </div>

      <div className="page-two" style={{ height: "1000px" }}>
        <div className="width-100 d-flex just-center">
          <span className="h2-b">Browse From Top Categories</span>
        </div>

        <div className="categories d-flex gap-24 just-center pt-32">
          {categoriesData[activeCategory as keyof typeof categoriesData].map((category: any) => (
            <Category key={category.name} name={category.name} bgColor={category.bgColor} iconPath={category.iconPath} />
          ))}
        </div>

        <div className="width-100 d-flex just-center pt-32">
          <span className="h2-b">Featured Listing</span>
        </div>

        <div className="space-categories d-flex gap-24 just-center pt-32 pb-32">
          {subCategories.map((spaceCategory) => (
            <div
              key={spaceCategory.value}
              onClick={() => handleCategoryClick(spaceCategory.value)}
              className={`space-category ${activeSubCategory === spaceCategory.value ? "active-space-category" : ""}`}
            >
              <span>{spaceCategory.label}</span>
            </div>
          ))}
        </div>

        <div className="cards-section d-flex just-center">
          {filteredRentals.map((rental: any, index: number) => (
            <CardComponent key={rental.id} rental={rental} style={{ animationDelay: `${index * 0.2}s` }} />
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
  );
}

export default DashboarMain;
