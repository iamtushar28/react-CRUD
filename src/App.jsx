import React from 'react';
import './App.css'
import Footer from './Components/Footer';
import MedicalServiceForm from './Components/MedicalServiceForm';

function App() {

  return (
    <>

      <div className="py-2 md:py-8 absolute top-0 z-[-2] h-auto w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">

        {/* heading */}
        <h1 className='text-3xl md:text-5xl font-bold text-white text-center mt-4'>React CRUD operation 🛠️</h1>

        <MedicalServiceForm />

        <Footer />

      </div>
    </>
  )
}

export default App
