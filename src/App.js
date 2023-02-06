import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";

import "./App.css";
import { fetchAddress } from "./core/services/databaseService";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";
import Form from "./ui/components/Form/Form";
import FormItem from "./ui/components/FormItem/FormItem";
import useFormFields from "./ui/hooks/setFields";

function App() {
   const [
      { zipCode, houseNumber, firstName, lastName, selectedAddress },
      handleFieldChange,
      resetFields,
   ] = useFormFields({
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
   const [error, setError] = React.useState("");
   const [addresses, setAddresses] = React.useState([]);
   /**
    * Redux actions
    */
   const { addAddress } = useAddressBook();

   /**
    * Text fields onChange handlers
    */

   const handleClearFields = (e) => {
      setAddresses([]);
      resetFields();
   };

   const handleAddressSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();

      try {
         const addresses = await fetchAddress({
            zipCode: e.target.zipCode.value,
            houseNumber: e.target.houseNumber.value,
         });

         if (addresses.status === "error") {
            setError(addresses.errormessage);
            setLoading(false);
            return;
         }

         setAddresses((prevAddresses) => [
            ...addresses.details.map((address) => {
               return transformAddress(address);
            }),
            ...prevAddresses,
         ]);
      } catch (error) {
         setError(error.message);
      }

      setError();
      e.preventDefault();
      setLoading(false);
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

   return (
      <main>
         <Section>
            <h1>
               Create your own address book!
               <br />
               <small>
                  Enter an address by zipcode add personal info and
                  done! 👏
               </small>
            </h1>
            <Form
               buttonText="Find"
               buttonLoading={loading}
               legend="🏠 Find an address"
               onSubmit={handleAddressSubmit}
            >
               <FormItem
                  name="zipCode"
                  placeholder="Zip Code"
                  onChange={handleFieldChange}
                  value={zipCode}
               />
               <FormItem
                  name="houseNumber"
                  onChange={handleFieldChange}
                  value={houseNumber}
                  placeholder="House number"
               />
            </Form>
            {addresses.length > 0 &&
               addresses.map((address) => {
                  return (
                     <Radio
                        name="selectedAddress"
                        id={address.id}
                        key={address.id}
                        onChange={handleFieldChange}
                     >
                        <Address address={address} />
                     </Radio>
                  );
               })}
            {selectedAddress && (
               <Form
                  buttonText="Add to addressbook"
                  onSubmit={handlePersonSubmit}
                  legend="✏️ Add personal info to address"
               >
                  <FormItem
                     name="firstName"
                     placeholder="First Name"
                     onChange={handleFieldChange}
                     value={firstName}
                  />
                  <FormItem
                     name="lastName"
                     placeholder="Last Name"
                     onChange={handleFieldChange}
                     value={lastName}
                  />
               </Form>
            )}
            <Button
               onClick={handleClearFields}
               variant="secondary"
               text="Clear all fields"
            />

            {error && <ErrorMessage message={error} />}
         </Section>
         <Section variant="dark">
            <AddressBook />
         </Section>
      </main>
   );
}

export default App;
