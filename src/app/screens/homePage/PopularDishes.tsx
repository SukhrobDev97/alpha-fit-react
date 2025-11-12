
import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import IconButton from "@mui/joy/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
/** REDUX SLICE & SELECTOR **/


const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

interface PopularDishesProps {
  onAdd: (item: CartItem) => void;
}

export default function PopularDishes({ onAdd }: PopularDishesProps) {
  const { authMember } = useGlobals();
  const { popularDishes } = useSelector(popularDishesRetriever);
  
  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Top Selling Products</Box>
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((ele: Product) => {
                const imagePath = `${serverApi}/${ele.productImages[0]}`;

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
                    _id: ele._id,
                    name: ele.productName,
                    price: ele.productPrice,
                    image: ele.productImages[0],
                    quantity: 1,
                  });
                };

                return (
                  <CssVarsProvider key={ele._id}>
                    <Card className="card">
                      <CardCover>
                        <img src={imagePath} alt="" />
                      </CardCover>

                      <CardCover className="card-cover" />

                      <Box className="product-interactive-layer">
                        <IconButton
                          size="lg"
                          variant="solid"
                          className="product-cart-button"
                          onClick={handleAddToCart}
                        >
                          <ShoppingCartIcon />
                        </IconButton>
                      </Box>

                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack flexDirection="row" justifyContent="space-between">
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {ele.productName}
                          </Typography>

                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {ele.productViews}
                            <VisibilityIcon
                              sx={{ fontSize: 25, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>

                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          px: 1.5,
                          py: 1.5,
                          borderTop: "1px solid",
                          borderColor: "divider",
                          height: "60px",
                        }}
                      >
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon />}
                          textColor="neutral.300"
                        >
                          {ele.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">No Popular Products!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}