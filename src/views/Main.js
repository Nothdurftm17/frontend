import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"

const Main = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/products/findAll")
            .then(res => {
                console.log(res)
                setProducts(res.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const onDeleteHandler = (_id, arrIndex) => {
        console.log('deleting' + arrIndex)
        axios.delete(`http://localhost:8000/api/products/${_id}`)
            .then(res=>{
                console.log(res);
                const copyState = [...products];
                copyState.splice(arrIndex,1)
                setProducts(copyState);
            })
            .catch(err=> {
                console.log(err.response)
            })

    }

    return (
        <div className="w-75 mx-auto">
            <h1>Here are the products!</h1>
            <table className='table table-dark table-striped table-hover'></table>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((item, i) => {
                            return <tr key={i}>
                                <td><Link to={`/products/${item._id}`}>{item.title}</Link></td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td className="d-flex m-2"><button className="btn btn-primary btn-lg"> Edit</button> <button onClick={()=>onDeleteHandler(item._id, i)} className="btn btn-primary btn-lg mx-2">Delete</button></td>
                                </tr>
                        })
                    }
                </tbody>
            </table>
            <Link to="/products/create"> Create a Product</Link>
        </div>
    )
}

export default Main