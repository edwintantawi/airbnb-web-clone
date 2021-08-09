export const formatGuests = (guests) => {
  const { children, adults, infants } = guests;
  const total = adults + children;
  if (!total) return 0;
  let template = `${total} guest`;
  if (total >= 2) template = `${total} guests`;
  if (infants) template += `, ${infants} infant`;
  return template;
};
