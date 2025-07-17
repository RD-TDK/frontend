import React from 'react';

const ImageSelector = ({ leftImage, rightImage, onImageClick }) => {
    return (
        <div className="flex justify-center gap-6 my-6">
            <div className="cursor-pointer" onClick={() => onImageClick('left')}>
                <img src={leftImage} alt="Left person" className="w-72 h-72 object-cover rounded-lg shadow-md" />
            </div>
            <div className="cursor-pointer" onClick={() => onImageClick('right')}>
                <img src={rightImage} alt="Right person" className="w-72 h-72 object-cover rounded-lg shadow-md" />
            </div>
        </div>
    );
};

export default ImageSelector;