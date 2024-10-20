import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './Contextreducer';
import { useNavigate } from 'react-router-dom'

export default function Card(props) {
    let navigate = useNavigate()
    let data = useCart();
    let dispatch = useDispatchCart();
    let options = props.options;
    let priceOptions = Object.keys(options[0]);  // Changed name for clarity
    let foodItem = props.food;

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0]); // Initialize size with the first available option
    const priceRef = useRef();

    useEffect(() => {
        setSize(priceRef.current.value); // Set size based on the first option in the dropdown
    }, []);

    // Dynamically calculate finalPrice based on current qty and size
    let finalPrice = qty * parseInt(options[0][size], 10); 
    const handleClick = () => {
        if (!localStorage.getItem("token")) {
          navigate("/login")
        }
      }
      const handleQty = (e) => {
        setQty(e.target.value);
      }
      const handleOptions = (e) => {
        setSize(e.target.value);
      }

    const handleAddToCart = async () => {
        let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food != []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
        console.log(data);
    }

    return (
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "500px" }}>
            <img style={{ "maxHeight": "200px", objectFit: "fill" }} src={foodItem.img} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{foodItem.name}</h5>
                <p className="card-text">{foodItem.description}</p>
                <div className='container w-100'>
                    <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(parseInt(e.target.value, 10))}>
                        {Array.from(Array(6), (k, i) => {
                            return (<option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>)
                        })}
                    </select>

                    <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)} >
                        {priceOptions.map((option) => {
                            return (<option key={option} value={option}>{option}</option>)
                        })}
                    </select>

                    <div className='d-inline h-100 fs-5'>
                        Rs {finalPrice}/-
                    </div>
                </div>
                <hr />
                <button className='btn justify-center ms-2 mb-2 bg-info text-white' onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    )
}
