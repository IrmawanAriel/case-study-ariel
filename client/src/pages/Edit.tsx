import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

interface EmployeeInterface {
    id?: string;
    firstName: string;
    lastName: string;
    address: string;
    position: string;
    salary: string;
    division: string;
    workingStatus?: string;
    birthDate: string;
    // joinDate: string;
}

const EditEmployeeForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [joinDate, setJoinDate] = useState<string>('')
    const [formData, setFormData] = useState<EmployeeInterface>({
        firstName: '',
        lastName: '',
        address: '',
        position: '',
        salary: '',
        division: '',
        birthDate: '',
        // joinDate: ''
    });

    useEffect(() => {
        const getData = async () => {

            try {
                let result = await axios.get(`http://localhost:3001/employees/${id}`)
                if (result.status !== 200) {
                    throw new Error
                }

                setFormData({
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    address: result.data.address,
                    position: result.data.position,
                    salary: result.data.salary,
                    division: result.data.division,
                    birthDate: result.data.birthDate
                })
                setJoinDate(result.data.joinDate)

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [id])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const confirmation = await Swal.fire({
            title: 'Konfirmasi',
            text: 'Apakah Anda yakin ingin mengedit data ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, edit!',
            cancelButtonText: 'Tidak'
        });

        if (confirmation.isConfirmed) {
            try {
                console.log("confirmation")
                console.log(formData);
                const res = await axios.put(`http://localhost:3001/employees/${id}`, formData)
                if (res.status !== 200) {
                    throw new Error;
                }
                Swal.fire('Sukses!', 'Data berhasil diedit.', 'success');
                navigate('/')
            } catch (error) {
                Swal.fire('Error!', `Terjadi kesalahan: ${error}`, 'error');
            }
        }
    }

    if (!formData) {
        return <div> Loading... </div>
    }

    return (
        <main className="flex flex-col pb-16 px-4 tbt:px-10 lg:px-32 bg-neutral-100 font-mulish h-screen">
            <section className=" p-8 gap-4 flex flex-col self-center mt-16 w-full bg-white rounded-3xl max-w-[1105px] max-md:mt-10 max-md:max-w-full bg-slate-100 border-2">
                <Link to="/">
                    <button className="border bg-red-500 rounded-md px-6 py-1 font-bold tracking-wider text-center text-slate-50">
                        Back
                    </button>
                </Link>
                <div className="flex flex-wrap gap-5 justify-center w-full max-md:max-w-full">
                    <h1 className="my-auto text-2xl font-bold text-slate-900">Create New Employee Data</h1>
                </div>

                <form onSubmit={handleSubmit} className='flex-col gap-2 flex'>
                    <div className='flex gap-4 md:p-4 flex-col'>
                        <label className='text-m font-semibold'>NIP:</label>
                        <input
                            className='outline-none border rounded-lg w-full p-4'
                            type="text"
                            name="NIP"
                            value={id}
                            disabled={true}
                        />
                    </div>
                    <div className='flex gap-4 md:p-4 flex-col'>
                        <label className='text-m font-semibold'>First Name:</label>
                        <input
                            className='outline-none border rounded-lg w-full p-4'
                            type="text"
                            name="firstName"
                            placeholder='Enter First Name'
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex gap-4 md:p-4 flex-col'>
                        <label className='text-m font-semibold'>Last Name:</label>
                        <input
                            className='outline-none border rounded-lg w-full p-4'
                            type="text"
                            name="lastName"
                            placeholder='Enter Last Name'
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex gap-4 md:p-4 flex-col'>
                        <label className='text-m font-semibold'>Address:</label>
                        <input
                            className='outline-none border rounded-lg w-full p-4'
                            type="text"
                            name="address"
                            placeholder='Enter Address'
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex gap-4 md:p-4 flex-col'>
                        <label className='text-m font-semibold'>Position:</label>
                        <select
                            className='outline-none border rounded-lg w-full p-4'
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select Position</option>
                            <option value="Manager">Manager</option>
                            <option value="Team Lead">Team Lead</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Javascript Developer">Javascript Developer</option>
                            <option value="Intern">Intern</option>
                        </select>
                    </div>
                    <div className='flex gap-4 md:p-4 flex-col'>
                        <label className='text-m font-semibold'>Salary:</label>
                        <input
                            className='outline-none border rounded-lg w-full p-4'
                            type="number"
                            name="salary"
                            min="0"
                            placeholder='Enter Salary'
                            value={formData.salary}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex gap-4 md:p-4 flex-col'>
                        <label className='text-m font-semibold'>Division:</label>
                        <select
                            className='outline-none border rounded-lg w-full p-4'
                            name="division"
                            value={formData.division}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select Division</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="Sales">Sales</option>
                            <option value="Kintone">Kintone</option>
                        </select>
                    </div>
                    <div className='flex gap-4 md:p-4 flex-col'>
                        <label className='text-m font-semibold'>Birth Date:</label>
                        <input
                            className='outline-none border rounded-lg w-full p-4'
                            type="date"
                            name="birthDate"
                            placeholder='Enter Birth Date'
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex gap-4 md:p-4 flex-col'>
                        <label className='text-m font-semibold'>Join Date:</label>
                        <input
                            className='outline-none border rounded-lg w-full p-4'
                            type="date"
                            name="joinDate"
                            value={joinDate}
                            disabled={true}
                        />
                    </div>
                    <div className='justify-center items-center flex'>
                        <button type="submit" className='py-4 px-10 bg-blue-700 rounded-lg text-white font-semibold justify-center'>Submit</button>
                    </div>
                </form>
            </section>
        </main>

    );
};

export default EditEmployeeForm;
