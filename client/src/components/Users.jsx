import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from '../assets/api/axios';
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true; // state wird nicht verändert, wenn der component ist unmounted
    const controller = new AbortController(); // stoppt request wenn der Controller is unmounted

    const getUsers = async () => {
      try {
        const res = await axios.get('/users', {
          signal: controller.signal,
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      <h2>Userlist</h2>

      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>no Users</p>
      )}
    </article>
  );
};

export default Users;
