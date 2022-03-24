import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';


const Create = (props) => {
    const [form,setForm] = useState({
        title: "",
        price: null,
        description: ""
    })

    const [error,setError] = useState({});
    const history = useHistory();

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        axios.post("http://localhost:8000/api/products/create", form)
            .then(res=>{
                console.log(res)
                history.push("/")
            })
            .catch(err=>{
                console.log(err.response);
                setError(err.response.data.err.errors)
            })
    }


    return(
        <div>
            <h1>Create Product</h1>
            <form className="w-75 mx-auto" onSubmit={onSubmitHandler}>
                <div className="form-group my-3">
                    <label htmlFor="title" className="mx-2">Title </label>
                    <input type="text" name="title" className="form-control" onChange={onChangeHandler}/>
                    <span className="alert-danger">{error.title && error.title.message}</span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="price" className="mx-2">Price</label>
                    <input type="number" name="price" className="form-control" onChange={onChangeHandler}/>
                    <span>{error.price && error.price.message}</span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description" className="mx-2">Description </label>
                    <textarea name="description" cols="30" rows="10" className="form-control" onChange={onChangeHandler}></textarea>
                    <span className="alert-danger">{error.description && error.description.message}</span>
                </div>
                <input type="submit" className="btn btn-success btn-lg my-3"/>
            </form>
            <Link to="/">Home</Link>
        </div>
    )
}

export default Create