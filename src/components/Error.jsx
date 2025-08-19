import React from 'react';

const Error = ({ message }) => {
  return (
        <div className=' bg-amber-500 text-black flex w-1/3 mx-auto my-10 py-4 justify-center rounded-xl'>
          <h3>Error!</h3>
          <p>{message}</p>
        </div>
  );
};

export default Error;
