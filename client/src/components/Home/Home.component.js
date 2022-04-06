import React, { useState, useEffect } from 'react';
import {
    useLocation,
    useNavigate,
    useParams,
    Link
} from "react-router-dom";
import axios from 'axios';
import MainCarousel from '../Common/Corousel/Corousel.component';
import './Home.style.css';

const Home = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/categories").then(
            (response) => {
                setCategories(response.data);
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);
    return (
        <main>
            <section className="corousel-wrapper">
                <MainCarousel />
            </section>
            <section className="home">
                {categories.map((item, i) => {
                    if (i % 2 === 0) {
                        return (
                            <article key={item.key} className="home__category">
                                <img className="category__image" src={`.` + item.imageUrl} alt=""></img>
                                <div className="category__description-wrapper">
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p>
                                    <Link role="navigation" to={{ pathname: '/products', state: { catId: item.id } }} className="w3-button w3-pink" aria-label={`Explore ` + item.name}>
                                        {`Explore ` + item.name}</Link>
                                </div>
                            </article>
                        )
                    }
                    else {
                        return (
                            <article key={item.key} className="home__category">
                                <div className="category__description-wrapper">
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p>
                                    <Link role="navigation" to={{ pathname: '/products', state: { catId: item.id } }} className="w3-button w3-pink" aria-label={`Explore ` + item.name}>
                                        {`Explore ` + item.name}</Link>
                                </div>
                                <img className="category__image" src={`.` + item.imageUrl} alt=""></img>
                            </article>
                        )
                    }

                })}
            </section>
        </main>
    );
}



function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter(Home);