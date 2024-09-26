import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface ResponseData {
  id?: string;
  firstName: string;
  lastName: string;
  address: string;
  position: string;
  salary: string;
  division: string;
  workingStatus?: string;
  birthDate: string;
  joinDate: string;
}

const CreateEmployeeForm = () => {
  const [formData, setFormData] = useState<ResponseData>({
    firstName: '',
    lastName: '',
    address: '',
    position: '',
    salary: '',
    division: '',
    birthDate: '',
    joinDate: ''
  });

  const navigate = useNavigate();

  const [nipCounter, setNipCounter] = useState<number>(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateNIP = (joinDate: string): string => {
    const formattedDate = joinDate.split('-').reverse().join('');
    const autoIncrement = String(nipCounter).padStart(3, '0');
    return `AQI-${formattedDate}-${autoIncrement}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const generatedNip = generateNIP(formData.joinDate);
    const finalData = { ...formData, id: generatedNip };

    // SweetAlert confirmation
    const confirmation = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin ingin menginput data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, kirim!',
      cancelButtonText: 'Tidak'
    });

    if (confirmation.isConfirmed) {
      try {
        console.log(finalData);
        const res = await axios.post('http://localhost:3001/employees/', finalData)
        if (res.status !== 201) {
          throw new Error;
        }

        setNipCounter(prev => prev + 1); // Increment NIP
        Swal.fire('Sukses!', 'Data berhasil dikirim.', 'success');
        navigate('/')
      } catch (error) {
        Swal.fire('Error!', `Terjadi kesalahan: ${error}`, 'error');
      }
    }
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
            <input
              className='outline-none border rounded-lg w-full p-4'
              type="text"
              name="position"
              placeholder='Enter Position'
              value={formData.position}
              onChange={handleInputChange}
              required
            />
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
            <input
              className='outline-none border rounded-lg w-full p-4'
              type="text"
              name="division"
              placeholder='Enter Division'
              value={formData.division}
              onChange={handleInputChange}
              required
            />
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
              placeholder='Enter Join Date'
              value={formData.joinDate}
              onChange={handleInputChange}
              required
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

export default CreateEmployeeForm;
