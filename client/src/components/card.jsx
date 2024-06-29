import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ imageUrl, title, onPlay }) => {

  
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full h-48 object-contain" src={imageUrl} alt={title} />
            <div className=" flex flex-col justify-center items-center px-6 py-4">
                <div className="font-bold text-xl mb-2 truncate overflow-hidden ">{title}</div>
               {onPlay}
            </div>
        </div>
    );
};

export default Card;
