import React, { useState } from 'react';
import logo from '../../images/logo.png';
import { Navbar } from '../Navbar/Navbar';

interface DropdownState {
    services: boolean;
    abonement: boolean;
    training: boolean;
}

export const Header = () => {
    return (
        <header style={headerStyle}>
            <div style={containerStyle}>
                <div style={logoTitleStyle}>
                    <img src={logo} alt="Logo" style={logoStyle} />
                    <h1 style={titleStyle}>Pulse</h1>
                </div>
                <Navbar/>

            </div>
        </header>
    );
}


const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 5px)', // Position the dropdown below the "Services" link
    left: 0,
    width: '200px', // Adjust width as needed
    backgroundColor: '#222',
    border: '1px solid #c33149',
    borderRadius: '5px',
    padding: '5px',
    zIndex: 1000, // Ensure dropdown is on top of other content
};



const dropdownLinkStyle: React.CSSProperties = {
    color: '#c33149',
    textDecoration: 'none',
    fontSize: '1.2vw', // Adjust size as needed
    fontFamily: 'Impact, Charcoal, sans-serif',
    padding: '5px 10px', // Add padding for better click area
    display: 'block',
    transition: 'color 0.3s ease',
};


const headerStyle: React.CSSProperties = {
    width: '100%',
    height: '15%',
    backgroundColor: '#222222',
    color: '#c33149',
    fontFamily: 'Impact, Charcoal, sans-serif',
    padding: '10px 0', // Add some padding for better spacing

    position: 'fixed', // Фиксируем заголовок
    top: 0, // Прикрепляем заголовок к верхней части страницы
    zIndex: 1000, // Задаем z-index для управления слоями
    
};



const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensure space between logo/title and navigation
    padding: '0 20px', // Add some padding to the sides if needed
};

const logoTitleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
};

const logoStyle: React.CSSProperties = {
    width: '6vw', // Ensure the unit is vw for viewport width
    marginRight: '20px'

};

const titleStyle: React.CSSProperties = {
    fontSize: '4vw', // Use responsive units for font size
    margin: 0, // Remove default margin
};

const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4vw', // Space between navigation links
};

const navLinkStyle: React.CSSProperties = {
    color: '#c33149',
    textDecoration: 'none',
    fontSize: '1.5vw', // Adjust size as needed
    fontFamily: 'Impact, Charcoal, sans-serif',
    padding: '5px 10px', // Add padding for better click area
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    textShadow: '0 0 0', // Initial state without glow
};
// Adding hover and active styles
const navLinkHoverStyle: React.CSSProperties = {
    color: '#fa7414', // Red color on hover
    textShadow: '0 0 10px #fa7414', // Red glow on hover
};

const navLinkActiveStyle: React.CSSProperties = {
    color: '#f39fa1', // pink color when pressed
    textShadow: '0 0 10px #f39fa1', // pink glow when pressed
};

// Injecting the hover and active styles using JavaScript
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    a:hover {
        color: ${navLinkHoverStyle.color} !important;
        text-shadow: ${navLinkHoverStyle.textShadow} !important;
    }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
    a:active {
        color: ${navLinkActiveStyle.color} !important;
        text-shadow: ${navLinkActiveStyle.textShadow} !important;
    }
`, styleSheet.cssRules.length);

export default Header;