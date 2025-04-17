export type Customer = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
  _links: {
    self: {
      href: string;
    };
  };
};

export type Training = {
  id: number;
  date: string;
  activity: string;
  duration: number;
  customer?: Customer;
};
