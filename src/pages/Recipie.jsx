import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import '../styles/Recipie.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Recipie = () => {
  const { id } = useParams();
  const [recipie, setRecipie] = useState({});

  useEffect(() => {
    fetchRecipie();
  }, [id]);  // ✅ Added 'id' as a dependency

  const fetchRecipie = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setRecipie(response.data.meals ? response.data.meals[0] : {}); // ✅ Prevent errors if API returns null
      console.log(response.data.meals ? response.data.meals[0] : {});
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  return (
    <div className='Recipie-page'>
      {recipie.strMeal ? (
        <>
          <div className="recipie-img">
            <img src={recipie.strMealThumb} alt={recipie.strMeal} />
          </div>

          <div className="recipie-data-container">
            <div className="recipie-data">
              <div className="recipie-header">
                <h4>{recipie.strMeal}</h4>
                <div className="recipie-specials">
                  <p>{recipie.strArea}</p>
                  <p>{recipie.strCategory}</p>
                </div>
              </div>

              <div className="procedure">
                <h5>Procedure</h5>
                <p>{recipie.strInstructions}</p>
              </div>

              {recipie.strYoutube && (
                <div className="youtube-video-container">
                  <h5>Video Tutorial</h5>
                  <YouTube
                    className='youtube-video'
                    videoId={recipie.strYoutube.split('v=')[1]}
                    opts={{ height: '315', width: '560' }}
                  />
                </div>
              )}
            </div>

            <div className="ingredients-container">
              <h3>Ingredients</h3>
              <ul className="ingredients">
                {Object.entries(recipie)
                  .filter(([key, value]) => key.startsWith("strIngredient") && value)
                  .map(([key, value]) => {
                    const ingredientNumber = key.slice("strIngredient".length);
                    const measure = recipie[`strMeasure${ingredientNumber}`] || "";

                    return (
                      <li key={key} className="ingredient">
                        <h5>{value}</h5>
                        <p>{measure}</p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Recipie;
