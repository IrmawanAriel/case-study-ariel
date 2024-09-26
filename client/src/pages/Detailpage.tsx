import { useEffect} from "react"
import { useParams } from "react-router-dom";

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

const Detailpage = () => {

    const { id } = useParams<{ id: string }>();

    useEffect(()=>{
        
    },[id])

  return (
    <div>Detailpage</div>
  )
}

export default Detailpage
