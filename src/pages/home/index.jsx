import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

export default function Home() {
  const {loading, recipeList} = useContext(GlobalContext);
  
  if(loading) <h1>Loading ! Please wait</h1>
    return (
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {
        recipeList && recipeList.length > 0 ?
        (recipeList.map((item) => <RecipeItem item={item} />))
        : <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">Nothing to show</p>
        </div>
      }
    </div>
    );
  }
  