// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Fetching Product Details
// export const showProduct = createAsyncThunk(
//   "showProduct",
//   async ({ rejectWithValue }) => {
//     const response = await fetch(
//       "https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products"
//     );
//     try {
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // Create a Product
// export const createProduct = createAsyncThunk(
//   "createProduct",
//   async (data, { rejectWithValue }) => {
//     const response = await fetch(
//       "https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     try {
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // Delete a product
// export const deleteProduct = createAsyncThunk(
//   "deleteProduct",
//   async (id, { rejectWithValue }) => {
//     const response = await fetch(
//       `https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products/${id}`,
//       {
//         method: "DELETE",
//       }
//     );
//     try {
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const ProductDetail = createSlice({
//   name: "productDetail",
//   initialState: {
//     products: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: {
//     [createProduct.pending]: (state, action) => {
//       state.loading = true;
//     },
//     [createProduct.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.products.push(action.payload);
//     },
//     [createProduct.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload.message;
//     },
//     [showProduct.pending]: (state, action) => {
//       state.loading = true;
//     },
//     [showProduct.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.products = action.payload;
//     },
//     [showProduct.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     [deleteProduct.pending]: (state) => {
//       state.loading = true;
//     },
//     [deleteProduct.fulfilled]: (state, action) => {
//       state.loading = false;
//       console.log("delete user", action.payload);
//     },
//     [deleteProduct.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export default ProductDetail.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetching Product Details
export const showProduct = createAsyncThunk(
  "productDetail/showProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a Product
export const createProduct = createAsyncThunk(
  "productDetail/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products/${id}`,
      {
        method: "DELETE",
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update data
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const ProductDetail = createSlice({
  name: "productDetail",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(showProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(showProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.products = state.products.filter((ele) => ele.id !== id);
        }

        console.log("delete ", action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default ProductDetail.reducer;
