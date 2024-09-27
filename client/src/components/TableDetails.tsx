import moment from 'moment'

interface responseData {
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

  interface propsEmployeeDetail {
    Employee: responseData;
  }

export default function TableDetails({Employee}: propsEmployeeDetail) {
  return (
    <div className="mt-6">
                    <table className="min-w-full table-auto border-collapse border rounded-lg border-slate-500">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 font-bold">First Name:</td>
                                <td className="border px-4 py-2">{Employee.firstName}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Last Name:</td>
                                <td className="border px-4 py-2">{Employee.lastName}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Address:</td>
                                <td className="border px-4 py-2">{Employee.address}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Position:</td>
                                <td className="border px-4 py-2">{Employee.position}</td>
                            </tr>
                            
                            <tr>
                                <td className="border px-4 py-2 font-bold">Division:</td>
                                <td className="border px-4 py-2">{Employee.division}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Salary:</td>
                                <td className="border px-4 py-2">Rp.{Employee.salary}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Working Status:</td>
                                <td className="border px-4 py-2">{Employee.workingStatus}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Birth Date:</td>
                                <td className="border px-4 py-2">{moment(Employee.birthDate).format("DD/MM/YYYY")}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Join Date:</td>
                                <td className="border px-4 py-2">{moment(Employee.joinDate).format("DD/MM/YYYY")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
  )
}
