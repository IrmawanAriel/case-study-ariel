import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import eye from '../assets/icons/eye.svg';
import edit from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/trash.svg';
import { Dispatch, SetStateAction } from 'react';

interface EmployeeData {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    position: string;
    salary: string;
    division: string;
    birthDate: string;
    joinDate: string;
    workingStatus: string
  }

interface EmployeePropsDashBoard {
    employee: EmployeeData[];
    reload: () => void;
    setError: Dispatch<SetStateAction<boolean>>;
}

export default function TableDashboard ({employee , reload, setError}:EmployeePropsDashBoard ) {

    const navigate = useNavigate();


    const handleDetail = async (id: string) => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: `You are about to see employee with NIP ${id} details`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        })
        if (result.isConfirmed) {
          navigate(`/details/${id}`)
          Swal.fire('Redirected!', 'You are being redirected to the details page.', 'success');
        }
      }
    
      const handleEdit = async (id: string) => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: `You are about to edit employee with NIP ${id} !`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, edit it!'
        });
    
        if (result.isConfirmed) {
          navigate(`/edit/${id}`);
          Swal.fire('Redirected!', 'You are being redirected to the edit page.', 'success');
        }
      };
    
      const handleDelete = async (id: string) => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        });
    
        if (result.isConfirmed) {
          try {
            const res = await axios.delete(`http://localhost:3001/employees/${id}`);
    
            if (res.status !== 200) {
              throw new Error('Failed to delete');
            }
            Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
            reload()
          } catch (error) {
            setError(true)
            console.error('Failed to delete employee:', error);
            Swal.fire('Error!', 'Failed to delete the employee.', 'error');
          }
        }
      };
      
  return (
    <table className="bg-white">
              <thead>
                <tr className="text-center text-xs md:text-base font-bold text-sky-900">
                  <th className="px-2 py-2">No</th>
                  <th className="px-2 py-2">NIP</th>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Position</th>
                  <th className="px-2 py-2">Division</th>
                  <th className="px-2 py-2">Working Status</th>
                  <th className="px-2 py-2">Salary</th>
                  <th className="px-2 py-2">Join Date</th>
                  <th className="px-2 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {employee.length > 0 ? (
                  employee.map((employee, index) => (
                    <tr key={employee.id} className="border-t">
                      <td className="px-2 py-2">{index + 1}</td>
                      <td className="px-2 py-2">{employee.id}</td>
                      <td className="px-2 py-2 text-sm md:text-base text-primary">
                        {`${employee.firstName} ${employee.lastName}`}
                      </td>
                      <td className="px-2 py-2 text-sm md:text-base">{employee.position}</td>
                      <td className="px-2 py-2 text-sm md:text-base">{employee.division}</td>
                      <td className="px-2 py-2 text-sm md:text-base">{employee.workingStatus}</td>
                      <td className="px-2 py-2 text-sm md:text-base">Rp {employee.salary}</td>
                      <td className="px-2 py-2 text-sm md:text-base">{moment(employee.joinDate).format("DD-MM-YYYY")}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleDetail(employee.id)} className="bg-blue-500 text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
                            <div className="grid place-items-center">
                              <img src={eye} alt="view" />
                            </div>
                          </button>
                          <button onClick={() => handleEdit(employee.id)} className="bg-[#5D5FEF] text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
                            <div className="grid place-items-center">
                              <img src={edit} alt="edit" />
                            </div>
                          </button>
                          <button onClick={() => handleDelete(employee.id)} className="bg-red-500 text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
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
                      No employees
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
  )
}
