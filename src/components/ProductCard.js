import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ${product.cost}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <Rating name="read-only" value={product.rating} readOnly />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button  color="primary" variant="contained" className="card-button" onClick={handleAddToCart}>
        ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
