import React, { CSSProperties } from 'react';
import logo from '../assets/logo.svg';

export const Header = () => {
    const style: CSSProperties = {
        width: '360px',
        height: '120px',
        margin: 'auto',
        alignSelf: 'center',
    }

    const imgStyle: CSSProperties = {
        width: '360px',
        height: '120px',
    }

    return (
        <div className="header-div" style={style}>
            <img src={logo} alt="Logo" style={imgStyle} />
        </div>
    );  
}

