export type Customer = {
  firstname: String;
  lastname: String;
  city: String;
};

export type Training = {
  activity: String;
  duration: number;
  customer: {
    firstname: String;
    lastname: String;
  };
};
