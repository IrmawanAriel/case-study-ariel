import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import edit from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/trash.svg';
import moment from "moment";

interface EmployeeInterface {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    position: string;
    salary: string;
    division: string;
    birthDate: string;
    joinDate: string;
}

const Detailpage = () => {
    const { id } = useParams<{ id: string }>();
    const [detailEmployee, setDetailEmployee] = useState<EmployeeInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    useEffect(() => {
        const getEmployeeDetails = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/employees/${id}`);
                if (result.status !== 200) {
                    throw new Error("Failed to fetch employee details");
                }
                setDetailEmployee(result.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch employee:", error);
                setLoading(false);
                // SweetAlert error notification
                Swal.fire("Error", "Failed to fetch employee details", "error");
            }
        };

        getEmployeeDetails();
    }, [id]);

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
            navigate(`/`);
          } catch (error) {
            console.error('Failed to delete employee:', error);
            Swal.fire('Error!', 'Failed to delete the employee.', 'error');
          }
        }
      };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (!detailEmployee) {
        return <div className="text-center mt-10">No employee data found</div>;
    }

    return (
        <main className="flex flex-col pb-16 px-2 tbt:px-10 lg:px-32 bg-neutral-100 font-mulish h-screen">
            <section className="p-8 gap-4 flex flex-col self-center mt-16 w-full bg-white rounded-3xl max-w-[1105px] max-md:mt-10 max-md:max-w-full bg-slate-100 border-2">
                <Link to="/">
                    <button className="border bg-red-500 rounded-md px-6 py-1 font-bold tracking-wider text-center text-slate-50">
                        Back
                    </button>
                </Link>

                <div className="flex flex-wrap gap-5 justify-center w-full max-md:max-w-full">
                    <h1 className="my-auto text-2xl font-bold text-slate-900">Employee Details</h1>
                </div>

                <div className="mt-6">
                    <table className="min-w-full table-auto border-collapse border rounded-lg border-slate-500">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 font-bold">First Name:</td>
                                <td className="border px-4 py-2">{detailEmployee.firstName}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Last Name:</td>
                                <td className="border px-4 py-2">{detailEmployee.lastName}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Address:</td>
                                <td className="border px-4 py-2">{detailEmployee.address}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Position:</td>
                                <td className="border px-4 py-2">{detailEmployee.position}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Salary:</td>
                                <td className="border px-4 py-2">{detailEmployee.salary}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Division:</td>
                                <td className="border px-4 py-2">{detailEmployee.division}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Birth Date:</td>
                                <td className="border px-4 py-2">{moment(detailEmployee.birthDate).format("DD/MM/YYYY")}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Join Date:</td>
                                <td className="border px-4 py-2">{moment(detailEmployee.joinDate).format("DD/MM/YYYY")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => handleEdit(detailEmployee.id)} className="bg-[#5D5FEF] text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
                        <div className="grid place-items-center">
                            <img src={edit} alt="edit" />
                        </div>
                    </button>
                    <button onClick={() => handleDelete(detailEmployee.id)} className="bg-red-500 text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
                        <div className="grid place-items-center">
                            <img src={deleteIcon} alt="delete" />
                        </div>
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Detailpage;
