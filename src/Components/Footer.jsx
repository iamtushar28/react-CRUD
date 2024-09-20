import React from 'react'

const Footer = () => {
    return (
        <>
            {/* footer */}
            <footer className='flex gap-3 flex-col justify-center items-center mt-16 mb-4'>

                <p className='text-white text-sm'>&copy; 2024, Designed & developed by Tushar.</p>

                {/* social media links */}
                <div className='flex gap-3'>

                    {/* github */}
                    <a href='https://github.com/iamtushar28' target='_blank'>
                    <i className="bi bi-github text-white hover:text-zinc-300 transition-all duration-300 text-xl"></i>
                    </a>

                    {/* linkedin */}
                    <a href='https://www.linkedin.com/in/tushar-suryawanshi-599806299' target='_blank'>
                    <i className="bi bi-linkedin text-white hover:text-zinc-300 transition-all duration-300 text-xl"></i>
                    </a>

                </div>

            </footer>
            {/* footer end */}
        </>
    )
}

export default Footer