import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_CATEGORY,
} from "./actionType";

const initialState = {
  itemCount: 0,
  cart: [],
  filter: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const isPresent =
        (Array.isArray(state.cart) &&
          state.cart.find((item) => item.id === action.payload.id)) ||
        null;

      if (isPresent) {
        return {
          ...state,
          itemCount: state.itemCount + 1,
          cart: (state.cart || []).map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          itemCount: state.itemCount + 1,
          cart: state.cart.concat({ ...action.payload, quantity: 1 }),
        };
      }

    case REMOVE_CART_ITEM:
      const isItemPresent =
        (Array.isArray(state.cart) &&
          state.cart.find((item) => item.id === action.payload.id)) ||
        null;

      if (isItemPresent && isItemPresent.quantity > 1) {
        return {
          ...state,
          itemCount: state.itemCount - 1,
          cart: (state.cart || []).map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          itemCount: state.itemCount - 1,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      }
    case SET_CATEGORY:
      console.log(action.payload)
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};
