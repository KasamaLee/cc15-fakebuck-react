import { useState } from "react";
import { toast } from 'react-toastify';
import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import { useAuth } from "../../hooks/use-auth";

export default function LoginForm() {

    const [input, setInput] = useState({
        emailOrMobile: '',
        password: ''
    })

    // USE CONTEXT เพื่อเรียกใช้ฟังก์ชัน login 
    const { login } = useAuth();

    const handleSubmitForm = (e) => {
        e.preventDefault();
        login(input).catch(err => {
            toast.err(err.response.data.message);
        })
    }

    return (
        <form className="grid gap-4" onSubmit={handleSubmitForm}>
            <div className="grid gap-4">
                <LoginInput
                    placeholder="Email address or phone number"
                    value={input.emailOrMobile}
                    onChange={e => setInput({ ...input, emailOrMobile: e.target.value })}
                />
                <LoginInput
                    type="password"
                    placeholder="password"
                    value={input.password}
                    onChange={e => setInput({ ...input, password: e.target.value })}
                />
                <LoginButton />
            </div>
        </form>
    )
}
