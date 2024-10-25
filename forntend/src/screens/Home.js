
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
//import Carousal from '../components/Carousal'


export default function Home() {


    const [search, setSearch] = useState([]);
    const [foodCat, setfoodCat] = useState([]);
    const [foodItems, setfooditems] = useState([]);
    const loadData = async () => {
        //let response = await fetch("http://localhost:5000/api/foodData"
        let response = await fetch("https://zelious-backend.onrender.com/api/foodData"
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },


            })
        response = await response.json();
        //console.log(response[0],response[1]);
        setfooditems(response[0]);
        setfoodCat(response[1]);
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <div>
            <Navbar />

            <div><div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ "objectFit": "contain !important" }}>
                    <div className="carousel-inner " id='car'>
                        <div className='carousel-caption' style={{ "zIndex": "1" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://images.pexels.com/photos/699544/pexels-photo-699544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/12061487/pexels-photo-12061487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div></div>




            <div className='container'>
                {foodCat != [] ? foodCat.map(
                    (data) => {
                        return (<div>
                            <div key={data._id} className='fs-3 m-3'>
                                {data.CategoryName}
                            </div>
                            <hr />
                            <div style={{ "display": "flex", "flex-wrap": "wrap", "overflow": "hidden", "justify-content": "space-around" }}>

                                {foodItems != [] ? foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search))).map(
                                    filteritems => {
                                        return (
                                            <div key={filteritems._id} style={{ "margin": "5px", "padding": "10px", "width": "350px", "text-align": "center" }}>
                                                <Card food={filteritems} options={filteritems.options} />
                                            </div>
                                        )
                                    }
                                ) : <div>No data in this category</div>}
                            </div>
                        </div>)
                    }
                ) : ""}
            </div>



            <div><Footer /></div>
        </div>
    )
}
