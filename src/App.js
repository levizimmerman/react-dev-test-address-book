import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import Form from "./ui/components/Form/Form";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import useFormFields from "./ui/hooks/useFormFields";

import "./App.css";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { zipCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handleZipCodeChange for example
   */
  const initialValues = {
    zipCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  };
  const { values, handleChange } = useFormFields(initialValues);
  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    /** TODO: Fetch addresses based on houseNumber and zipCode
     * - Example URL of API: http://api.postcodedata.nl/v1/postcode/?postcode=1211EP&streetnumber=60&ref=domeinnaam.nl&type=json
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
    const zipCode = e.target.elements.zipCode.value;
    const houseNumber = e.target.elements.houseNumber.value;

    const res = await fetch(
      `http://api.postcodedata.nl/v1/postcode/?postcode=${zipCode}&streetnumber=${houseNumber}&ref=domeinnaam&type=json`
    );
    const data = await res.json();

    if (data.status === "error") return setError(data.errormessage);
    // remove any potential previous errors if current request has no errors
    setError(undefined);

    const address = transformAddress({ ...data.details[0], houseNumber });

    setAddresses((prevAddresses) => [...prevAddresses, address]);
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!values.selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === values.selectedAddress
    );

    addAddress({
      ...foundAddress,
      firstName: values.firstName,
      lastName: values.lastName,
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
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        <Form
          initialValues={values}
          formFieldNames={["zipCode", "houseNumber"]}
          caption="🏠 Find an address"
          buttonTitle={"Find"}
          onSubmit={handleAddressSubmit}
          onChange={handleChange}
        />
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {values.selectedAddress && (
      <Form
        initialValues={values}
        formFieldNames={["firstName", "lastName"]}
        caption="✏️ Add personal info to address"
        buttonTitle={"Add to addressbook"}
        onSubmit={handlePersonSubmit}
        onChange={handleChange}
    />
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <ErrorMessage error={error}/>}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
