import { findByAddress } from './findByAddress';

const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  const address = action.payload;
  switch (action.type) {
    case 'address/add':
      /** TODO: Prevent duplicate addresses */
      const existing = findByAddress(state.addresses, address);

      if (existing) {
        return state;
      }

      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };

    case 'address/remove':
      /** TODO: Write a state update which removes an address from the addresses array. */
      return {
        ...state,
        addresses: state.addresses.filter((item) => item.id !== action.payload)
      }

    case 'addresses/add': {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
