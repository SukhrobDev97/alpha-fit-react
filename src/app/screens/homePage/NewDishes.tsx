import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../../components/divider";
import IconButton from "@mui/joy/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
/** REDUX SLICE & SELECTOR **/


const newDishesRetriever = createSelector(
  retrieveNewDishes,
  (newDishes) => ({ newDishes })
);

interface NewDishesProps {
  onAdd: (item: CartItem) => void;
}

export default function NewDishes({ onAdd }: NewDishesProps) {
  const { authMember } = useGlobals();
  const { newDishes } = useSelector(newDishesRetriever);
      

  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Our latest products</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`

                const sizeVolume = product.productCollection === ProductCollection.VITAMINS ? 
                  product.productVolume + "pcs" : 
                  product.productSize + " size";

                const handleAddToCart = (
                  event: React.MouseEvent<HTMLButtonElement>
                ) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (!authMember) {
                    window.alert("You are not authenticated, please log in first");
                    return;
                  }
                  onAdd({
                    _id: product._id,
                    name: product.productName,
                    price: product.productPrice,
                    image: product.productImages[0],
                    quantity: 1,
                  });
                };

                  return (
                    <Card key={product._id} variant="outlined" className="card">
                      <CardOverflow className="product-media">
                        <div className="product-sale">{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          <img
                            src={imagePath}
                            alt={product.productName}
                            className="product-image"
                          />
                        </AspectRatio>
                        <div className="product-hover-overlay">
                          <IconButton
                            size="lg"
                            variant="solid"
                            className="product-cart-button"
                            onClick={handleAddToCart}
                          >
                            <ShoppingCartIcon />
                          </IconButton>
                        </div>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography className="title">
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className="price">${product.productPrice}</Typography>
                          </Stack>
                          <Stack>
                            <Typography className="views">
                              {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No New Products!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}