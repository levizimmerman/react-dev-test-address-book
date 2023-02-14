import React from "react";
import { useSelector } from "react-redux";

import Address from "../Address/Address";
import Button from "../Button/Button";
import Card from "../Card/Card";
import useAddressBook from "../../hooks/useAddressBook";

import $ from "./AddressBook.module.css";

const AddressBook = () => {
  const addresses = useSelector((state) => state.addressBook.addresses);
  const { removeAddress, loadSavedAddresses, loading } = useAddressBook();

  React.useEffect(() => {
    loadSavedAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={$.addressBook}>
      <div>
        <h2>📓 Address book</h2>
        <h3>Total Addresses: {addresses.length}</h3>
      </div>
      {!loading && (
        <>
          {addresses.length === 0 && <p>No addresses found, try add one 😉</p>}
          {addresses.map((address) => {
            return (
              <Card key={address.id}>
                <div className={$.item}>
                  <div>
                    <h3>
                      {address.firstName} {address.lastName}
                    </h3>
                    <Address address={address} />
                  </div>
                  <div className={$.remove}>
                    <Button
                      variant="secondary"
                      onClick={() => removeAddress(address.id)}
                    >
                      Remove
                    </Button>
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
