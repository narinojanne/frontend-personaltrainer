export type Customer = {
  id: String;
  firstname: String;
  lastname: String;
  city: String;
  _links: {
    self: {
      href: String;
    };
  };
};

export type Training = {
  id: String;
  activity: String;
  duration: number;
  _links: {
    self: {
      href: String;
    };
  };
};
