const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      const duplicate = state.addresses.find((address) => {
        return (
          address.houseNumber === action.payload.houseNumber &&
          address.street === action.payload.street
        );
      });
      if (duplicate) {
        return state;
      }
      return { ...state, addresses: [...state.addresses, action.payload] };

    case "address/remove":
      const filteredAddresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      return { ...state, addresses: filteredAddresses };

    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }

    default:
      return state;
  }
};

export default reducer;
