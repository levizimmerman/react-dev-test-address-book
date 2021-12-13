export const findByAddress = (addresses, address) => {
  return addresses.find((item) => address.id === item.id);
};
