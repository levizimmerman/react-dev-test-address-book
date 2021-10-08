import React from "react";
import { useDispatch, useStore } from "react-redux";

import transformAddress from "../../core/models/address";
import databaseService from "../../core/services/databaseService";

export default function useAddressBook() {
  const dispatch = useDispatch();
  const store = useStore();
  const [loading, setLoading] = React.useState(true);

  const updateDatabase = React.useCallback(() => {
    const state = store.getState();
    databaseService.setItem("addresses", state.addressBook.addresses);
  }, [store]);

  return {
    /** Add address to the redux store */
    addAddress: (address) => {
      dispatch({ type: "address/add", payload: address });
      updateDatabase();
    },
    /** Remove address by ID from the redux store */
    removeAddress: (id) => {
      dispatch({ type: "address/remove", payload: id });
      updateDatabase();
    },
    /** Loads saved addresses from the indexedDB */
    loadSavedAddresses: async () => {
      const saved = await databaseService.getItem("addresses");
      // No saved item found, exit this function
      if (!saved || !Array.isArray(saved)) {
        setLoading(false);
        return;
      }
      dispatch({
        type: "addresses/add",
        payload: saved.map((address) => transformAddress(address)),
      });
      setLoading(false);
    },
    loading,
  };
}
