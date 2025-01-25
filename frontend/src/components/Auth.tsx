
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { signUpValidationType } from '@syedazharuddin0081/thought-stream-commons';

function Auth({ type }: { type: 'signup' | 'signin' }) {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<signUpValidationType>({
    name: '',
    username: '',
    password: '',
  });

  async function sendRequest() {
    console.log(inputValues);

    try {
      // Sending request for signup or signin based on the type
      const response = await axios.post(
        `${BACKEND_URL}/${type === 'signup' ? 'signup' : 'signin'}`,
        inputValues
      );
      console.log(response);

      const token = response.data.token;
      const name = response.data.name;
      console.log(token);
      console.log(name)

      // Store token and name in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);


      // Redirect only if the token is valid
      if (token !== 'undefined') {
        navigate('/blogs');
      } else {
        alert('Invalid credentials!');
        navigate('/signin')
      }

    } catch (error) {
      alert('Something went wrong!');
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold mb-2">
            {type === 'signup' ? 'Create an account' : 'Log in to your account'}
          </div>
          <div className="text-slate-400">
            {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}
            <Link className="pl-2 underline " to={type === 'signup' ? '/signin' : '/signup'}>
              {type === 'signup' ? 'Sign In' : 'Sign Up'}
            </Link>
          </div>

          <div className="mt-5">
            {type === 'signup' && (
              <InputLabel
                label="Name"
                placeholder="Azharuddin Syed"
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    name: e.target.value,
                  });
                }}
              />
            )}

            <InputLabel
              label="Username"
              placeholder="azhar@gmail.com"
              onChange={(e) => {
                setInputValues({
                  ...inputValues,
                  username: e.target.value,
                });
              }}
            />

            <InputLabel
              label="Password"
              type="password"
              placeholder="12345"
              onChange={(e) => {
                setInputValues({
                  ...inputValues,
                  password: e.target.value,
                });
              }}
            />

            <button
              onClick={sendRequest}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm mt-6 px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface inputType {
  placeholder: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function InputLabel({ label, placeholder, type, onChange }: inputType) {
  return (
    <>
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-2 text-sm text-slate-600 font-bold pt-2">{label}</label>
        <input
          onChange={onChange}
          type={type || 'text'}
          className="w-full bg-transparent placeholder:text-black-400 text-black-700 text-sm border border-black-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-black-500 hover:border-black-300 shadow-sm focus:shadow"
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

export default Auth;
