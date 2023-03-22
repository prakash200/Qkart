import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [ loading, setloading ] = useState(false)
  const [ allProducts, setAllProducts ] = useState([])
  const [ filteredProducts, setfilteredProducts ] = useState([])
  const [ searchText, setSearchText ] = useState("")
  const [ debounceTimeOut, setdebounceTimeOut ] = useState(0)


  useEffect( ()=>{

    performAPICall();

    
  },[]);

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    setloading(true)
    try{
      let response = await axios.get(`${config.endpoint}/products`)
      setloading(false)
      setAllProducts(response.data)
      
    }catch(error){
      setloading(false)
      enqueueSnackbar(
        'Could not fetch products. Check that the backend is running, reachable and returns valid JSON.',
        {
          variant: 'error',
        },
      )
      
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    try{
      setSearchText(text)
      const response = await axios.get(`${config.endpoint}/products/search?value=${text}`)
      setfilteredProducts(response.data)
    }catch(error){
      
      if (error.response) {
        if (error.response.status === 404) {
          setfilteredProducts([])
        }

      }else {
        enqueueSnackbar(
          'Could not fetch products. Check that the backend is running, reachable and returns valid JSON.',
          {
            variant: 'error',
          },
        )
      }

    }
    
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    // console.log(debounceTimeOut)
    const value = event.target.value
    if (debounceTimeOut){
      clearTimeout(debounceTimeOut)
    }

    const timeout = setTimeout(()=>{
      console.log("5 milli seconds done!!!!")
      performSearch(value)
    },500)
    // console.log(timeout)
    setdebounceTimeOut(timeout)
    
  };






  return (
    <div>
      {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
      <Header>

        <TextField
        className="search-desktop"
        size="small"
        // style={{margin:"100px"}}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        onChange={(event)=> debounceSearch(event, debounceTimeOut)}
        placeholder="Search for items/categories"
        name="search"
      />

      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        onChange={(event)=> debounceSearch(event, debounceTimeOut)}
        placeholder="Search for items/categories"
        name="search"
      />
       <Grid container>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
       </Grid>
       {loading?(
        <Box className="loading">
        <CircularProgress />
        <h4>Loading Products...</h4>{' '}
      </Box>
       ):(
        <Grid container marginY="1rem" paddingX="1rem" spacing={2}>
              {' '}
              {searchText.length ? (filteredProducts.length ? (filteredProducts.map( (prod)=>(
                  <Grid item xs={6} md={3} key={prod._id}>
                    <ProductCard
                      product={prod}
                    />{' '}
                  </Grid>
                )

                )) : (  <Box className="loading">
                          <SentimentDissatisfied color="action" />
                          <h4 style={{ color: '#636363' }}> No products Found </h4>{' '}
                        </Box>
                  
                )

              ) : ( allProducts.map( (product) => (
                  <Grid item xs={6} md={3} key={product._id}>
                    <ProductCard
                      product={product}
                    />{' '}
                  </Grid>
                )
                )

              )}


              
            </Grid>
         
        
          
       )}
       
      <Footer />
    </div>
  );
};


export default Products;
