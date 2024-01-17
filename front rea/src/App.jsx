import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Table from './components/table';  

function App() {
  return (
    <div className='flex flex-col h-full '>
      <Navbar />
      <Table />
      <Footer />
    </div>
  );
}

export default App;
