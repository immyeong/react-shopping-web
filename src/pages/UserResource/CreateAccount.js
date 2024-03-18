/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import app from '../../firebase/fbInstance';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const auth = getAuth(app);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { target: { name, value } } = e;
        if (name === 'email') {
            setEmail(value);
            const emailRegax = /^[a-zA-Z0-9-_]+@[a-zA-Z.]+$/;

            if (!value?.match(emailRegax)) {
                setError(
                    "이메일 형식이 올바르지 않습니다. 영문 대소문자, 숫자와 특수기호 (_ , - ,@)만 사용가능합니다."
                );
            } else {
                setError("");
            }
        }
        else if (name === 'password') {
            setPassword(value);

            const passwordRegax = /^[a-zA-Z0-9-_]+@[a-zA-Z.]+$/;

            if (value?.length < 8) {
                setError("비밀번호는 8자리 이상으로 입력해주세요.");
            } else if (value?.length < 8 || !value.match(passwordRegax)) {
                setError("비밀번호 형식이 올바르지 않습니다. 8자리 이상, 영문 대소문자, 숫자와 특수기호 ( _ , - ,@ )만 사용가능합니다.");
            } else {
                setError("");
            }
        }

        else if (name === 'confirmPassword') {
            setConfirmPassword(value)

            if (value !== password) {
                setError("입력하신 비밀번호와 일치하지 않습니다.");
            } else {
                setError("");
            }
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const createUser = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            console.log(createUser);
            window.alert("회원가입이 완료되었습니다.");
            navigate('/login');
        } catch (e) {
            window.alert("이미 존재하는 이메일입니다.");
        }
    }

    return (
        <div className="w-full h-[71vh]">
            <div className=' mt-32 mr-auto ml-auto shadow-gray-300 shadow-[-1px_-1px_6px_6px] w-72 min-h-60'>
                <div>
                    <h3 className="text-2xl mb-2 font-bold pt-3">회원가입</h3>
                </div>
                <form onSubmit={handleSubmit} className='mr-12 ml-12 text-left text-xs'>
                    <p>아이디 입력</p>
                    <input
                        type='text'
                        name='email'
                        className=' bg-blue-100 border-2 border-gray-300 rounded-md ps-2 mb-5 text-xs pr-10 pt-1 pb-1'
                        placeholder='username@email'
                        required
                        value={email}
                        onChange={handleChange}
                    />
                    <p>비밀번호 입력</p>
                    <input
                        type='password'
                        name='password'
                        className=' bg-blue-100 border-2 border-gray-300 rounded-md ps-2 text-xs pr-10 pt-1 pb-1 mb-5'
                        placeholder='password'
                        required
                        value={password}
                        onChange={handleChange}
                    />
                    <p>비밀번호 확인</p>
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='password'
                        className='bg-blue-100 border-2 border-gray-300 rounded-md ps-2 text-xs pr-10 pt-1 pb-1 mb-5'
                        required
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                    <div>
                        <button
                            type="submit"
                            className="bg-gray-500 text-white w-48 p-2 mt-3 rounded-md text-xs mb-5"
                        >
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAccount