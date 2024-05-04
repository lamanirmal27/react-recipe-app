import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesRecipe, setFavoriteRecipe] = useState([]);

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await response.json();

      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate(`/`)
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setSearchParam("");
    }
  }

  function handleAddToFavorite(getCurrentRecipe) {
    let cpyFavoriteItem = [...favoritesRecipe];
    const index = cpyFavoriteItem.findIndex(
      (item) => item.id === getCurrentRecipe.id
    );

    if (index === -1) {
      cpyFavoriteItem.push(getCurrentRecipe);
    } else {
      cpyFavoriteItem.splice(index);
    }

    setFavoriteRecipe(cpyFavoriteItem);
  }

  console.log(favoritesRecipe);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesRecipe
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
