import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

export default function Favourites() {
  const {favoritesRecipe} = useContext(GlobalContext);
  
    return (
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {
        favoritesRecipe && favoritesRecipe.length > 0 ?
        (favoritesRecipe.map((item) => <RecipeItem item={item} />))
        : <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">Nothing is added to favorites</p>
        </div>
      }
    </div>
    );
  }
  