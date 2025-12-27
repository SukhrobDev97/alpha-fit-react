import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/joy/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const handleCardClick = (productId: string) => {
    history.push(`/products/${productId}`);
  };

  const handleViewDetails = (
    event: React.MouseEvent<HTMLElement>,
    productId: string
  ) => {
    event.stopPropagation();
    history.push(`/products/${productId}`);
  };

  const handleAddToCart = (
    event: React.MouseEvent<HTMLElement>,
    product: Product
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
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">
            <span className="title-text">Our latest products</span>
            <span className="title-accent"></span>
          </Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume = product.productCollection === ProductCollection.VITAMINS
                    ? product.productVolume + "pcs"
                    : product.productSize + " size";

                  return (
                    <Card
                      key={product._id}
                      className="premium-product-card"
                      onClick={() => handleCardClick(product._id)}
                    >
                      <Box className="card-badge-top">New</Box>
                      <Box className="card-image-container">
                        <img
                          src={imagePath}
                          alt={product.productName}
                          className="card-product-image"
                        />
                        <Box className="card-image-overlay"></Box>
                        <Box className="card-size-badge-absolute">{sizeVolume}</Box>
                        <Box className="card-hover-actions">
                          <Button
                            className="view-details-btn"
                            onClick={(e) => handleViewDetails(e, product._id)}
                            endDecorator={<ArrowForwardIcon />}
                          >
                            View details
                          </Button>
                          <IconButton
                            className="card-cart-btn"
                            onClick={(e) => handleAddToCart(e, product)}
                            title="Add to cart"
                          >
                            <ShoppingCartIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <CardOverflow className="card-content-section">
                        <Stack spacing={1.5}>
                          <Box className="card-header-row">
                            <Typography className="card-product-name">
                              {product.productName}
                            </Typography>
                            <Box className="card-views" title={`${product.productViews} views`}>
                              <VisibilityIcon className="views-icon" />
                              <span>{product.productViews}</span>
                            </Box>
                          </Box>
                          <Box className="card-price-row">
                            <Typography className="card-price">
                              ${product.productPrice}
                            </Typography>
                          </Box>
                          {product.productDesc && (
                            <Typography className="card-description">
                              {product.productDesc}
                            </Typography>
                          )}
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