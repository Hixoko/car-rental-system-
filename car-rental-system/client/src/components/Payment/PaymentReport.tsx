import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ReactToPrint from 'react-to-print';

export default function PaymentReport() {

    const [pay, setPayment] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const componentRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/payments/")

            .then(res => {
                setPayment(res.data);

            })
            .catch(err => {
                console.log(err);
            })

    }, [])


    return (
        <>

            <Button variant="warning" onClick={handleShow} style={{ "width": "300px", "height": "40px", "color": "white", borderRadius: "50px", background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%" }} >
                Genarate Report
            </Button>

            <Modal show={show}
                onClick={handleClose}
                size="xl"
                centered

            >
                <Modal.Header closeButton style={{backgroundColor:"grey"}}>

                </Modal.Header>

                <Modal.Body style={{backgroundColor:"grey"}}>

                    <div className="container-fluid pt-4 px-4" ref={componentRef} >

                        <div>

                            <h1 className='text-center' style={{ "marginBottom": "50px", "color": "black", "fontFamily": "fantasy" }}> Month End Payment Summary</h1>
                            <div className="bg-secondary text-center rounded p-4" >

                                <div className="table-responsive">
                                    <table className="table text-start align-middle table-bordered table-hover mb-0" >
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col" style={{ "fontSize": "20px", "color": "white" }}>payment_id</th>
                                                <th scope="col" style={{ "fontSize": "20px", "color": "white" }}>booking_id</th>
                                                <th scope="col" style={{ "fontSize": "20px", "color": "white" }}>name</th>
                                                <th scope="col" style={{ "fontSize": "20px", "color": "white" }}>card </th>
                                                <th scope="col" style={{ "fontSize": "20px", "color": "white" }}>amount</th>
                                                <th scope="col" style={{ "fontSize": "20px", "color": "white" }}>contact_number</th>


                                            </tr>
                                        </thead>
                                        <tbody style={{ color: "white" }}>
                                            {pay.map(dm => (
                                                <tr key={dm.payment_id}>
                                                    <td style={{ "fontSize": "20px", "fontFamily": "Arial-Black" }}>{dm.payment_id}</td>
                                                    <td style={{ "fontSize": "20px", "fontFamily": "Arial-Black" }}>{dm.booking_id}</td>
                                                    <td style={{ "fontSize": "20px", "fontFamily": "Arial-Black" }}>{dm.name}</td>
                                                    <td style={{ "fontSize": "20px", "fontFamily": "Arial-Black" }}>{dm.card}</td>
                                                    <td style={{ "fontSize": "20px", "fontFamily": "Arial-Black" }}>{dm.amount}</td>
                                                    <td style={{ "fontSize": "20px", "fontFamily": "Arial-Black" }}>{dm.contact_number}</td>


                                                </tr>
                                            ))}
                                        </tbody>



                                    </table>


                                </div>
                            </div>


                        </div>
                        <br />

                    </div>


                </Modal.Body>
                <Modal.Footer style={{backgroundColor:"grey"}}>
                    <ReactToPrint
                        trigger={() => <Button variant="primary" style={{ "width": "300px", "height": "40px", "color": "white", borderRadius: "50px", background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%" }}>
                            Print Report
                        </Button>}
                        content={() => componentRef.current}


                    />



                </Modal.Footer>
            </Modal>
        </>
    );
}