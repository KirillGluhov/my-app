import React from "react";

export class Yes extends React.Component
{
    render()
    {
        return (
            <svg width="29" height="22" viewBox="0 0 29 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12.5L10 19.5L26.5 3" stroke={this.props.color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

        );
    }
}