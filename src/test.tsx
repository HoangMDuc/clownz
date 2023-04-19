import React, { useRef } from 'react';

type Input1 = {
    ref: React.LegacyRef<HTMLInputElement>;
};
const Input = ({ ref }: Input1) => {
    return <input ref={ref}></input>;
};

const Parent = () => {
    const inputRef = useRef(null);
    return (
        <div>
            <Input ref={inputRef}></Input>
        </div>
    );
};
