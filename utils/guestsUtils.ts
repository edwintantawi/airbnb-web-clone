interface IFormatGuestOptions {
  noInfants?: boolean;
}

export const formatGuests = (guests: any, options?: IFormatGuestOptions) => {
  if (!guests) return false;
  const { noInfants } = options || {};
  const { children, adults, infants } = guests;
  const total = adults + children;
  if (!total) return 0;
  let template = `${total} guest`;
  if (total >= 2) template = `${total} guests`;
  if (infants && !noInfants) template += `, ${infants} infant`;
  return template;
};
