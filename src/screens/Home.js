import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'

export default function Home() {
    const [foodCat,setfoodCat]=useState([]);
    const [foodItems,setfooditems]=useState([]);
    const loadData=async()=>{
        let response= await fetch("http://localhost:5000/api/foodData",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            
        })
        response=await response.json();
        //console.log(response[0],response[1]);
        setfooditems(response[0]);
        setfoodCat(response[1]);
    }

    useEffect(()=>{
        loadData();
    },[])
    return (
        <div>
            <div><Navbar /></div>
            <div><Carousal/></div>
            <div className='container'>
            {foodCat !=[] ? foodCat.map(
                (data)=>{
                    return(<>
                    <div key={data._id} className='fs-3'>
                        {data.CategoryName}
                    </div>
                    <hr />
                    {foodItems!=[]?foodItems.filter((item)=>item.CategoryName===data.CategoryName).map(
                        filteritems=>{return(
                            <div key={filteritems._id}>
                                <Card/>
                            </div>
                        )}
                    ):<div>No data in this category</div>}
                    </>)
                }
            ):""}
            </div>
            <div><Footer /></div>
        </div>
    )
}
