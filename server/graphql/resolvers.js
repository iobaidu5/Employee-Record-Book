import Employee from "../models/Employee.js";

const resolvers = {
  Query: {
    employees: async () => await Employee.find(),
    employee: async (parent, { id }) => await Employee.findOne({ id }),
  },
  Mutation: {
    createEmployee: async (
      parent,
      { id, name, designation, salary, leaves } 
    ) => {
      const employee = new Employee({
        id,
        name,
        designation,
        salary, 
        leaves, 
      });
      return await employee.save();
    },
    updateEmployee: async (
      parent,
      { id, name, designation, salary, leaves } 
    ) => {
      return await Employee.findOneAndUpdate(
        { id },
        { name, designation, salary, leaves }, 
        { new: true } 
      );
    },
    deleteEmployee: async (_, { id }) => {
      return await Employee.findOneAndDelete({ id });
  },
    
  },
};

export default resolvers;