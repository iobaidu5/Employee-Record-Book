import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    designation: { type: String, required: true }, 
    salary: { type: Number, required: true }, 
    leaves: { type: Number, required: true }, 
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;