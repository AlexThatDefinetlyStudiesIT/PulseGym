import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CRUDNav.css';

export const CRUDNav = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(
        location.pathname === '/inventory/graphmaker'
          ? 'Добавить'
          : location.pathname === '/inventory/graphmaker/del'
          ? 'Удалить'
          
          : 'Изменить'
      );
      
    const navigate = useNavigate();

    const handleNextPage = () => {
        if (currentPage === 'Добавить') {
            setCurrentPage('Удалить');
            navigate('/inventory/graphmaker/del');
            return;
        }

        if (currentPage === 'Удалить') {
            setCurrentPage('Изменить');
            navigate('/inventory/graphmaker/edit'); 
            return;
        }
        if (currentPage === 'Изменить') {
            setCurrentPage('Добавить');
            navigate('/inventory/graphmaker'); 
            return;
        }
        
    };

    const handlePreviousPage = () => {
        if (currentPage === 'Добавить') {
            setCurrentPage('Изменить');
            navigate('/inventory/graphmaker/edit');
            return;
        }
        if (currentPage === 'Изменить') {
            setCurrentPage('Удалить');
            navigate('/inventory/graphmaker/del'); 
        return;
        }
        if (currentPage === 'Удалить') {
            setCurrentPage('Добавить');
            navigate('/inventory/graphmaker'); 
            return;
        }
            
    }
    

    return (
        <div className="form-header">
            <button className="nav-button" onClick={handlePreviousPage}>{"<"}</button>
            <div className="title">{currentPage}</div>
            <button className="nav-button" onClick={handleNextPage}>{">"}</button>
        </div>
    );
};
