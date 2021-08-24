import styled from "styled-components";
import { useState, React } from "react";
import Axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import {
  Header,
  AppNameComponent,
  AppIcon,
  SearchComponent,
  SearchInput,
  SearchIcon,
} from "./components/header";

import {
  RecipeContainer,
  CoverImage,
  IngredientsText,
  SeeMoreText,
  RecipeName,
} from "./components/recipeComponent";

const APP_ID = "fded0516";
const APP_KEY = "8b81459b9f2a1b7394b704e5d05fb675";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeListContainer = styled.div`
  display: flex;
  fles-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 50%;
  height: 350px;
  margin: 50px;
  opacity: 60%;
`;

const RecipeComponent = (props) => {
  const [show, setShow] = useState(false);
  const { recipeObj } = props;
  return (
    <>
      <Dialog open={show}>
        <DialogTitle>INGREDIENTS</DialogTitle>
        <DialogContent>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {recipeObj.ingredients.map((ingredientObj) => (
                <tr>
                  <td>{ingredientObj.text}</td>
                  <td>{ingredientObj.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>

        <DialogActions>
          <IngredientsText onClick={() => window.open(recipeObj.url)}>
            See More
          </IngredientsText>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>

      <RecipeContainer>
        <CoverImage src={recipeObj.image} />
        <RecipeName>{recipeObj.label}</RecipeName>
        <IngredientsText onClick={() => setShow(true)}>
          Ingredients
        </IngredientsText>
        <SeeMoreText onClick={() => window.open(recipeObj.url)}>
          See Complete Recipe
        </SeeMoreText>
      </RecipeContainer>
    </>
  );
};

function App() {
  //debouncing method
  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  //fetch recipe method
  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    updateRecipeList(response.data.hits);
  };

  //debouncing
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtcCAyPHu_YQ6-hZpbYn6w8HJFItgH20IyVQ&usqp=CAU" />
          RECIPE - FINDER
        </AppNameComponent>
        <SearchComponent>
          <SearchIcon src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAARVBMVEX///+SkpLIyMj8/PyamprW1tbt7e3CwsKkpKTZ2dmWlparq6vk5OTn5+eurq6YmJi6urrx8fH39/ff39+8vLy0tLTQ0NDyM6iEAAACoElEQVR4nO1a7ZKDIAz0BETxs1r7/o96DWjbc2wVEsrcTPanI2YhmwCJWcZgMBgMBoPBYHijUHou5c8dspy1Kr5qfKwGa/oVcqjEl8y3g9ladzBD+wXzU71v3aFuIpsvusd0u1y1l1GI8dKqvHssShdTDUKvDtfNxuGi0ass8mhaKMplktOuCTEty1NGWoTKLXP3QWmNo2CqGPZzt/gH366cI3J6+879w3j03jjbF3UU+0adefUWg4Fd//5kkDc9uRcq6/7T4i6sEAiVWID+e4/gKnrPAZ8hIP6NV5JtgHJJlZGsAE/p74kboQwKG3++oyAaDY0TILvJw/jfYgQhdhT2p0BF28ih2J3r0Jl0NEvQwkSCTjpN8Mg/GMLnAWt3xdofIaCnsLGgnh6bC0BKMvAjQhIk5AGzsemQBLJBj4klkKHE2YcsaILdKCAOcNlQ4WK5899ENtC4LSVHH41m3BRgAWcUgRKXzCCNligCEMmX8OEXdBiAjL134idGCCI0AUQytXH4/wkkdUFyESYPw+SJCJmKNToVJ9+MCLZjhIYBMvGBJP2RLPmhVCCP5eECWpH6YoK9mhFc0IMvp8EDN2gCr+eK6nqOKVDg9oEVtkTj/amZSAEAW6W8+Y2hLFK5Mp2fO61wyMp0/oXK1g5AbkOv8CzVtrZUG5g/9xFQrPYUzRFcuf7UR6OU69eGxXy2YRGhZ3KuZaMeLVV6BpV17U/3QQnNa1eTnsHatqvfte0W8zIaA5EvDdKDxmUejcG71q1+PHat24gM1t7kG6wCickga6/9vnVzfebKqAwyceIHhrgMsvUXjrsozZtfOKIzOAQzYAbMgBkwA2bADPYZ4AqnBAzqZAQWBgkJOAbpXHCHquuk9hkMBoPBYDAYjA/4BSAFE6DlUZoJAAAAAElFTkSuQmCC" />
          <SearchInput placeholder="Search Recipe" onChange={onTextChange} />
        </SearchComponent>
      </Header>

      <RecipeListContainer>
        {recipeList.length ? (
          recipeList.map((recipeObj) => (
            <RecipeComponent recipeObj={recipeObj.recipe} />
          ))
        ) : (
          <Placeholder src="https://st3.depositphotos.com/1007168/14191/v/380/depositphotos_141911136-stock-illustration-burger-cartoon-character.jpg" />
        )}
        ;
      </RecipeListContainer>
    </Container>
  );
}

export default App;
