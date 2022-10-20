import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { seachInput } from '../../features/Project/projectSlice';

const debounde = (fn, delay) => {
    let timeout;
    return (...arg) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...arg);
        }, delay);
    };
};

export default function Search() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const setText = debounde((text) => setInput(text), 500);

    useEffect(() => {
        dispatch(seachInput(input));
    }, [dispatch, input]);

    return (
        <input
            className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
            type="search"
            onChange={(e) => setText(e.target.value)}
            placeholder="Search for anything…"
        />
    );
}
