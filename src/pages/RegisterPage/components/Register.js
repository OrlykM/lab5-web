import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../styles/style.module.scss";

const Register = () => {
    let navigate = useNavigate();
    const { register, getValues } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            url: 'http://localhost:5000/user',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                firstName: getValues("firstName"),
                lastName: getValues("lastName"),
                email: getValues("email"),
                password: getValues("password"),
                phone: getValues("phone"),
                userStatus: "regular",
                isAdmin: 0,
                idlocation: getValues("location")
            })
        };

        fetch(options.url, {
            method: options.method,
            headers: options.headers,
            body: options.body
        }).then(res => {
            if (res.code === 405) {
                alert("Some fields are incorrect or user with that email or phone already exists");
                window.location.reload(false);
            }

            if (res.code === 200) {
                navigate('/login');
            }
        });

        navigate('/login');
    };

    return (
        <>
            <div className="container" onSubmit={handleSubmit}>
                <h2>Create an Account</h2>
                <form id="form">
                    <label htmlFor="name">Name*</label>
                    <input type="text" id="name" name="firstName" {...register("firstName")} required />

                    <label htmlFor="surname">Surname*</label>
                    <input type="text" id="surname" name="lastName" {...register("lastName")} required />

                    <label htmlFor="email">Email*</label>
                    <input type="email" id="email" name="email" {...register("email")} required />

                    <label htmlFor="password">Password*</label>
                    <input type="password" id="password" name="password" {...register("password")} required />

                    <label htmlFor="password-confirmation">Confirm Password*</label>
                    <input type="password" id="password-confirmation" name="password-confirmation"
                           {...register("password-confirm")} required />

                    <label htmlFor="phone">Phone Number*</label>
                    <input type="tel" id="phone" name="phone" {...register("phone")} required />

                    <label htmlFor="city">City*</label>
                    <input type="number" id="city" name="idlocation" {...register("location")} required />

                    <input type="submit" value="Create Account" />
                    <span>Already have an account? <Link to={"/login"}>Log In</Link></span>
                </form>
            </div>
        </>
    );
};

export default Register;
