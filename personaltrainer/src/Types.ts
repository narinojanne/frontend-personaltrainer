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

export type NewCustomer = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
};

export type Training = {
  id: number;
  date: string;
  activity: string;
  duration: number;
  customer?: Customer;
};

export type NewTraining = {
  date: string;
  activity: string;
  duration: string;
  customer: string;
};

export type AddCustomerProps = {
  addCustomer: (customer: NewCustomer) => void;
};

export type AddTrainingProps = {
  addTraining: (training: NewTraining) => void;
  currentCustomer: Customer;
};

export type AddTrainingCustomerProps = {
  addTraining: (training: NewTraining) => void;
  customerUrl: string;
};

export type EditCustomerProps = {
  currentCustomer: Customer;
  editCustomer: (customer: Customer, url: string) => void;
  onCustomerEdited: () => void;
};
