import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductList from "./pages/productList";

function App() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <ProductList />
        </div>
    );
}

export default App;
