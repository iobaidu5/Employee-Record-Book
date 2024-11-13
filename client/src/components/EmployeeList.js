import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEES, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from '../graphql';

const EmployeeList = () => {
    const { loading, error, data } = useQuery(GET_EMPLOYEES, {pollInterval: 500});
    const [dataSet , SetData ] = useState();
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedDesignation, setUpdatedDesignation] = useState('');
    const [updatedSalary, setUpdatedSalary] = useState('');
    const [updatedLeaves, setUpdatedLeaves] = useState('');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleDelete = async (id) => {
        await deleteEmployee({ variables: { id } });
     
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateEmployee({
            variables: {
                id: selectedEmployee.id,
                name: updatedName,
                designation: updatedDesignation,
                salary: parseFloat(updatedSalary),
                leaves: parseInt(updatedLeaves),
            }
        });
        setUpdateModalOpen(false);
        setSelectedEmployee(null);
        
    };

    const openUpdateModal = (employee) => {
        setSelectedEmployee(employee);
        setUpdatedName(employee.name);
        setUpdatedDesignation(employee.designation);
        setUpdatedSalary(employee.salary);
        setUpdatedLeaves(employee.leaves);
        setUpdateModalOpen(true);
    };

    return (
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
            <h1>Employee List</h1>
            <table className='w-full table-fixed'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">ID</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Designation</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Salary</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Leaves</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.employees.map(employee => (
                        <tr key={employee.id}>
                            <td className='py-4 px-6 border-b border-gray-200'>{employee.id}</td>
                            <td className='py-4 px-6 border-b border-gray-200'>{employee.name}</td>
                            <td className='py-4 px-6 border-b border-gray-200'>{employee.designation}</td>
                            <td className='py-4 px-6 border-b border-gray-200'>{employee.salary}</td>
                            <td className='py-4 px-6 border-b border-gray-200'>{employee.leaves}</td>
                            <td className='py-4 px-6 border-b border-gray-200'>
                                <button 
                                    className="btn bg-red-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleDelete(employee.id)}
                                >
                                    Delete
                                </button>
                                <button 
                                    className="btn bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => openUpdateModal(employee)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isUpdateModalOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h2 className="text-lg font-bold mb-4">Update Employee</h2>
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                placeholder="Name"
                                required
                                className="input mb-2 p-2 border border-gray-300 rounded w-full"
                            />
                            <input
                                type="text"
                                value={updatedDesignation}
                                onChange={(e) => setUpdatedDesignation(e.target.value)}
                                placeholder="Designation"
                                required
                                className="input mb-2 p-2 border border-gray-300 rounded w-full"
                            />
                            <input
                                type="number"
                                value={updatedSalary}
                                onChange={(e) => setUpdatedSalary(e.target.value)}
                                placeholder="Salary"
                                required
                                className="input mb-2 p-2 border border-gray-300 rounded w-full"
                            />
                            <input
                                type="number"
                                value={updatedLeaves}
                                onChange={(e) => setUpdatedLeaves(e.target.value)}
                                placeholder="Leaves Taken"
                                required
                                className="input mb-2 p-2 border border-gray-300 rounded w-full"
                            />
                            <button
                                type="submit"
                                className="btn w-full bg-green-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Update Employee
                            </button>
                        </form>
                        <form method="dialog" className="mt-4">
                            <button 
                                className="btn w-full bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => setUpdateModalOpen(false)}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default EmployeeList;