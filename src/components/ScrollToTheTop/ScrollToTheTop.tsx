import React, { useEffect } from 'react';

const ScrollToTheTop = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    return <div>{children}</div>;
};

export default ScrollToTheTop;
