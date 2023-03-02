const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      /** TODO: Prevent duplicate addresses */
      if (
        state.addresses.some(
          (address) =>
            address.houseNumber === action.payload.houseNumber &&
            address.postcode === action.payload.postcode
        )
      )
        return state;
      else return { ...state, addresses: [...state.addresses, action.payload] };

    case "address/remove":
      /** TODO: Write a state update which removes an address from the addresses array. */
      const newAddresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      return { ...state, addresses: newAddresses };
    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
