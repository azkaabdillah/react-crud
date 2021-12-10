import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React,{ useState } from 'react'
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [age, setAge] = useState(0);

  const [dataList, setDataList] = useState([]);

  const [show, setShow] = useState(false)


  const addData = () => {
    axios.post("http://localhost:3001/create", {
      name : name,
      job : job,
      age : age
    }).then(() => {
      console.log('success')
    })
  }

  const getData = () => {
    axios.get("http://localhost:3001/data")
    .then((response) => {
      setDataList(response.data)
    })
    setShow(true)
  }

  return (
    <div className='app container'  style={{maxWidth : '600px'}}>

    {/*  CREATE DATA  */}
      <div className="border p-3">
        <div className="mb-3 mt-1">
          <strong htmlFor="formGroupExampleInput" className="form-label">name :</strong>
          <input onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your name"/>
        </div>
        <div className="mb-3">
          <strong htmlFor="formGroupExampleInput2" className="form-label">job :</strong>
          <input onChange={(event) => setJob(event.target.value)} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your job"/>
        </div>
        <div className="mb-3">
          <strong htmlFor="formGroupExampleInput2" className="form-label">age :</strong>
          <input onChange={(event) => setAge(event.target.value)} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your age"/>
        </div>
        <button onClick={addData} type="button" className="btn btn-success mt-2 w-100">Submit</button>
      </div>

     {/*  READ DATA  */}
      <div className='data mt-2'>
        <button onClick={getData} type='button' className='btn btn-primary mt-2 w-100' >Show data</button>
        {show && 
          <div className='row'>
            {dataList.map ((val, key) => {
              return (
                <div key={val.id} className="w-100 mt-3">
                  <div className="border row">
                    <div className="col-6 card-body">
                      <h5 className="card-title name">
                        {val.id}. Name : {val.name}
                      </h5>
                    </div>
                    <div className="col-6 card-body">
                      <div
                        className="text-end"
                      >
                        <button
                          type="button"
                          className="btn btn-info"
                          data-bs-toggle="collapse"
                          href="#collapseExample"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          description
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="collapse mt-1 row border" id="collapseExample">
                    <div className='col-6'>
                      <h5 className="p-2 ps-3 w-100">
                        <p><strong>Id :</strong> {val.id}</p>
                        <p><strong>Name :</strong> {val.name}</p>
                        <p><strong>Job :</strong> {val.job}</p>
                        <p><strong>Age :</strong> {val.age}</p>
                      </h5>
                    </div>
                    <div className='col-6 text-end'>
                      <button type="button" class="mt-3 me-3 btn btn-sm btn-warning btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                    </div>
                  </div>

                  {/* modal edit */}
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          ...
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );  
            })}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
