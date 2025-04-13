export type Customer = {
  id: string;
  firstname: string;
  lastname: string;
  city: string;
  _links: {
    self: {
      href: string;
    };
  };
};

export type Training = {
  id: string;
  date: string;
  activity: string;
  duration: number;
  _links: {
    self: {
      href: string;
    };
    customer: {
      href: { customer: string };
    };
  };
};
