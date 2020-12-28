import React from 'react';
import './style.css';

export default ({title, items}) => {
    return (
        <div>
            <h2>{title}</h2>
            <div classname="movieRow--listarea">
                {items.results.length && items.results.map((item, i) => (
                    <img 
                        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} 
                        alt={item.original_title} 
                        key={i}
                    />
                ))}
            </div>
        </div>
    )
}