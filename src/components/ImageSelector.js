import React from 'react';

const ImageSelector = ({ leftImage, rightImage, onImageClick, selected }) => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 my-6">
            {/* Left Image */}
            <div 
                className={`relative cursor-pointer transition-all duration-300 ${
                    selected === 'left' ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`}
                onClick={() => onImageClick('left')}
            >
                <div className="relative rounded-2xl shadow-lg bg-white p-2 transition-all duration-300 hover:shadow-xl hover:bg-blue-50 border-2 border-transparent hover:border-blue-200">
                    <img 
                        src={leftImage} 
                        alt="Left image" 
                        className="w-80 h-80 object-cover rounded-xl" 
                    />
                </div>
                
                {/* Selection indicator */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selected === 'left' 
                        ? 'bg-green-500 scale-100' 
                        : 'bg-gray-300 scale-0'
                }`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                {/* Label */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-1 transition-all duration-300 hover:bg-blue-100 hover:shadow-md">
                    <span className="text-sm font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-700">Option A</span>
                </div>
            </div>

            {/* VS Divider */}
            <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                    <span className="text-white font-bold text-xl">VS</span>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-medium">Choose the real one</div>
            </div>

            {/* Right Image */}
            <div 
                className={`relative cursor-pointer transition-all duration-300 ${
                    selected === 'right' ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`}
                onClick={() => onImageClick('right')}
            >
                <div className="relative rounded-2xl shadow-lg bg-white p-2 transition-all duration-300 hover:shadow-xl hover:bg-blue-50 border-2 border-transparent hover:border-blue-200">
                    <img 
                        src={rightImage} 
                        alt="Right image" 
                        className="w-80 h-80 object-cover rounded-xl" 
                    />
                </div>
                
                {/* Selection indicator */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selected === 'right' 
                        ? 'bg-green-500 scale-100' 
                        : 'bg-gray-300 scale-0'
                }`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                {/* Label */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-1 transition-all duration-300 hover:bg-blue-100 hover:shadow-md">
                    <span className="text-sm font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-700">Option B</span>
                </div>
            </div>
        </div>
    );
};

export default ImageSelector;