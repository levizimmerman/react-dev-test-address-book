import localforage from "localforage";

const database = localforage.createInstance({
   name: "address-book",
});

export const fetchAddress = async ({ houseNumber, zipCode }) => {
   try {
      const response = await fetch(
         `http://api.postcodedata.nl/v1/postcode/?postcode=${zipCode}&streetnumber=${houseNumber}&ref=domeinnaam.nl&type=json`
      ).then((response) => response.json());

      return response;
   } catch (err) {
      return Promise.reject(err);
   }
};

export default database;
