import React from 'react'

export default function Card(props) {
    let options=props.options;
    let priceopt=Object.keys(options[0]);
  return (
    <div className="card mt-3  " style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img style={{  "maxHeight": "200px" }} src={props.imgSrc} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        <p className="card-text">{props.des}</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded'>
                                {Array.from(Array(6), (k, i) => {
                                    return (<option key={i + 1} value={i + 1}>
                                        {i + 1}

                                    </option>)
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded'>
                                {priceopt.map((data)=>{
                                    return(<option key={data} value={data}>{data}</option>)
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                total price
                            </div>
                        </div>
                    </div>
                </div>
  )
}
