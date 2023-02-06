const defaultState = {
   addresses: [],
};

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case "address/add":
         if (
            state.addresses.find(
               (address) => address.id === action.payload.id
            )
         ) {
            return state;
         }

         return {
            ...state,
            addresses: [...state.addresses, action.payload],
         };
      case "address/remove":
         return {
            ...state,
            addresses: state.addresses.filter(
               (item) => item.id !== action.payload
            ),
         };
      case "addresses/add": {
         return { ...state, addresses: action.payload };
      }
      default:
         return state;
   }
};

export default reducer;
