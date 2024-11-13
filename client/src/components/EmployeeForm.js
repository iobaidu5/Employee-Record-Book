import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EMPLOYEE } from '../graphql'; 
import EmployeeList from './EmployeeList';

const EmployeeForm = () => {
    const [id, setId] = useState(''); 
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState(''); 
    const [salary, setSalary] = useState('');
    const [leaves, setLeaves] = useState(''); 

    const [createEmployee] = useMutation(CREATE_EMPLOYEE);


    const handleSubmit = async (e) => {
        e.preventDefault();

        await createEmployee({
            variables: {
                id, 
                name,
                designation, 
                salary: parseFloat(salary), 
                leaves: parseInt(leaves),
            }
        });

       
        setId('');
        setName('');
        setDesignation('');
        setSalary('');
        setLeaves('');
    };

    return (
        <>
            <div className='w-full flex justify-end pt-9 pr-9'>
                <button className="btn bg-slate-300 text-black" onClick={() => document.getElementById('my_modal_2').showModal()}>Add Employee</button>
            </div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box h-auto">
                    <h2 className="text-lg font-bold mb-4">Add Employee</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)} 
                            placeholder="Employee ID"
                            required
                            className="input mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                            className="input mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="text"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)} 
                            placeholder="Designation"
                            required
                            className="input mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="Salary"
                            required
                            className="input mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="number"
                            value={leaves}
                            onChange={(e) => setLeaves(e.target.value)} 
                            placeholder="Leaves Taken"
                            required
                            className="input mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <button
                            type="submit"
                            className="btn w-full bg-green-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Add Employee
                        </button>
                    </form>
                    <form method="dialog" className="">
                        <button className="btn w-full bg-red-500 text-white px-4 py-2 rounded">Close</button>
                    </form>
                </div>
            </dialog>
            <EmployeeList />
        </>
    );
};

export default EmployeeForm;