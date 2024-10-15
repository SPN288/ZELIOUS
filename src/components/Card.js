import React from 'react'

export default function Card() {
  return (
    <div className="card mt-3  " style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img style={{  "maxHeight": "200px" }} src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded'>
                                {Array.from(Array(6), (k, i) => {
                                    return (<option key={i + 1} value={i + 1}>
                                        {i + 1}

                                    </option>)
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded'>
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                total price
                            </div>
                        </div>
                    </div>
                </div>
  )
}
