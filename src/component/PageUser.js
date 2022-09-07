import React /*{ useState, useEffect }*/ from 'react';
import { useNavigate } from "react-router-dom";


export default function PageUser(props) {

    const navigate = useNavigate();

    if (localStorage.getItem('isLogin')) {
        let dataUser = JSON.parse(localStorage.getItem('isLogin'));
        console.log('dataUser----',dataUser);
        if(dataUser.rol === 'admin'){
            return(
                <div>Pagina Usuario Admin</div>
            );
        }else{
            return(
                <div>Pagina Usuario Visitante</div>
            );
        }
    }else{
        localStorage.removeItem('isLogin');
        navigate("/login");
        return null
    }
  }