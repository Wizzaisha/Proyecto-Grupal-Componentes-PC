import "./Profile.css";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Header from "../Header";
import { useAuth } from "../context/authContext";


function Profile(){

    const auth = useAuth();
    const  [selector, setSelector] = useState('buyOrders')

    function handleSelector(e){
        e.preventDefault();
        switch (e.target.name) {

            case 'buyOrders':
                setSelector('buyOrders')
                 break; 
        
            case 'favourites':
                setSelector('favourites')
                 break;
            default:
                break;
        }
    }


    if (selector === 'buyOrders'){

        return (
            <div>
            <Header/>
           
            <h1>Profile</h1>
                <div className="container-fluid profileContainer">
                <div className="profileDiv">
                <h4 className="start display-8">Email</h4>
                <label className="pt-2">{auth.user.email}</label>
                </div>
                <div className="profileDiv">
                <h4 className="start display-8">User name</h4>
                <label className="pt-2">{auth.user.displayName}</label>
                </div>
                </div>

                <ButtonGroup size="lg" className="mb-2 pt-2">
                    <Button type='submit' name='buyOrders' onClick={(e) => handleSelector(e)}>Historial de compras</Button>
                    <Button type='submit' name='favourites' onClick={(e) => handleSelector(e)}>Favoritos</Button>
                </ButtonGroup>

                <h1>Historial de compras</h1>

            </div>
        )}

    else{ 

        return (
            <div>
            <Header/>

            <h1>Profile</h1>   
                <div className="container-fluid profileContainer">
                <div className="profileDiv">
                <h4 className="start display-8">Email</h4>
                <label className="pt-2">{auth.user.email}</label>
                </div>
                <div className="profileDiv">
                <h4 className="start display-8">User name</h4>
                <label className="pt-2">{auth.user.displayName}</label>
                </div>
                </div>

                <ButtonGroup size="lg" className="mb-2 pt-2">
                    <Button type='submit' name='buyOrders' onClick={(e) => handleSelector(e)}>Historial de compras</Button>
                    <Button type='submit' name='favourites' onClick={(e) => handleSelector(e)}>Favoritos</Button>
                </ButtonGroup>

                <h1>Favoritos</h1>
            </div>
        )}

}

export default Profile;