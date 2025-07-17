import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center py-6 text-sm text-gray-600">
            <p>
                This demo has been developed by{' '}
                <a href="https://example.com" className="text-blue-500 hover:underline">
                    Haokai Tang
                </a>{' '}
                at the University of Southampton.
            </p>
        </footer>
    );
};

export default Footer;