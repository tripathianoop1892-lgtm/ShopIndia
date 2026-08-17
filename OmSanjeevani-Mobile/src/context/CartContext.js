import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCart,
  addToCart,
  removeCartItem,
} from "../services/api";

// ==========================================
// CART CONTEXT
// ==========================================

const CartContext = createContext(null);

// ==========================================
// CART PROVIDER
// ==========================================

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  // ==========================================
  // NORMALIZE CART RESPONSE
  // ==========================================

  const normalizeCart = (response) => {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.cart)) {
      return response.cart;
    }

    if (Array.isArray(response?.data?.cart)) {
      return response.data.cart;
    }

    return [];
  };

  // ==========================================
  // LOAD CART FROM BACKEND
  // ==========================================

  const loadCart = useCallback(async () => {
    try {
      setCartLoading(true);
      setCartError(null);

      const response = await getCart();

      const items = normalizeCart(response);

      setCartItems(items);
    } catch (error) {
      console.error("LOAD CART ERROR:", error);

      setCartError(
        error?.message || "Unable to load cart"
      );
    } finally {
      setCartLoading(false);
    }
  }, []);

  // ==========================================
  // LOAD CART ON PROVIDER START
  // ==========================================

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // ==========================================
  // ADD ITEM TO CART
  // ==========================================

  const addItemToCart = useCallback(
    async (medicine, quantity = 1) => {
      try {
        setCartError(null);

        const sellerId =
          medicine?.sellerId ||
          medicine?.ownerId ||
          medicine?.owner?._id;

        if (!sellerId) {
          throw new Error(
            "Seller identification is required"
          );
        }

        const payload = {
          medicineId:
            medicine?._id ||
            medicine?.medicineId,

          name: medicine?.name || "Medicine",

          company:
            medicine?.company || "",

          price: Number(
            medicine?.price ??
              medicine?.retailPrice ??
              medicine?.offerPrice ??
              medicine?.sellingPrice ??
              medicine?.mrp ??
              0
          ),

          image:
            medicine?.image || "",

          quantity:
            Number(quantity) || 1,

          sellingUnit:
            medicine?.sellingUnit ||
            "Pack",

          individualSaleAllowed:
            medicine?.individualSaleAllowed === true,

          packSize:
            Number(medicine?.packSize) || 1,

          sellerId,
        };

        const response =
          await addToCart(payload);

        const updatedItems =
          normalizeCart(response);

        setCartItems(updatedItems);

        // If backend response does not contain
        // the cart, reload it from server.
        if (updatedItems.length === 0) {
          await loadCart();
        }

        return response;
      } catch (error) {
        console.error(
          "ADD ITEM TO CART ERROR:",
          error
        );

        setCartError(
          error?.message ||
            "Unable to add item to cart"
        );

        throw error;
      }
    },
    [loadCart]
  );

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const removeItemFromCart =
    useCallback(async (item) => {
      try {
        setCartError(null);

        const name =
          item?.name;

        if (!name) {
          throw new Error(
            "Medicine name is required"
          );
        }

        const response =
          await removeCartItem(name);

        const updatedItems =
          normalizeCart(response);

        setCartItems(updatedItems);

        return response;
      } catch (error) {
        console.error(
          "REMOVE CART ITEM ERROR:",
          error
        );

        setCartError(
          error?.message ||
            "Unable to remove item"
        );

        throw error;
      }
    }, []);

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity =
    useCallback(
      async (item) => {
        try {
          const medicine = {
            _id: item?.medicineId,

            name: item?.name,

            company:
              item?.company || "",

            price:
              item?.price || 0,

            image:
              item?.image || "",

            sellerId:
              item?.sellerId,

            sellingUnit:
              item?.sellingUnit ||
              "Pack",

            individualSaleAllowed:
              item?.individualSaleAllowed === true,

            packSize:
              Number(item?.packSize) || 1,
          };

          await addItemToCart(
            medicine,
            1
          );
        } catch (error) {
          console.error(
            "INCREASE QUANTITY ERROR:",
            error
          );
        }
      },
      [addItemToCart]
    );

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================
  //
  // IMPORTANT:
  // Current backend does not have a dedicated
  // update-cart-quantity API.
  //
  // So we only change local state here for now.
  // Backend quantity update will be connected
  // after we create the proper endpoint.
  // ==========================================

  const decreaseQuantity =
    useCallback((item) => {
      setCartItems((previousItems) =>
        previousItems.map((cartItem) => {
          const sameItem =
            cartItem?.medicineId ===
            item?.medicineId;

          if (!sameItem) {
            return cartItem;
          }

          const currentQuantity =
            Number(
              cartItem?.quantity || 1
            );

          return {
            ...cartItem,
            quantity:
              Math.max(
                1,
                currentQuantity - 1
              ),
          };
        })
      );
    }, []);

  // ==========================================
  // CART COUNT
  // ==========================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total +
      Number(item?.quantity || 0),
    0
  );

  // ==========================================
  // CART TOTAL
  // ==========================================

  const cartTotal = cartItems.reduce(
    (total, item) => {
      const price = Number(
        item?.price ??
          item?.retailPrice ??
          item?.offerPrice ??
          item?.sellingPrice ??
          item?.mrp ??
          0
      );

      const quantity =
        Number(
          item?.quantity || 0
        );

      return (
        total +
        price * quantity
      );
    },
    0
  );

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    cartItems,

    cartLoading,

    cartError,

    cartCount,

    cartTotal,

    loadCart,

    addItemToCart,

    removeItemFromCart,

    increaseQuantity,

    decreaseQuantity,
  };

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

// ==========================================
// USE CART HOOK
// ==========================================

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

export default CartContext;