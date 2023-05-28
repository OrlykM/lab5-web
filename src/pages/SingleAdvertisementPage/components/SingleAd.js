import React, { useEffect, useState } from "react";
import styles from "../styles/style.module.scss";
import { Link, useNavigate } from "react-router-dom";

function SingleAd() {
    let navigate = useNavigate();
    const article_id = sessionStorage.getItem("ArticleId");
    const is_local = sessionStorage.getItem("IsLocal");

    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [userdata, setUserData] = useState([]);
    const [location, setLocation] = useState([]);
    const [currentuser, setCurrentUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let res;
            if (is_local === "1") {
                res = await fetch(`http://localhost:5000/advertisement/local/${article_id}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        "Authorization": sessionStorage.getItem("Authorization")
                    }
                });
            } else {
                res = await fetch(`http://localhost:5000/advertisement/public/${article_id}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        "Authorization": sessionStorage.getItem("Authorization")
                    }
                });
            }
            const data = await res.json();

            const res2 = await fetch(`http://localhost:5000/category/${data.id_category}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                }
            });
            const categoryData = await res2.json();

            const res3 = await fetch(`http://localhost:5000/user/${data.user_id}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                }
            });
            const userData = await res3.json();

            const res4 = await fetch(`http://localhost:5000/location/${userData.idlocation}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                }
            });
            const locationData = await res4.json();

            const res5 = await fetch(`http://localhost:5000/user/self`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                }
            });
            const currentUserData = await res5.json();

            setData(data);
            setCategory(categoryData);
            setUserData(userData);
            setLocation(locationData);
            setCurrentUser(currentUserData);
        };
        fetchData();
    }, []);

    let path;
    if (data.photoUrl !== null) {
        path = "http://127.0.0.1:3000/media/" + data.photoUrl;
    }

    const handleDelete = async () => {
        let url;
        if (is_local === "1") {
            url = `http://localhost:5000/advertisement/local/${article_id}`;
        } else {
            url = `http://localhost:5000/advertisement/public/${article_id}`;
        }

        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem("Authorization")
            }
        });

        sessionStorage.removeItem("ArticleId");
        sessionStorage.removeItem("IsLocal");
        navigate("/ad");
    };

    const handleDisable = async () => {
        let url;
        let status;
        if (is_local === "1") {
            url = `http://localhost:5000/advertisement/local/${article_id}`;
            status = "closed";
        } else {
            url = `http://localhost:5000/advertisement/public/${article_id}`;
            status = "closed";
        }

        await fetch(url, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem("Authorization")
            },
            body: JSON.stringify({ status })
        });

        sessionStorage.removeItem("ArticleId");
        sessionStorage.removeItem("IsLocal");
        navigate("/ad");
    };

    return (
        <>
            <div className={styles.container} data-testid="single-ad-container">
                {(() => {
                    if (userdata.id === currentuser.id) {
                        if (data.status === "active") {
                            return <span>Status:<p className={styles.active}> Active </p></span>;
                        }
                        if (data.status === "closed") {
                            return <span>Status:<p className={styles.disabled}> Closed </p></span>;
                        }
                        if (data.status === "confirmed") {
                            return <span>Status:<p className={styles.notconfirmed}> Confirmed </p></span>;
                        }
                    }
                })()}

                <h1 className={styles.h1}>{data.title}</h1>
                <div className={styles.date}>Published {data.publishingDate}</div>
                <div className={styles.author}>Author: {userdata.firstName} {userdata.lastName}</div>
                <div className={styles.author}>Phone: {userdata.phone}</div>
                <div className={styles.city}>City: {location.city}</div>
                <img src={path} alt={"Image"} className={styles.img} />
                <div className={styles.p}>Description: {data.about}</div>

                {(() => {
                    if (userdata.id === currentuser.id) {
                        return (
                            <div>
                                <h3>Author instruments</h3>
                                <button className={styles.disable_btn} onClick={handleDisable}>Disable</button>
                                <button className={styles.delete_btn} onClick={handleDelete}>Delete</button>
                            </div>
                        );
                    }
                })()}
            </div>
        </>
    );
}

export default SingleAd;
