import React, { useState, useRef, useEffect, useCallback} from 'react';
//import { render } from 'react-dom';
import { Button,Form, FormGroup, Label, Col, Input } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; //theme CSS

const PageAdmin = () => {

 const gridRef = useRef(); 
 const [rowData, setRowData] = useState(); 
 let idProduct = '';
 let columnDefs = [
    {field: 'codigo', filter: true},
    {field: 'producto',filter: true},
    {field: 'linea',filter: true},
    {field: 'valor',filter: true},
    {field: 'promocion',filter: true},
    {field: 'descuento',filter: true}
  ];


 const cellClickedListener = useCallback( event => {
   document.getElementById('codigo').value = event.data.codigo
   document.getElementById('producto').value = event.data.producto
   document.getElementById('linea').value = event.data.linea
   document.getElementById('valor').value = event.data.valor
   document.getElementById('promocion').value = event.data.promocion
   document.getElementById('descuento').value = event.data.descuento
   idProduct = event.data._id
 }, []);

 useEffect(() => {
    getData();
 }, []);

 const buttonListener = useCallback( e => {
    e.preventDefault();
        console.log('click');
        let codigo = document.getElementById('codigo').value;
        let producto = document.getElementById('producto').value;
        let linea = document.getElementById('linea').value;
        let valor = document.getElementById('valor').value;
        let promocion = document.getElementById('promocion').value;
        let descuento = document.getElementById('descuento').value;
        if(idProduct !== ''){
            let _id = idProduct;
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ codigo: codigo,producto:producto,linea:linea,valor:valor,promocion:promocion,_id:_id,descuento:descuento })
            };
            fetch('http://localhost:3003/actualizar', requestOptions)
                .then(response => response.json())
                .then(data => resData(data));
        }else{
            alert('Debe seleccionar un registro de la Tabla')
        }

}, []);

const buttonListenerNew = useCallback( e => {
    e.preventDefault();
    let codigo = document.getElementById('codigo').value;
    let producto = document.getElementById('producto').value;
    let linea = document.getElementById('linea').value;
    let valor = document.getElementById('valor').value;
    let promocion = document.getElementById('promocion').value;
    let descuento = document.getElementById('descuento').value;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: codigo,producto:producto,linea:linea,valor:valor,promocion:promocion,descuento:descuento })
    };
    fetch('http://localhost:3003/insert', requestOptions)
        .then(response => response.json())
        .then(data => resData(data));
}, []);


const buttonListenerDelete = useCallback( e => {
    e.preventDefault();

    if(idProduct !== ''){
        let _id = idProduct;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id:_id })
        };
        fetch('http://localhost:3003/delete', requestOptions)
            .then(response => response.json())
            .then(data => resData(data));
    }else{
        alert('Debe seleccionar un registro de la Tabla')
    }
    
}, []);

const getData = () => {
    fetch('http://localhost:3003/productos-get')
    .then(result => result.json())
    .then(rowData => setRowData(rowData.data))
}

const resData = (data) => {
    if( (data.mensaje && data.mensaje === 'el registro se actualizo') || 
        (data.mensaje && data.mensaje === 'registro almacenado con exito') ||
        (data.mensaje && data.mensaje === 'el registro se elimino correctamente')){
            idProduct = '';
            getData();
            document.getElementById('codigo').value = ''
            document.getElementById('producto').value = ''
            document.getElementById('linea').value = ''
            document.getElementById('valor').value = ''
            document.getElementById('promocion').value = ''
            document.getElementById('descuento').value = ''
        }

    alert(data.mensaje)
}

 return (    
   <div>
    <hr></hr>    
     <div className="ag-theme-alpine" style={{width: '100%', height: 300}}>

       <AgGridReact
           ref={gridRef} 
           rowData={rowData} 
           columnDefs={columnDefs} 
           defaultColDef={true} 
           animateRows={true} 
           //rowSelection='multiple' 
           onCellClicked={cellClickedListener} 
           />
     </div>
     <hr></hr>
     <Col sm={{ offset: 8, size: 5 }} >
        <Button onClick={buttonListenerDelete} color="danger"> Eliminar </Button>
     </Col>
     <hr></hr>

     <div>
        <Form>
            <Label for="codigo" sm={5} > Formulario de Administrador </Label>
            <FormGroup row>
                <Label for="codigo" sm={3} > Código </Label>
                <Col sm={5}>
                <Input id="codigo" name="Código" placeholder="Código" type="text"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="producto"sm={3}> Producto </Label>
                <Col sm={5}>
                <Input id="producto" name="Producto" placeholder="Producto" type="text" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="linea" sm={3} > Linea </Label>
                <Col sm={5}>
                <Input id="linea" name="Linea" placeholder="Linea" type="text"/>
                </Col>
            </FormGroup>  
            <FormGroup row>
                <Label for="valor" sm={3} > Valor </Label>
                <Col sm={5}>
                <Input id="valor" name="Valor" placeholder="Valor" type="text"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="promocion" sm={3} > Promoción </Label>
                <Col sm={5}>
                <Input id="promocion" name="Promoción" placeholder="Promoción" type="text"/>
                </Col>
            </FormGroup>  
            <FormGroup row>
                <Label for="descuento" sm={3} > Descuento </Label>
                <Col sm={5}>
                <Input id="descuento" name="Descuento" placeholder="Descuento" type="text"/>
                </Col>
            </FormGroup>        
            <FormGroup check row >
                <Col sm={{ offset: 1, size: 5 }} >
                <Button onClick={buttonListener} color="danger"> Modificar </Button>
                <Button onClick={buttonListenerNew} color="success"> Crear </Button>
                </Col>                
            </FormGroup>
        </Form>
     </div>
   </div>
 );
};

export default PageAdmin;