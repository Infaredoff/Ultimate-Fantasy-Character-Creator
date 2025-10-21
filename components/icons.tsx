// Fix: Populating the icons file with SVG components to be used in the UI.
import React from 'react';

export const SwordIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22.7,1.3,13.9,10.1,13,9.2V2.8L15.2,5,16.6,3.6,12,0,7.4,3.6,8.8,5,11,2.8v6.4l-.9.9L1.3,22.7a1,1,0,0,0,1.4,1.4L22.7,2.7A1,1,0,0,0,22.7,1.3Z M6,18l-3,3L2,20l3-3Z M12.5,12.5l-2-2L21,2,23,4,12.5,12.5Z" />
    </svg>
);

export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

export const DiceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21 5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5zM8 10c.83 0 1.5-.67 1.5-1.5S8.83 7 8 7s-1.5.67-1.5 1.5S7.17 10 8 10zm4 4c.83 0 1.5-.67 1.5-1.5S12.83 11 12 11s-1.5.67-1.5 1.5S11.17 14 12 14zm4-4c.83 0 1.5-.67 1.5-1.5S16.83 7 16 7s-1.5.67-1.5 1.5S15.17 10 16 10z" />
    </svg>
);
