import React, { useState, useRef, useEffect} from 'react';
//import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; //theme CSS

const PageVisitor = () => {

 const gridRef = useRef(); 
 const [rowData, setRowData] = useState(); 
 let columnDefs = [
    {field: 'codigo', filter: true},
    {field: 'producto',filter: true},
    {field: 'linea',filter: true},
    {field: 'valor',filter: true},
    {field: 'promocion',filter: true},
    {field: 'descuento',filter: true}
  ];


 useEffect(() => {
    getData();
 }, []);

const getData = () => {
    fetch('http://localhost:3003/productos-get')
    .then(result => result.json())
    .then(rowData => setRowData(rowData.data))
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
           />
     </div>
     <hr></hr>     
   </div>
 );
};

export default PageVisitor;