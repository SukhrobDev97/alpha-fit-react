import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, colors, Container, Pagination, PaginationItem, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../../components/divider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useDispatch } from "react-redux";
import {  Dispatch } from "@reduxjs/toolkit";
import {setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { on } from "node:events";



/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});


const productsRetriever = createSelector(
  retrieveProducts, 
  (products) => ({products})
)

interface ProductsProps{
  onAdd: (item: CartItem) => void
}

export default function NewDishes(props: ProductsProps) {
  const {onAdd} = props
  const {setProducts} = actionDispatch(useDispatch());
  const {products}  = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: ""
  })

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  const brandData = [
    {
      name: "AlphaFit in London",
      image: "/img/london.jpg",
      location: "https://www.google.com/maps/search/?api=1&query=Unit+13+Waverley+Industrial+Park,+Hailsham+Drive,+Harrow,+HA1+4TR",
    },
    {
      name: "AlphaFit in Florida",
      image: "/img/florida.jpg",
      location: "https://www.google.com/maps/search/?api=1&query=Unit+13+Waverley+Industrial+Park,+Hailsham+Drive,+Harrow,+HA1+4TR",
    },
    {
      name: "AlphaFit in Scotland",
      image: "/img/scotland.jpg",
      location: "https://www.google.com/maps/search/?api=1&query=Unit+13+Waverley+Industrial+Park,+Hailsham+Drive,+Harrow,+HA1+4TR",
    },
    {
      name: "AlphaFit in Tokyo",
      image: "/img/tokyo.jpg",
      location: "https://www.google.com/maps/search/?api=1&query=Unit+13+Waverley+Industrial+Park,+Hailsham+Drive,+Harrow,+HA1+4TR",
    },
  ];


  useEffect(()=>{
    const product = new ProductService;
    product.getProducts( productSearch )
    .then((data)=> setProducts(data))
    .catch((err) => console.log(err))
  },[productSearch])

  useEffect(()=>{
    if(searchText === ""){
      productSearch.search = "";
      setProductSearch({...productSearch})
    }
  },[searchText])

  /* HANDLERS */

// handler for <dish-colection> process;
  const searchCollectionHandler = (collection: ProductCollection) =>{
    productSearch.page = 1
    productSearch.productCollection = collection;
    setProductSearch({...productSearch})
  }

  // handler for <dish-filter> process;
  const searchOrderHandler = (order: string) =>{
    productSearch.page = 1
    productSearch.order = order;
    setProductSearch({...productSearch})
  }

  const searchProductHandler = () =>{
    productSearch.search = searchText;
    setProductSearch({...productSearch})
  }

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({...productSearch})
  }

  const chosenDishHandler = (id: string) =>{
    history.push(`/products/${id}`)
  }

  return ( <div>
    <div className="products-frame">
      <Container>
        <Stack className="main">
          <Stack className="top-header">
            <Box className="brand-title">AlphaFit Store</Box>
            <Box className="search-box">
                 <input 
                    type="search" 
                    placeholder="Type here" 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) =>{
                      if(e.key === "Enter"){searchProductHandler()}
                    }}
                  />
                 <Button 
                    variant={"contained"} 
                    color={"primary"}
                    onClick={searchProductHandler}
                 >
                    <span>SEARCH</span>
                    <i className="fas fa-search"></i> 
                 </Button>
           </Box>
          </Stack>
          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
                <Button
                    variant={"contained"}
                    className={"order"}
                    color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                    onClick={() => searchOrderHandler("createdAt")}
                >
                    New
                </Button>
                <Button
                    variant={"contained"}
                    color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                    onClick={() => searchOrderHandler("productPrice")}
                    className={"order"}
                >
                    Price
                </Button>
                <Button
                    variant={"contained"}
                    color={productSearch.order === "productViews" ? "primary" : "secondary"}
                    onClick={() => searchOrderHandler("productViews")}
                    className={"order"}
                >
                    Views
                </Button>
            </Stack>
          </Stack>
          <Container className="dishes-container">
          <Stack className="dishes-category-section">
            <Stack className="dishes-order-box">
                <Button
                    variant={"contained"}
                    color={productSearch.productCollection === ProductCollection.OTHER ? "primary" : "secondary"}
                    className={"order"}
                    onClick={()=> searchCollectionHandler(ProductCollection.OTHER)}
                >
                    OTHER
                </Button>
                <Button
                    variant={"contained"}
                    color={productSearch.productCollection === ProductCollection.VITAMINS ? "primary" : "secondary"}
                    className={"order"}
                    onClick={()=> searchCollectionHandler(ProductCollection.VITAMINS)}

                >
                  VITAMINS
                </Button>
                <Button
                    variant={"contained"}
                    color={productSearch.productCollection === ProductCollection.SUPPLEMENT ? "primary" : "secondary"}
                    className={"order"}
                    onClick={()=> searchCollectionHandler(ProductCollection.SUPPLEMENT)}

                >
                    SUPPLEMENTS
                </Button>
                <Button
                    variant={"contained"}
                    color={productSearch.productCollection === ProductCollection.DESSERT ? "primary" : "secondary"}
                    className={"order"}
                    onClick={()=> searchCollectionHandler(ProductCollection.DESSERT)}

                >
                    DESSERT
                </Button>
                <Button
                    variant={"contained"}
                    color={productSearch.productCollection === ProductCollection.DISH ? "primary" : "secondary"}
                    className={"order"}
                    onClick={()=> searchCollectionHandler(ProductCollection.DISH)}

                >
                    DISH
                </Button>
            </Stack>
          </Stack>

            <Stack className="cards-frame">
            <CssVarsProvider>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`
                  const sizeVolume = product.productCollection === ProductCollection.VITAMINS ?
                     product.productVolume + "pcs" : product.productSize + " size"
                  return (
                    <Card 
                      key={product._id} 
                      variant="outlined" 
                      className="card"
                      onClick={() => chosenDishHandler(product._id)}
                    >
                      <CardOverflow className="image-wrapper">
                         <div className="product-sale">{sizeVolume}</div>
                            <AspectRatio ratio="1">
                            <div className="image-hover-wrapper">
                                 <img src={imagePath} alt="" className="card-img" />
                                  <div className="hover-overlay">
                                    <button 
                                      className="shop-btn"
                                      onClick={(e)=> {
                                        onAdd({
                                          _id: product._id,
                                          quantity: 1,
                                          name: product.productName,
                                          price: product.productPrice,
                                          image: product.productImages[0]
                                        })
                                        e.stopPropagation()
                                      }}
                                    >
                                      <i className="fas fa-shopping-cart"></i>                          
                                    </button>

                                  <div className="view-wrapper">
                                    <button className="view-btn">
                                      <i className="fas fa-eye"></i>
                                     </button>
                                    <span className="view-badge">{product.productViews}</span>
                                  </div>
                              </div>


                          </div>
    </AspectRatio>
  </CardOverflow>

  <CardOverflow variant="soft" className="product-detail">
    <Stack className="info">
      <Typography className="title">{product.productName}</Typography>
      <Box className="price-box">
        <Typography className="dollar-icon"><i className="fas fa-dollar-sign"></i></Typography>
        <Typography className="price"> {product.productPrice}</Typography>
      </Box>
    </Stack>
  </CardOverflow>
</Card>
                  );
                })
              ) : (
                <Box className="no-data">No  Products Available!</Box>
              )}
            </CssVarsProvider>
            <Stack className="pagination-section">
            <Pagination
               count={products.length !== 0 ?
                productSearch.page + 1 :
                productSearch.page
               }
               page={productSearch.page}
               renderItem={(item) => (
              <PaginationItem
                components={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
               {...item}
               color="secondary"
              />
           )}
           onChange={paginationHandler}
            />
            </Stack>
          </Stack>
          </Container>
        </Stack>
      </Container>
    
     

    </div>
    

   <div className="brands-logo">
  <Container className="brands-logo-container">
    <Stack className="brands-logo-title">Brand Locations</Stack>
    <Stack className="brands-logo-img" flexDirection={"row"}>
  {brandData.map((brand, i) => (
    <Box key={i} className="brand-card">
      <img src={brand.image} alt={brand.name} />
      <Box textAlign="center" mt={1}>
        <a
          href={brand.location}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#00bcd4",
            fontWeight: "bold",
            fontSize: 20
          }}
        >
           View on Map
        </a>
      </Box>
    </Box>
  ))}
</Stack>

  </Container>
</div> 
      <div className={"address"}>
        <Container>
            <Stack className="address-area">
                <Box className="title">Our current address</Box>
                <iframe 
                    style={{marginTop: "60px"}}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2464.4945209487084!2d0.16309157663937023!3d52.253967557127264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8719b77eb52e9%3A0x6e0f7bdc9735b5e2!2sAlphafit%20Performance%20Centre!5e0!3m2!1sen!2suk!4v1697034775094!5m2!1sen!2suk"
                    width={1320}
                    height={500}
                    referrerPolicy="no-referrer-when-downgrade"
                >
                    
                </iframe>
            </Stack>
        </Container>
      </div>

</div>
  );
}