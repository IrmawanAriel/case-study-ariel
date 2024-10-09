import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import threeDots from '../assets/icons/threeDots.svg'
import SearchLight from '../assets/icons/SearchLight.svg'
import TableDashboard from '../components/TableDashboard';

interface responseData {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  position: string;
  salary: string;
  division: string;
  workingStatus: string;
  birthDate: string;
  joinDate: string;
}

function Dashboard() {
  const [employees, setEmployees] = useState<responseData[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [filteredEmployees, setFilteredEmployees] = useState<responseData[]>([]);
  const [filterDivision, setFilterDivision] = useState<string>("All");
  const [filterWorkingStatus, setFilterWorkingStatus] = useState<string>("All");
  const [filterPosition, setFilterPosition] = useState<string>("All");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  // opsi data untuk filtrasi
  const divisions = ["All", "HR", "Engineering", "Finance", "Marketing"];
  const workingStatuses = ["All", "Active", "Inactive"];
  const positions = ["All", "Manager", "Developer", "Designer", "Analyst"];

  const fetchEmployees = async () => { // function pemanggil API
    try {
      const response = await axios.get('http://localhost:3001/employees');
      setEmployees(response.data);
      setFilteredEmployees(response.data)
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch sales data', error);
    }
  };

  useEffect(() => { // jalankan Pemanggilan disaat aplikasi jalan
    fetchEmployees();
  }, []);

  const setSearch = (name: string) => { // 
    
    const employeesByName = employees.filter((employee) => // define sebuah set data baru yang sudah di filter by fullname
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(name.toLowerCase())
    );
    
    setFilteredEmployees(employeesByName); // set data kedalam use state employees
  };

  const applyFilters = () => { // 
    setDropdownVisible(false)
    let filteredData = employees;

    if (filterDivision !== "All") {
      filteredData = filteredData.filter((employee) => employee.division === filterDivision);
    }

    if (filterWorkingStatus !== "All") {
      filteredData = filteredData.filter((employee) => employee.workingStatus === filterWorkingStatus);
    }

    if (filterPosition !== "All") {
      filteredData = filteredData.filter((employee) => employee.position === filterPosition);
    }

 setFilteredEmployees(filteredData); // assign data baru kedalam use state employees yang sudah di filter by division, working status, and position

  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, filterType: string) => {
    const selectedValue = e.target.value;

    switch (filterType) {
      case 'division':
        setFilterDivision(selectedValue);
        break;
      case 'workingStatus':
        setFilterWorkingStatus(selectedValue);
        break;
      case 'position':
        setFilterPosition(selectedValue);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="flex flex-col pb-16 px-2 tbt:px-10 lg:px-32 bg-neutral-100 font-mulish h-screen">
      <section className="flex flex-col self-center my-16 w-full h-full bg-white rounded-3xl max-w-[1105px] max-md:mt-10 max-md:max-w-full bg-slate-100 border-2">
        <div className="flex flex-col px-14 pt-6 pb-10 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full  h-full">
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
          <div className="overflow-x-auto mt-5 h-full">
            <div className="relative flex justify-between ">
              <button
                className='p-2 rounded-lg bg-green-400 flex items-center gap-2'
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                <img src={threeDots} alt="" />
                <p>Filter</p>
              </button>

              <div className="flex gap-4 p-3 tracking-wider bg-white rounded border border-solid border-neutral-200 text-slate-400">
                <img loading="lazy" src={SearchLight} alt="" className="object-contain shrink-0 w-6 aspect-square" />
                <input type="text" className="flex-auto outline-none" placeholder="Search Employee Name" onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearch((e.target as HTMLInputElement).value);
                  }
                }} />
              </div>

              {dropdownVisible && (
                <div className="absolute mt-16 z-50 bg-white shadow-md rounded p-4 bg-gray-400	">
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <label className="font-bold mr-2">Filter by Division:</label>
                      <select
                        className="outline-none rounded p-2"
                        value={filterDivision}
                        onChange={(e) => handleFilterChange(e, 'division')}
                      >
                        {divisions.map((division) => (
                          <option key={division} value={division}>
                            {division}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="font-bold mr-2">Filter by Working Status:</label>
                      <select
                        className="outline-none rounded p-2"
                        value={filterWorkingStatus}
                        onChange={(e) => handleFilterChange(e, 'workingStatus')}
                      >
                        {workingStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="font-bold mr-2">Filter by Position:</label>
                      <select
                        className="outline-none rounded p-2"
                        value={filterPosition}
                        onChange={(e) => handleFilterChange(e, 'position')}
                      >
                        {positions.map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={applyFilters} className="bg-blue-700 text-white rounded p-2">
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            <TableDashboard employee={filteredEmployees} reload={fetchEmployees} setError={setError}/>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
