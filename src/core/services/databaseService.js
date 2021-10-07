import localforage from "localforage";

const database = localforage.createInstance({
  name: "address-book",
});

export default database;
