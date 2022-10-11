import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Scanner = () => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(res, error) => {
          if (res) {
            setData(res.text);
          }

          if (error) {
            console.info(error);
          }
        }}
        style={{ width: '200px', height: '200px' }}
      />
      <p>{data}</p>
    </>
  );
};

export default Scanner;
