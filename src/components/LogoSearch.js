import React from "react";

export class LogoSearch extends React.Component
{
    render()
    {
        return (
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.5" cy="12.5" r="11" stroke={this.props.color} stroke-width="3"/>
                <path d="M27.9393 30.0607C28.5251 30.6464 29.4749 30.6464 30.0607 30.0607C30.6464 29.4749 30.6464 28.5251 30.0607 27.9393L27.9393 30.0607ZM18.9393 21.0607L27.9393 30.0607L30.0607 27.9393L21.0607 18.9393L18.9393 21.0607Z" fill={this.props.color}/>
            </svg>
        );
    }
}