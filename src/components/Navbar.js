import React from 'react';

const Navbar = () => {
    const navItems = [
        { name: 'Logout', path: '/login' },
    ];

    return (
        <nav className="bg-gray-700 p-4">
        <ul className="flex justify-end space-x-6">
        {navItems.map((item) => (
                <li key={item.name}>
            <a
            href={item.path}
            className={`text-white uppercase text-sm ${
                item.path === '/' ? 'font-bold' : ''
            } hover:underline`}
    onClick={(e) => e.preventDefault()} // Simplified routing
>
    {item.name}
</a>
    </li>
))}
</ul>
    </nav>
);
};

export default Navbar;