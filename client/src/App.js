import React, { Component, lazy, Suspense } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import store from "./redux/store";

import Header from './components/Common/Header/Header.component';
import Footer from './components/Common/Footer/Footer.component';
import './App.css';
const Register = lazy(() => import("./components/Register/Register.component"));
const Login = lazy(() => import("./components/Login/Login.component"));
const Home = lazy(() => import("./components/Home/Home.component"));
const Products = lazy(() => import("./components/Products/Products.component"));


class App extends Component {
  render() {
    const App = () => (
      <Provider store={store}>
          <Header />
          <Suspense fallback={<div className="loader-wrapper"><div className="loader"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/products' element={<Products />} />
            </Routes>
          </Suspense>
          <Footer />
        </Provider>
     
    )
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}

export default App;

