import React, { useEffect, useState } from 'react';
import '../styles/CategoryPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [id]);  // ✅ Correct dependency

  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
      setItems(response.data.meals || []); // ✅ Ensure `meals` is not null
      console.log(response.data.meals);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className='category-page'>
      <div className="categorypage-head">
        <h2>Category: <i>{id}</i></h2> 
        <div className='categorypage-head-options'>
          <p>Other popular categories:</p>
          <span>
            {["Chicken", "Vegetarian", "Starter", "Seafood", "Dessert"].map((category) => (
              <button key={category} onClick={() => navigate(`/category/${category}`)}>
                {category}
              </button>
            ))}
          </span>
        </div>
      </div>

      <div className="categorypage-body">
        {items.length > 0 ? (
          <div className="food-items">
            {items.map((item) => (
              <div key={item.idMeal} className="food-item" onClick={() => navigate(`/recipie/${item.idMeal}`)}>
                <img src={item.strMealThumb} alt={item.strMeal} />
                <h4>{item.strMeal}</h4>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Category;
