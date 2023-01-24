import { useState, useEffect } from 'react';

export const useScroll = () => {
    const [scroll, setScroll] = useState<string>('')

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScroll('fadeOutUp');
        } else {
            setScroll('fadeInDown');
        }
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scroll;
};