import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../styles/style.module.scss";

function AllAd() {
    const [data, setData] = useState([]);
    const [localdata, setLocalData] = useState([]);
    const [mixedData, setMixedData] = useState([]);

    const options = {
        url: 'http://localhost:5000/advertisement/public',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };

    const options2 = {
        url: 'http://localhost:5000/advertisement/local',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    const handleClick = () => {

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(options.url, {
                    method: options.method,
                    headers: options.headers
                });
                const result = await response.json();

                const response2 = await fetch(options2.url, {
                    method: options2.method,
                    headers: options2.headers
                });
                const result2 = await response2.json();

                setData(result);
                setLocalData(result2);
                setMixedData(result.concat(result2));

                shuffle(mixedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {mixedData.map((item, index) => (
                <div className={styles.listing} key={index} role="ad-listing">
                    {item.status === "active" ? (
                        <>
                            <h2>{item.title}</h2>
                            <p>{item.about}</p>
                            <p className={"date"}>{item.publishingDate}</p>
                            <Link to={"/ad/show"} >
                                <button
                                    className={styles.select_btn}
                                    onClick={() => {
                                        if ("location_id" in item) {
                                            sessionStorage.setItem("ArticleId", item.id);
                                            sessionStorage.setItem("IsLocal", 1);
                                        } else {
                                            sessionStorage.setItem("ArticleId", item.id);
                                            sessionStorage.setItem("IsLocal", 0);
                                        }
                                    }}
                                >
                                    Show
                                </button>
                            </Link>
                        </>
                    ) : null}
                </div>
            ))}
        </>
    );
}

export default AllAd;
