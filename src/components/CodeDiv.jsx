import React, { memo } from 'react';

const CodeDiv = memo(({ placeholder, onChange, error , value}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      className={`w-[98%] h-[30%] text-black resize-none p-1 my-2 border ${error ? 'border-red-500' : 'border-black'} shadow-xl rounded`}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
});

export default CodeDiv;
