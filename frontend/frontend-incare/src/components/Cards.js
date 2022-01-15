import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'
import React from 'react'

const Cards = ({userId,setUserID}) => {
    const history = useNavigate();
    const handlePrescribe =(e)=>{
        e.preventDefault();
        history('/presciption');
    }
    const handleImmunisation =(e)=>{
        e.preventDefault();
        history('/immunisation');
    }
    const handleProblem =(e)=>{
        e.preventDefault();
        history('/diagnosis');
    }
  return (
  <div style={{backgroundColor:"lightblue"}}>
    <div className="container-fluid py-5 my-5" >
      <div className="d-flex justify-content-center">
        <div className="col-8">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col mt-5">
              <div className="card border-warning card-wr-bg"> <img src="gold.jpg" className="card-img-top" alt="..." />
                <div className="card-body d-grid gap-3">
                  <h5 className="card-title text-center text-capitalize">Silver</h5>
                  <p className="card-text text-center p-0 pb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat excepturi eligendi nulla voluptatum, perferendis adipisci, dignissimos similique magnam cumque
                    sint quod? Quisquam, corrupti.</p>
                    <Button fullWidth onClick={handlePrescribe}> Prescribe</Button>
                </div>
                <div className="card-footer text-light bg-warning">
                </div>
              </div>
            </div>
            <div className="col mt-5">
              <div className="card border-success card-s-bg "> <img src="gold.jpg" className="card-img-top" alt="..."/>
                <div className="card-body d-grid gap-3">
                  <h5 className="card-title text-center text-capitalize">Gold</h5>
                  <p className="card-text text-center p-0 pb-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    minima ullam ex facere distinctio cumque facilis quas aperiam, culpa molestiae asperiores voluptatibus
                    impedit corporis delectus et assumenda?</p>
                    <Button fullWidth onClick={handleImmunisation}> Immunisation details</Button>
                </div>
                <div className="card-footer bg-success text-light">
                </div>
              </div>
            </div>
            <div className="col mt-5">
              <div className="card border-danger card-d-bg"> <img src="gold.jpg" className="card-img-top" alt="..."/>
                
                  <div className="card-body d-grid gap-3">
                    <h5 className="card-title text-center text-capitalize">Platinum</h5>
                    <p className="card-text text-center p-0 pb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                      harum quia provident? Atque laborum quibusdam sint dignissimos eius. Molestiae ullam quo consectetur,
                      voluptatibus suscipit.</p>
                      <Button fullWidth onClick={handleProblem}> Problem/Diagnosis</Button>
                  </div>
                
                <div className="card-footer bg-danger text-light">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Cards
