import React, { useEffect, useState } from 'react';
import '../styles/CategoriesHome.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CategoriesHome = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
      setItems(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className='home-categories-container' id='popular'>
      <div className="popular-categories-body">
        <h3>Most Popular Categories</h3>
        <p>Be sure not to miss out on these most popular categories. Enjoy trying them out!</p>

        {categories.length > 0 ? (
          <div className="popular-categories">
            {categories.slice(0, 9).map((category, index) => (
              <div 
                className="popular-category" 
                key={index} 
                onClick={() => navigate(`/category/${category.strCategory}`)}
              >
                <img src={category.strCategoryThumb} alt={category.strCategory} />
                <span>
                  <h4>{category.strCategory}</h4>
                  <p>View All Recipes</p>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="popular-dishes-body" id='recipes'>
        <h3>Trending Dishes</h3>

        {items.length > 0 ? (
          <div className="popular-dishes">
            <span className='dishes-small'>
              {[6, 7, 8].map((index) => 
                items[index] && (
                  <div key={index} className="popular-dish" onClick={() => navigate(`/recipie/${items[index].idMeal}`)}>
                    <img src={items[index].strMealThumb} alt={items[index].strMeal} />
                    <p>{items[index].strMeal}</p>
                  </div>
                )
              )}
            </span>
            <span className='dishes-big'>
              {[0, 5].map((index) => 
                items[index] && (
                  <div key={index} className="popular-dish" onClick={() => navigate(`/recipie/${items[index].idMeal}`)}>
                    <img src={items[index].strMealThumb} alt={items[index].strMeal} />
                    <p>{items[index].strMeal}</p>
                  </div>
                )
              )}
            </span>
            <span className='dishes-small'>
              {[2, 3, 4].map((index) => 
                items[index] && (
                  <div key={index} className="popular-dish" onClick={() => navigate(`/recipie/${items[index].idMeal}`)}>
                    <img src={items[index].strMealThumb} alt={items[index].strMeal} />
                    <p>{items[index].strMeal}</p>
                  </div>
                )
              )}
            </span>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesHome;
