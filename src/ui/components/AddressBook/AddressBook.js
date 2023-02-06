import React from "react";
import { useSelector } from "react-redux";

import Address from "../Address/Address";
import Button from "../Button/Button";
import Card from "../Card/Card";
import useAddressBook from "../../hooks/useAddressBook";

import $ from "./AddressBook.module.css";

const AddressBook = () => {
   const addresses = useSelector(
      (state) => state.addressBook.addresses
   );
   console.log(addresses);
   const { removeAddress, loadSavedAddresses, loading } =
      useAddressBook();

   React.useEffect(() => {
      loadSavedAddresses();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <section className={$.addressBook}>
         <h2>📓 Address book ({addresses.length})</h2>
         {!loading && (
            <>
               {addresses.length === 0 && (
                  <p>No addresses found, try add one 😉</p>
               )}
               {addresses.map((address) => {
                  return (
                     <Card key={address.id}>
                        <div className={$.item}>
                           <div>
                              <h3>
                                 {address.firstName}{" "}
                                 {address.lastName}
                              </h3>
                              <Address address={address} />
                           </div>
                           <div>
                              <Button
                                 variant="remove"
                                 onClick={() =>
                                    removeAddress(address.id)
                                 }
                                 text="Remove"
                              />
                           </div>
                        </div>
                     </Card>
                  );
               })}
            </>
         )}
      </section>
   );
};

export default AddressBook;
