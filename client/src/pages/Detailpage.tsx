import axios from "axios";
import { useEffect, useState} from "react"
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

    useEffect(()=>{
        const get = async () => {
            try {
                let result = await axios.get(`http://localhost:3001/employees/${id}`)
                if(result.status!==200) {
                    throw new Error
                }
                console.log(result.data) //checking
                setDetailEmployee(result.data)

            } catch(error){
                console.error('Failed to delete employee:', error);
            }
        }

        get()
    },[id])


    if(!detailEmployee){
        return <div>Loading...</div>
    }

    console.log(detailEmployee)

  return (
    <div>Detailpage</div>
  )
}

export default Detailpage
