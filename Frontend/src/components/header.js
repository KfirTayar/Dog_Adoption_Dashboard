import React from 'react'
import logo from '../images/adoptADogSign.jpeg';
import './header.css';

export default function Header() {
    return <header className="App-header">
        <img src={logo} alt={'logo'} />
    </header>
}