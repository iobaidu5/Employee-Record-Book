import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    designation: String!  
    salary: Float!        
    leaves: Int!        
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee  
  }

  type Mutation {
    createEmployee(
      id: ID!                 
      name: String!
      designation: String!    
      salary: Float!         
      leaves: Int!            
    ): Employee
    updateEmployee(
      id: ID!
      name: String
      designation: String      
      salary: Float            
      leaves: Int              
    ): Employee
    deleteEmployee(id: ID!): Employee
  }
`;

export default typeDefs;