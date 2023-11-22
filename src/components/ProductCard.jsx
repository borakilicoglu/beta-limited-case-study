import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { addToCart, removeFromCart } from "../features/caseStudySlice";

const productImages = [
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const StyledBadge = styled("div")(() => ({
  backgroundColor: "#d32f2f",
  color: "white",
  padding: "10px",
  borderRadius: "4px",
  position: "absolute",
  top: "8px",
  left: "8px",
  fontWeight: "bold",
  fontSize: "14px",
}));

export const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.caseStudyUi.cart);
  const inCart = cart.some((item) => item.id === product.id);
  const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;

  const handleIncrease = () => {
    dispatch(addToCart(product));
  };

  const handleDecrease = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <Card sx={{ position: "relative" }}>
      <StyledBadge>{product.discount}</StyledBadge>
      <CardMedia
        component="img"
        height="394"
        image={productImages[index]}
        alt="Fruits"
      />
      <CardContent
        sx={{
          display: "flex",
          minWidth: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Rating name="read-only" value={product.rating} readOnly /> (
            {product.rating})
          </Box>
          <Typography variant="h6" color="error">
            ${product.price}{" "}
            <Typography
              component="span"
              sx={{
                textDecoration: "line-through",
                color: "grey.500",
              }}
            >
              ${product.originalPrice}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ opacity: quantity === 0 ? 0 : 1 }}
            onClick={handleDecrease}
            aria-label="reduce quantity"
            disabled={quantity === 0}
          >
            <RemoveCircleOutlineIcon color="error" />
          </IconButton>

          <Typography sx={{ opacity: quantity === 0 ? 0 : 1 }}>
            {quantity}
          </Typography>
          <IconButton onClick={handleIncrease} aria-label="increase quantity">
            <AddCircleOutlineIcon color="error" />
          </IconButton>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          disabled={inCart}
          variant="contained"
          color="error"
          size="large"
          fullWidth
          onClick={handleIncrease}
        >
          {!inCart ? "Add to Card" : "Already in cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
