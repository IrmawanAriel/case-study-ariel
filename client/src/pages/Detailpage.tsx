import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

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
    joinDate: string;
}

const Detailpage = () => {

    const { id } = useParams<{ id: string }>();
    const [detailEmployee, setDetailEmployee] = useState<EmployeeInterface>({
        firstName: '',
        lastName: '',
        address: '',
        position: '',
        salary: '',
        division: '',
        birthDate: '',
        joinDate: ''
    });

    useEffect(() => {
        const get = async () => {
            try {
                let result = await axios.get(`http://localhost:3001/employees/${id}`)
                if (result.status !== 200) {
                    throw new Error
                }
                console.log(result.data) //checking
                setDetailEmployee(result.data)

            } catch (error) {
                console.error('Failed to delete employee:', error);
            }
        }

        get()
    }, [id])


    if (!detailEmployee) {
        return <div>Loading...</div>
    }

    console.log(detailEmployee)

    return (
        <main className="flex flex-col pb-16 px-2 tbt:px-10 lg:px-32 bg-neutral-100 font-mulish h-screen">
            <section className="flex flex-col self-center mt-16 w-full bg-white rounded-3xl max-w-[1105px] max-md:mt-10 max-md:max-w-full bg-slate-100 border-2">
                <div className="flex flex-col px-14 pt-6 pb-10 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
                        <h1 className="my-auto text-2xl font-bold text-slate-900">Employees Details</h1>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Detailpage
