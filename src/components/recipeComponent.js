import styled from "styled-components";

export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  background-color:black;
  box-shadow: 0 3px 10px 0 #aaa;
`;

export const CoverImage = styled.img`
  height: 200px;
  object-fit: cover;
`;

export const RecipeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IngredientsText = styled.span`
  font-size: 18px;
  border: solid 1px #ff006e;
  color: black;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  color: #ff006e;
  text-align: center;
`;

export const SeeMoreText = styled(IngredientsText)`
  color: #00f5d4;
  border: solid 1px #00f5d4;
`;
