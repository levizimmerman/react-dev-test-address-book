import React, { useState } from "react";
import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import useFormFields from "./ui/hooks/useFormFields";

import "./App.css";
import Form from "./ui/components/Form/Form";
import ErrorMessage from "./ui/components/Error/Error";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { zipCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handleZipCodeChange for example
   */
  const [loading, setLoading] = useState(false);
  const { formData, handleInputChange, resetFormFields } = useFormFields({
    zipCode: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
    houseNumber: "",
  });
  const { zipCode, firstName, lastName, selectedAddress, houseNumber } =
    formData;

  const addressObj = [
    {
      name: "zipCode",
      placeholder: "Zip Code",
      handleInputChange: handleInputChange,
      value: zipCode,
    },
    {
      name: "houseNumber",
      placeholder: "House Number",
      handleInputChange: handleInputChange,
      value: houseNumber,
    },
  ];

  const nameObj = [
    {
      name: "firstName",
      placeholder: "First name",
      value: firstName,
      handleInputChange: handleInputChange,
    },
    {
      name: "lastName",
      placeholder: "Last Name",
      value: lastName,
      handleInputChange: handleInputChange,
    },
  ];

  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  /**
   * Text fields onChange handlers
   */

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    /** TODO: Fetch addresses based on houseNumber and zipCode
     * - Example URL of API: http://api.postcodedata.nl/v1/postcode/?postcode=1211EP&streetnumber=60&ref=domeinnaam.nl&type=json
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */

    fetchData(
      `http://api.postcodedata.nl/v1/postcode/?postcode=${zipCode}}&streetnumber=${houseNumber}&ref=domeinnaam.nl&type=json`
    );
  };

  const fetchData = (url) => {
    setError(undefined);
    setLoading(true);
    try {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            const transformedData = {
              houseNumber: houseNumber,
              ...data.details[0],
            };
            setAddresses([transformAddress(transformedData)]);
            setLoading(false);
          } else if (data.status === "error") {
            console.log("ERROR:", data);
            setError(data.errormessage);
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
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

    addAddress({ ...foundAddress, firstName, lastName });
  };

  const handleClearAllFields = () => {
    setAddresses([]);
    setError(null);
    resetFormFields();
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
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}

        <Form
          legend="🏠 Find an address"
          handleSubmit={handleAddressSubmit}
          fieldValues={addressObj}
          buttonText="Find"
        />
        {loading && <div className="loading-spinner"></div>}
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                value={selectedAddress}
                handleInputChange={handleInputChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {selectedAddress && (
          <Form
            legend="✏️ Add personal info to address"
            handleSubmit={handlePersonSubmit}
            fieldValues={nameObj}
            buttonText="Add to Address book"
          />
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <ErrorMessage error={error} />}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button variant="secondary" onClick={handleClearAllFields}>
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
