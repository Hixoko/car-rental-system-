import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'
import CarDetailsPage from './CarDetailsPage';

export default function Inquiries() {

  const [lCars, setlCars] = useState<any[]>([]);
  const [pCars, setpCars] = useState<any[]>([]);
  const [gCars, setgCars] = useState<any[]>([]);
  const [image, setImage] = useState("");
  let { car_Id } = useParams();
  let url = ""

  const PF = "http://localhost:5000/images/"

  useEffect(() => {
    const fetchcar = async () => {
      const res = await axios.get('http://localhost:5000/api/cars/category/Luxury/')
      setlCars(res.data)
      setImage(res.data['image'])

    }
    fetchcar()
  }, [])

  useEffect(() => {
    const fetchcar = async () => {
      const res = await axios.get('http://localhost:5000/api/cars/category/Premium/')
      setpCars(res.data)
      setImage(res.data['image'])

    }
    fetchcar()
  }, [])

  useEffect(() => {
    const fetchcar = async () => {
      const res = await axios.get('http://localhost:5000/api/cars/category/General/')
      setgCars(res.data)
      setImage(res.data['image'])

    }
    fetchcar()
  }, [])

  return (
    <div>
      <Header />
      <br /> <br />
      <h2 style={{ "marginLeft": "15px" }}>Luxury Cars</h2>
      <div className="row row-cols-1 row-cols-md-4 g-2" style={{ "marginLeft": "10px", "marginRight": "10px" }}>
        {lCars.map(lcr => (
          <div key={lcr.car_Id} className="col">
            <div className="card" >
              <img src={PF + lcr.image} className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{lcr.model}</h5>
                <a href="/add-booking" className="btn btn-info">Inquiry</a>
                {/* <Link to = {`CarDetailsPage/:id`} className="btn btn-info" >Details</Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <br /><br />

      <h2 style={{ "marginLeft": "15px" }}>Premium Cars</h2>
      <div className="row row-cols-1 row-cols-md-4 g-2" style={{ "marginLeft": "10px", "marginRight": "10px" }}>
        {pCars.map(pcr => (
          <div key={pcr.car_Id} className="col">
            <div className="card" >
              <img src={PF + pcr.image} className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{pcr.model}</h5>
                <a href="/add-booking" className="btn btn-info">Inquiry</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <br /><br />

      <h2 style={{ "marginLeft": "15px" }}>General Cars</h2>
      <div className="row row-cols-1 row-cols-md-4 g-2" style={{ "marginLeft": "10px", "marginRight": "10px" }}>
        {gCars.map(gcr => (
          <div key={gcr.car_Id} className="col">
            <div className="card" >
              <img src={PF + gcr.image} className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{gcr.model}</h5>
                <a href="/add-booking" className="btn btn-info">Inquiry</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <br /><br /><br /><br /><br />
      <Footer />
    </div>
  )
}
