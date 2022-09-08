import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { Button,Form, FormGroup, Label, Col, Input } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const PageAdmin = () => {

 const gridRef = useRef(); // Optional - for accessing Grid's API
 const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
 let idProduct = '';
 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'codigo', filter: true},
   {field: 'producto',filter: true},
   {field: 'linea',filter: true},
   {field: 'valor',filter: true},
   {field: 'promocion',filter: true}
 ]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     sortable: true
   }));

 // Example of consuming Grid Event
 const cellClickedListener = useCallback( event => {
   console.log('cellClicked', event);
   document.getElementById('codigo').value = event.data.codigo
   document.getElementById('producto').value = event.data.producto
   document.getElementById('linea').value = event.data.linea
   document.getElementById('valor').value = event.data.valor
   document.getElementById('promocion').value = event.data.promocion
   document.getElementById('descuento').value = event.data.descuento
   idProduct = event.data._id
   console.log('id --- ',idProduct);
 }, []);

 // Example load data from sever
 useEffect(() => {
    getData();
 }, []);

 // Example using Grid's API
 const buttonListener = useCallback( e => {
        console.log('click');
        let codigo = document.getElementById('codigo').value;
        let producto = document.getElementById('producto').value;
        let linea = document.getElementById('linea').value;
        let valor = document.getElementById('valor').value;
        let promocion = document.getElementById('promocion').value;
        let descuento = document.getElementById('descuento').value;
        let _id = idProduct;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo: codigo,producto:producto,linea:linea,valor:valor,promocion:promocion,_id:_id,descuento:descuento })
        };
        fetch('http://localhost:3003/actualizar', requestOptions)
            .then(response => response.json())
            .then(data => resData(data));
}, []);

const getData = () => {
    fetch('http://localhost:3003/productos-get')
    .then(result => result.json())
    .then(rowData => setRowData(rowData.data))
}

const resData = (data) => {
    if(data.mensaje && data.mensaje === 'el registro se actualizo')
        getData();

    alert(data.mensaje)
    console.log('actualizacion estado ---',data);
}
 if(rowData && rowData.data)
    console.log('rowData ---',rowData.data);

 return (    
   <div>

     <div className="ag-theme-alpine" style={{width: 1000, height: 500}}>

       <AgGridReact
           ref={gridRef} // Ref for accessing Grid's API

           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

           onCellClicked={cellClickedListener} // Optional - registering for Grid Event
           />
     </div>
     <div>
        <Form>
            <FormGroup row>
                <Label for="codigo" sm={3} > Código </Label>
                <Col sm={5}>
                <Input id="codigo" name="Código" placeholder="with a placeholder" type="text"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="producto"sm={3}> Producto </Label>
                <Col sm={5}>
                <Input id="producto" name="Producto" placeholder="password placeholder" type="text" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="linea" sm={3} > Linea </Label>
                <Col sm={5}>
                <Input id="linea" name="Linea" placeholder="with a placeholder" type="text"/>
                </Col>
            </FormGroup>  
            <FormGroup row>
                <Label for="valor" sm={3} > Valor </Label>
                <Col sm={5}>
                <Input id="valor" name="Valor" placeholder="with a placeholder" type="text"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="promocion" sm={3} > Promoción </Label>
                <Col sm={5}>
                <Input id="promocion" name="Promoción" placeholder="with a placeholder" type="text"/>
                </Col>
            </FormGroup>  
            <FormGroup row>
                <Label for="descuento" sm={3} > Descuento </Label>
                <Col sm={5}>
                <Input id="descuento" name="Descuento" placeholder="with a placeholder" type="text"/>
                </Col>
            </FormGroup>        
            <FormGroup check row >
                <Col sm={{ offset: 1, size: 5 }} >
                <Button onClick={buttonListener} color="danger"> Modificar </Button>
                <Button onClick={buttonListener} color="success"> Crear </Button>
                </Col>                
            </FormGroup>
        </Form>
     </div>
   </div>
 );
};

export default PageAdmin;