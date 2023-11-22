import React from "react";
import { CssBaseline, Container, Grid } from "@mui/material";

import {
  useCreateSessionQuery,
  useLazyListProductsQuery,
} from "./services/caseStudyApi";

import { Navbar, ProductCard } from "./components";
import { useSelector } from "react-redux";

function App() {
  const { products, searchInput } = useSelector((state) => state.caseStudyUi);
  const { data, isSuccess } = useCreateSessionQuery();
  const [triggerListProducts, { isLoading, isError }] =
    useLazyListProductsQuery();

  React.useEffect(() => {
    if (isSuccess && data) {
      triggerListProducts();
    }
  }, [data, isSuccess, triggerListProducts]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{ backgroundColor: "#eee", height: "100vh" }}
      >
        <Navbar />
        <Grid
          container
          spacing={2}
          sx={{
            p: { xs: 2, md: 12 }, // 0 padding on xs, 20px (2*theme spacing unit) on md and up
          }}
        >
          {isLoading && <p>Loading products...</p>}
          {isError && <p>Error loading products.</p>}
          {products.length === 0 && searchInput && <p>Products not found.</p>}
          {products?.map((product, index) => (
            <Grid item xs={12} md={4} key={product.id}>
              <ProductCard product={product} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
