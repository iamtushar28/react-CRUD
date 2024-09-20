import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

const MedicalServiceForm = () => {
    // toggle form
    const [showForm, setShowForm] = useState(false);
    const wrapperRef = useRef(null);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    //hide form when clicked at outside
    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowForm(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // State to store list of services
    const [servicesList, setServicesList] = useState([]);

    // State to track if editing a service and which one
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        if (isEditing) {
            // Update the service at the specific index
            const updatedServices = servicesList.map((item, index) =>
                index === editIndex ? data : item
            );
            setServicesList(updatedServices);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            // Add a new service to the list
            setServicesList([...servicesList, data]);
        }

        reset(); // Reset form fields
        setShowForm(false); // Optionally hide form after submission
    };

    //delet card using that card index
    const handleDelete = (index) => {
        const filteredServices = servicesList.filter((_, i) => i !== index);
        setServicesList(filteredServices);
    };

    //edit service card
    const handleEdit = (index) => {
        setShowForm(true);
        const serviceToEdit = servicesList[index];
        reset(serviceToEdit);
        setIsEditing(true);
        setEditIndex(index);
    };

    return (
        <>
            <div className='flex justify-end py-10 px-8 md:px-10 md:py-16'>
                <button className='bg-zinc-900 text-white px-4 py-2 rounded-xl flex gap-2 justify-center items-center border border-zinc-700 hover:border-zinc-500 transition-all duration-300'
                    onClick={toggleForm}
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Service
                </button>
            </div>

            {showForm && (
                <section ref={wrapperRef} className='zoom p-4 absolute right-6 md:top-[8rem] z-20 h-auto w-[300px] md:w-[400px] bg-white rounded-xl'>
                    <h2 className='text-2xl text-center font-semibold'>Add Service</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className='px-4 py-6'>

                        {/* name */}
                        <div className='mb-4'>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>Service Name</label>
                            <input
                                type="text"
                                id='name'
                                {...register('name', { required: 'Service name is required' })}
                                className={`block w-full h-9 outline-none border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-1 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm transition-all duration-500 px-2`}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        {/* name end */}

                        {/* disc */}
                        <div className='mb-5'>
                            <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                            <textarea
                                id='description'
                                {...register('description', { required: 'Description is required' })}
                                className={`block w-full h-14 outline-none border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:ring-1 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm transition-all duration-500 px-2`}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>
                        {/* disc end */}

                        {/* price */}
                        <div className='mb-5'>
                            <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-2'>Price</label>
                            <input
                                type="number"
                                id='price'
                                {...register('price', {
                                    required: 'Price is required',
                                    min: { value: 0, message: 'Price must be a positive number' }
                                })}
                                className={`block w-full h-9 outline-none border ${errors.price ? 'border-red-500' : 'border-gray-300'} focus:ring-1 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm transition-all duration-500 px-2`}
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>
                        {/* price end */}

                        <div className='flex justify-center'>
                            <button type="submit" className='bg-neutral-950 hover:bg-neutral-800 transition-all duration-300 text-white px-6 py-2 rounded-xl'>
                                {isEditing ? "Update Service" : "Add Service"}
                            </button>
                        </div>
                    </form>

                </section>
            )}

            <section className='flex gap-6 flex-wrap justify-center'>

                {/* demo card */}
                <div className='zoom h-[230px] w-[280px] bg-zinc-900 rounded-lg p-3 flex flex-col justify-around text-white border-[0.5px] border-zinc-700 relative'>

                    {/* action icons */}
                    <div className='absolute top-2 right-2 flex gap-2 text-zinc-400'>

                        <button>
                            <i className="bi bi-pencil-square cursor-pointer hover:text-zinc-200 transition-all duration-300"></i>
                        </button>

                        <button>
                            <i className="bi bi-trash cursor-pointer hover:text-zinc-200 transition-all duration-300"></i>
                        </button>

                    </div>
                    {/* action icons end */}

                    {/* service heading */}
                    <h1 className='text-xl font-semibold mt-2'>Hii! I'm Tushar</h1>

                    {/* service disc */}
                    <p className='text-sm'>Passionate and innovative Web Developer with a strong foundation in web developement technologies.</p>


                    {/* service price */}
                    <div className='flex justify-between'>
                        <p className='text-green-400 font-semibold'>Open for work.</p>

                        <button className='bg-green-600 hover:bg-green-500 text-sm transition-all duration-300 text-white font-semibold px-5 py-2 rounded-xl border-[0.5px] border-zinc-700'>Book Slot</button>

                    </div>
                </div>

                <div className='zoom h-[230px] w-[280px] bg-zinc-900 rounded-lg p-3 flex flex-col justify-around text-white border-[0.5px] border-zinc-700 relative'>

                    {/* action icons */}
                    <div className='absolute top-2 right-2 flex gap-2 text-zinc-400'>

                        <button>
                            <i className="bi bi-pencil-square cursor-pointer hover:text-zinc-200 transition-all duration-300"></i>
                        </button>

                        <button>
                            <i className="bi bi-trash cursor-pointer hover:text-zinc-200 transition-all duration-300"></i>
                        </button>

                    </div>
                    {/* action icons end */}

                    {/* service heading */}
                    <h1 className='text-xl font-semibold mt-2'>Crafted by Tushar</h1>

                    {/* service disc */}
                    <p className='text-sm'>This are demo card. Please try adding services using the form. Once added, they will appear below.</p>


                    {/* service price */}
                    <div className='flex justify-between'>
                        <p className='text-green-400 font-semibold'>₹2830</p>

                        <button className='bg-green-600 hover:bg-green-500 text-sm transition-all duration-300 text-white font-semibold px-5 py-2 rounded-xl border-[0.5px] border-zinc-700'>Book Slot</button>

                    </div>
                </div>
                {/* demo card end*/}

                {servicesList.map((service, index) => (
                    <div className='zoom h-[230px] w-[280px] bg-zinc-900 rounded-lg p-3 flex flex-col justify-around text-white border-[0.5px] border-zinc-700 relative' key={index}>
                        <div className='absolute top-2 right-2 flex gap-2 text-zinc-400'>
                            <button onClick={() => handleEdit(index)}>
                                <i className="bi bi-pencil-square cursor-pointer hover:text-zinc-200 transition-all duration-300"></i>
                            </button>
                            <button onClick={() => handleDelete(index)}>
                                <i className="bi bi-trash cursor-pointer hover:text-zinc-200 transition-all duration-300"></i>
                            </button>
                        </div>
                        <h1 className='text-xl font-semibold mt-2'>{service.name}</h1>
                        <p className='text-sm'>{service.description}</p>
                        <div className='flex justify-between'>
                            <p className='text-green-400 font-semibold'>₹{service.price}</p>
                            <button className='bg-green-600 hover:bg-green-500 text-sm transition-all duration-300 text-white font-semibold px-5 py-2 rounded-xl border-[0.5px] border-zinc-700'>Book Slot</button>
                        </div>
                    </div>
                ))}

            </section>
        </>
    );
};

export default MedicalServiceForm;
