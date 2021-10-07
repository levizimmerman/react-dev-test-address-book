import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";

import "./App.css";
import Section from "./ui/components/Section/Section";

// const API_URL =
//   "https://api.postcodedata.nl/v1/postcode/?postcode=3582EH&streetnumber=14&ref=domeinnaam.nl&type=json";

function App() {
  const [zipCode, setZipCode] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  const [selectedAddress, setSelectedAddress] = React.useState();
  const { addAddress } = useAddressBook();

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleHouseNumberChange = (e) => {
    setHouseNumber(e.target.value);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      setError(false);
    }

    try {
      const response = await fetch(
        `https://api.postcodedata.nl/v1/postcode/?postcode=${zipCode}&streetnumber=${houseNumber}&ref=domeinnaam.nl&type=json`
      );
      if (!response.ok) {
        throw Error("Could not fetch data");
      }
      const data = await response.json();

      setAddresses(
        data.details.map((address) =>
          transformAddress({ ...address, houseNumber })
        )
      );
    } catch (e) {
      console.error(e);
      setError("Oops something went wrong... Try again");
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const reset = () => {
    setZipCode("");
    setHouseNumber("");
    setFirstName("");
    setLastName("");
    setError(undefined);
    setAddresses([]);
    setSelectedAddress(undefined);
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress
    );

    console.log("firstName", firstName);
    console.log("lastName", lastName);

    addAddress({ ...foundAddress, firstName, lastName });
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by zipcode add personal info and done! 👏
          </small>
        </h1>
        <form onSubmit={handleAddressSubmit}>
          <fieldset>
            <legend>🏠 Find an address</legend>
            <div className="form-row">
              <InputText
                onChange={handleZipCodeChange}
                value={zipCode}
                placeholder="Zip Code"
              />
            </div>
            <div className="form-row">
              <InputText
                onChange={handleHouseNumberChange}
                value={houseNumber}
                placeholder="House number"
              />
            </div>
            <Button type="submit">Find</Button>
          </fieldset>
          {error && <div className="error">{error}</div>}
        </form>
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="address"
                id={address.id}
                key={address.id}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {selectedAddress && (
          <form onSubmit={handlePersonSubmit}>
            <fieldset>
              <legend>✏️ Add personal info to address</legend>
              <div className="form-row">
                <InputText
                  placeholder="First name"
                  onChange={handleFirstNameChange}
                  value={firstName}
                />
              </div>
              <div className="form-row">
                <InputText
                  placeholder="Last name"
                  onChange={handleLastNameChange}
                  value={lastName}
                />
              </div>
              <Button type="submit">Add to addressbook</Button>
            </fieldset>
          </form>
        )}

        <Button variant="secondary" type="button" onClick={() => reset()}>
          Clear all fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
