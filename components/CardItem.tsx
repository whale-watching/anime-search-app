import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 201px;
  height: 282px;
  border-radius: 10px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: white;
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, #ffffff 84%, #000000 100%);
`;
interface CardItemType {
  title: String;
  image_url: String;
}

const CardItem = (props: CardItemType) => {
  const { title, image_url } = props;
  return (
    <Card>
      <Title>{title}</Title>
    </Card>
  );
};

export default CardItem;
