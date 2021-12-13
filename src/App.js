import { useState } from 'react';
import Address from './ui/components/Address/Address';
import AddressBook from './ui/components/AddressBook/AddressBook';
import Button from './ui/components/Button/Button';
import Radio from './ui/components/Radio/Radio';
import Section from './ui/components/Section/Section';
import useAddressBook from './ui/hooks/useAddressBook';
import { useFormField } from './ui/hooks/useFormField';
import './App.css';
import ErrorMessage from './ui/components/ErrorMessage/ErrorMessage';
import FormRow from './ui/components/Form/FormRow';
import Form from './ui/components/Form/Form';
import transformAddress from './core/models/address';

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { zipCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handleZipCodeChange for example
   */

  const [state, setState, clear] = useFormField({
    zipCode: '',
    houseNumber: '',
    firstName: '',
    lastName: '',
    selectedAddress:''
  });

  const [selectedAddress, setSelectedAddress] = useState('');
  /**
   * Results states
   */
  const [error, setError] = useState(undefined);
  const [addresses, setAddresses] = useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  const handleSelectedAddressChange = () => {
    setSelectedAddress(addresses[0]);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setError(null)

    /** TODO: Fetch addresses based on houseNumber and zipCode
     * - Example URL of API: http://api.postcodedata.nl/v1/postcode/?postcode=1211EP&streetnumber=60&ref=domeinnaam.nl&type=json
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
    const data = await fetch(`http://api.postcodedata.nl/v1/postcode/?postcode=${state.zipCode}&streetnumber=${state.houseNumber}&ref=domeinnaam.nl&type=json`);
    const response = await data.json();

    if (response.status === 'error') {
      setError(response.errormessage);
    } else {
      setAddresses(response.details.map(address => {
        address.houseNumber = state.houseNumber;
        return transformAddress(address);
      }));
    }
  };

  const clearAll = () => {
    clear();
    setAddresses([]);
    setSelectedAddress(null);
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    addAddress({
      ...selectedAddress,
      firstName: state.firstName,
      lastName: state.lastName,
    });
    clearAll();
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

        <Form onSubmit={handleAddressSubmit} legend="🏠 Find an address" buttonText="Find" name="zipCode">
          <FormRow
            value={state.zipCode} setValue={(e) => setState('zipCode', e)} placeholder="Zip Code"
            name="houseNumber" />
          <FormRow
            value={state.houseNumber} setValue={(e) => setState('houseNumber', e)}
            placeholder="House Number" />
        </Form>

        {addresses.length > 0 && addresses.map((address) => (
          <Radio
            name="selectedAddress" id={address.id} key={address.id}
            onChange={handleSelectedAddressChange}>
            <Address address={address} />
          </Radio>
        ))}

        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button */}

        {selectedAddress && (
          <Form
            onSubmit={handlePersonSubmit} legend="✏️ Add personal info to address"
            buttonText="Add to address book">
            <FormRow
              value={state.firstName} setValue={(e) => setState('firstName', e)} placeholder="First name"
              name="firstName" />
            <FormRow
              value={state.lastName} setValue={(e) => setState('lastName', e)} placeholder="Last name"
              name="lastName" />
          </Form>
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <ErrorMessage props={error} />}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button type="submit" variant="secondary" onClick={clearAll}>Clear Fields</Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
