import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import styles from "../styles/style.module.scss";

function UserSettings() {
    let navigate = useNavigate();
    const { register, getValues } = useForm();
    const [data, setData] = useState([]);

    const options = {
        url: 'http://localhost:5000/user/self',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(options.url, {
                method: options.method,
                headers: options.headers
            });
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(getValues("email"), getValues("phone"));

        if (getValues("email") && getValues("phone")) {
            const options1 = {
                url: 'http://localhost:5000/user/self',
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                body: JSON.stringify({
                    email: getValues("email"),
                    phone: getValues("phone")
                })
            };
            const result2 = await fetch(options1.url, {
                method: options1.method,
                headers: options1.headers,
                body: options1.body
            });
        }
        if (!getValues("email") && !getValues("phone")) {
            navigate("/user");
        } else if (getValues("phone")) {
            const options1 = {
                url: 'http://localhost:5000/user/self',
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                body: JSON.stringify({
                    phone: getValues("phone")
                })
            };
            const result2 = await fetch(options1.url, {
                method: options1.method,
                headers: options1.headers,
                body: options1.body
            });
        } else if (getValues("email")) {
            const options1 = {
                url: 'http://localhost:5000/user/self',
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                body: JSON.stringify({
                    email: getValues("email")
                })
            };
            const result2 = await fetch(options1.url, {
                method: options1.method,
                headers: options1.headers,
                body: options1.body
            });
            const encodedCredentials = btoa(`${getValues("email")}:${data.password}`);
            sessionStorage.setItem('Authorization', `Basic ${encodedCredentials}`);
        }
        navigate('/user');
    };

    const handleDelete = async (e) => {
        const options = {
            url: 'http://localhost:5000/user/self',
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem("Authorization")
            }
        };

        if (window.confirm("You sure you want to delete your account? It can't be restored")) {
            await fetch(options.url, {
                method: options.method,
                headers: options.headers
            });
            sessionStorage.clear();
            localStorage.clear();
            navigate("/");
        }
    };

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" placeholder={data.firstName} readOnly />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" placeholder={data.lastName} readOnly />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder={data.email} {...register("email")} />

                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder={data.phone} {...register("phone")} />

                    <input type="submit" value="Save changes"></input>
                    <button className={styles.delete_btn} onClick={handleDelete}>Delete Account</button>
                    <br /><br /><br />
                </form>
            </div>
        </>
    );
}

export default UserSettings;
