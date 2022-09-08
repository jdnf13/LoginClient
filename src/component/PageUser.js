import React, { Fragment, useCallback } /*{ useState, useEffect }*/ from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Col} from 'reactstrap';
import PageAdmin from './PageAdmin';
import PageVisitor from './PageVisitor';


export default function PageUser(props) {

  const navigate = useNavigate();

  const onClickLogout = useCallback( e => {
    e.preventDefault();
    localStorage.removeItem('isLogin');
    navigate("/");
}, []);

    if (localStorage.getItem('isLogin')) {
        let dataUser = JSON.parse(localStorage.getItem('isLogin'));
        console.log('dataUser----',dataUser);
        if(dataUser.rol === 'admin'){
            return(
                <Fragment>
                    <Col sm={{ offset: 10, size: 2 }} >
                        <Button onClick={onClickLogout}>Cerrar Sesión</Button>
                    </Col>
                    <h1>Hola {dataUser.name}, ingresaste como {dataUser.rol}</h1>
                    <PageAdmin/>
                </Fragment>
            );
        }else{
            return(
                <Fragment>
                    <Col sm={{ offset: 10, size: 2 }} >
                        <Button onClick={onClickLogout}>Cerrar Sesión</Button>
                    </Col>
                    <h1>Hola {dataUser.name}, ingresaste como {dataUser.rol}</h1>
                    <PageVisitor/>
                </Fragment>
            );
        }
    }else{
        localStorage.removeItem('isLogin');
        navigate("/login");
        return null
    }
  }