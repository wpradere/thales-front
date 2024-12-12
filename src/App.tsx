import './App.css'
import { useState } from 'react'

type Employee = {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
};

type DataResponse = Employee | Employee[];


function App() {
  const [data, setData] = useState<DataResponse | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleFetchData = () => {
    setLoading(true); 

  
    if (!inputValue) {
      fetch(`http://localhost:8080/data/all`)
        .then((response) => response.json())
        .then((data) => {
          setData(data); 
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); 
        });
      return; 
    }
    
    fetch(`http://localhost:8080/data/${inputValue}`)
      .then((response) => response.json())
      .then((data) => {      
          setData(data);
          setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); 
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <label className='label'>input :id</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Escribe el ID"
      />
      <button onClick={handleFetchData}>Enviar</button>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ): (
            Array.isArray(data) ? (
              data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.employee_name}</td>
                  <td>{user.employee_salary}</td>
                  <td>{user.employee_age}</td>
                </tr>
              ))
            ) : (
              data && (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.employee_name}</td>
                  <td>{data.employee_salary}</td>
                  <td>{data.employee_age}</td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
