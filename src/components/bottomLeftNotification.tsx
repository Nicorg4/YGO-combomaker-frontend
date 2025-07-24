'use client';
import React, { useEffect, useState } from 'react';
import { BottomLefNotificationProps } from '@/types/types';
import Progress from './progress';

const BottomLeftNotification = ({ message, duration, type, show, onClose }: BottomLefNotificationProps) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!show) return;

        setProgress(0);
        setIsComplete(false);

        const interval = 100;
        const increment = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setIsComplete(true);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [show, duration]);

    useEffect(() => {
        if (isComplete) {
            onClose();
        }
    }, [isComplete, onClose]);

    if (!show) return null;

    return (
        <div className='absolute bottom-5 left-5 w-[300px] h-32 bg-slate-800 text-white flex flex-col items-center clip-diagonal p-5 z-50'>
            <div className="flex flex-col w-[80%] justify-between h-full">
                <p className='mb-2 text-md'>{message}</p>
                <Progress
                    value={progress}
                    className="w-full h-2"
                    color={type === 'error' ? 'bg-red-400' : type === 'success' ? 'bg-green-300' : 'bg-blue-400'}
                />
            </div>
            <button
                className='absolute right-1 top-1 w-8 h-8 text-white text-lg hover:opacity-75 cursor-pointer'
                onClick={onClose}
            >
                x
            </button>
        </div>
    );
};

export default BottomLeftNotification;
