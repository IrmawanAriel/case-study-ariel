import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import eye from '../assets/icons/eye.svg';
import edit from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/trash.svg';

interface responseData {
  nip: string;
  firstName: string;
  lastName: string;
  address: string;
  position: string;
  salary: string;
  division: string;
  WorkingStatus?: String;
  birthDate: Date;
  joinDate: string;
}

function Dashboard() {
  const [employees, setEmployees] = useState<responseData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false); 

  // Fetch data from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employees');
        setEmployees(response.data);
        console.log(response.data)
        setLoading(false); 
      } catch (error) {
        console.error('Failed to fetch sales data', error);
      }
    };

    fetchEmployees();
  }, []);


  const handleDelete = (id: string) => {
    setSelectedEmployeeId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/employees/${selectedEmployeeId}`);
      setEmployees(employees.filter((employee) => employee.nip !== selectedEmployeeId));
      setShowModal(false);
    } catch (error) {
      console.error('Failed to delete employee:', error);
      setError(true)
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <main className="flex flex-col pb-16 px-4 tbt:px-10 lg:px-32 bg-neutral-100 font-mulish h-screen">
      <section className="flex flex-col self-center mt-16 w-full bg-white rounded-3xl max-w-[1105px] max-md:mt-10 max-md:max-w-full bg-slate-100 border-2">
        <div className="flex flex-col px-14 pt-6 pb-10 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
            <h1 className="my-auto text-2xl font-bold text-slate-900">List Employees</h1>
            <Link to="create">
              <button className="md:hidden bg-blue-700 rounded-md fill-blue-700 px-6 py-1 font-bold tracking-wider leading-loose text-center text-slate-50">
                + Add
              </button>
            </Link>
            <div className="flex gap-3.5 text-base w-full md:w-auto">
              <Link to="create" className="self-center">
                <button className="text-sm hidden items-center md:flex p-2 bg-blue-700 rounded-lg fill-blue-700 max-md:px-5 font-bold tracking-wider leading-loose text-center text-slate-50">
                  Add Employee
                </button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto mt-5 tbt:self-center">
            <table className="bg-white">
              <thead>
                <tr className="text-left text-xs md:text-base font-bold text-sky-900">
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">NIP</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Position</th>
                  <th className="px-4 py-2">Division</th>
                  <th className="px-4 py-2">Salary</th>
                  <th className="px-4 py-2">Join Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee, index) => (
                    <tr key={employee.nip} className="border-t">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{employee.nip}</td>
                      <td className="px-4 py-2 text-sm md:text-base text-primary">
                        {`${employee.firstName} ${employee.lastName}`}
                      </td>
                      <td className="px-4 py-2 text-sm md:text-base">{employee.position}</td>
                      <td className="px-4 py-2 text-sm md:text-base">{employee.division}</td>
                      <td className="px-4 py-2 text-sm md:text-base">Rp {employee.salary}</td>
                      <td className="px-4 py-2 text-sm md:text-base">{employee.joinDate}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="bg-blue-500 text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
                            <div className="grid place-items-center">
                              <img src={eye} alt="view" />
                            </div>
                          </button>
                          <button className="bg-[#5D5FEF] text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
                            <div className="grid place-items-center">
                              <img src={edit} alt="edit" />
                            </div>
                          </button>
                          <button onClick={() => handleDelete(employee.nip)} className="bg-red-500 text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
                            <div className="grid place-items-center">
                              <img src={deleteIcon} alt="delete" />
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="justify-center items-center text-3xl text-center font-bold p-8">
                      No employees available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {showModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-3/4 tbt:w-full text-center">
            <h2 className="text-sm tbt:text-2xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-xs xsm:text-sm tbt:text-base mb-6">Are you sure you want to delete this employee?</p>
            <div className="flex justify-center">
              <button onClick={confirmDelete} className="text-xs tbt:text-base bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded mr-2">
                Delete
              </button>
              <button onClick={handleCloseModal} className="text-xs tbt:text-base bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
