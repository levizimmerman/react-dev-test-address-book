import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import Form from "./ui/components/Form";

import useForm from "./ui/hooks/useForm";
import useAddressBook from "./ui/hooks/useAddressBook";

import "./App.css";
import ErrorMessage from "./ui/components/ErrorMessage";

function App() {
  const [information, informationChange, resetForm] = useForm({
    zipCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });
  const [loading, setLoading] = React.useState(false);

  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  const onClearHandler = () => {
    resetForm();
    setAddresses([]);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!information.zipCode || !information.houseNumber) {
      setError("Please fill in the required fields");
      return;
    }

    const response = await fetch(
      `http://api.postcodedata.nl/v1/postcode/?postcode=${information.zipCode}&streetnumber=${information.houseNumber}&ref=domeinnaam.nl&type=json`
    );
    const data = await response.json();
    if (data.status === "error") {
      setError(
        "Could not find the address. Have you entered the right information?"
      );
      setLoading(false);
      return;
    }
    const transformedAddresses = data.details.map((address) =>
      transformAddress({ ...address, houseNumber: information.houseNumber })
    );
    setAddresses(transformedAddresses);
    setLoading(false);
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!information.selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === information.selectedAddress
    );

    addAddress({
      ...foundAddress,
      firstName: information.firstName,
      lastName: information.lastName,
    });
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
        <Form
          legend={"🏠 Find an address"}
          buttonTitle="Find"
          onButtonClick={handleAddressSubmit}
        >
          <div className="form-row">
            <InputText
              name="zipCode"
              onChange={informationChange}
              placeholder="Zip Code"
              value={information.zipCode}
            />
          </div>
          <div className="form-row">
            <InputText
              name="houseNumber"
              onChange={informationChange}
              value={information.houseNumber}
              placeholder="House number"
            />
          </div>
        </Form>
        {loading && <p>Loading...</p>}
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={informationChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {information.selectedAddress && (
          <Form
            legend="✏️ Add personal info to address"
            buttonTitle="Add to addressbook"
            onButtonClick={handlePersonSubmit}
          >
            <div className="form-row">
              <InputText
                name="firstName"
                placeholder="First name"
                onChange={informationChange}
                value={information.firstName}
              />
            </div>
            <div className="form-row">
              <InputText
                name="lastName"
                placeholder="Last name"
                onChange={informationChange}
                value={information.lastName}
              />
            </div>
          </Form>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button onClick={onClearHandler} variant="secondary">
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
