import React from 'react';
import './category.scss';
import '../../../styles/styles.scss';

const Category: any = ({ name, bgColor, iconPath }: any) => {
  return (
    <div className='category d-flex center-align gap-16' >
        <div className='d-flex box' style={{ backgroundColor: bgColor }}>
        <img src={iconPath}  />
        </div>
         <span>{name}</span>
    </div>
  );
};

export default Category;
