import React from 'react';
import axios from 'axios';

const CreateQrCode = () => {
  const handleSale = async () => {
    const payload = { text: 'hallo Welt', id: 'ferhat' };
    const res = await axios.post('http://127.0.0.1:4000/createQrCode', payload);
    console.log(res);
  };

  return (
    <div>
      <button onClick={handleSale}>QR-Code kreieren</button>;
    </div>
  );
};

export default CreateQrCode;
