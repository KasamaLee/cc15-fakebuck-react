import { useState } from "react";
import { toast } from 'react-toastify';
import RegisterInput from "./RegisterInput";
import Joi from 'joi'
import InputErrorMessage from "./InputErrorMessage";
import { useAuth } from "../../hooks/use-auth";

const registerSchema = Joi.object(
    {
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        emailOrMobile: Joi.alternatives([
            Joi.string().email({ tlds: ['com'] }),
            Joi.string().pattern(/^[0-9]{10}$/)
        ])
            .required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/)
            .trim()
            .required(),
        confirmPassword: Joi.string().valid(Joi.ref('password'))
            .trim()
            .required(),
    }
);

const validateRegister = (input) => {
    const { error } = registerSchema.validate(input, { abortEarly: false });
    if (error) {
        const result = error.details.reduce((acc, elem) => {
            const { message, path } = elem;
            acc[path[0]] = message;
            return acc;
        }, {});
        return result;
    }
}

export default function RegisterForm() {
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        emailOrMobile: '',
        password: '',
        confirmPassword: '',
    })


    const [error, setError] = useState({
        // firstName: 'Firstname',
        // lastName: 'Lastname',
        // emailOrMobile: 'invalid format',
        // password: 'invalid password',
        // confirmPassword: 'adsefsdfre'
    })

    const { register } = useAuth();

    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const validationError = validateRegister(input);

        // ถ้า validationError มีค่าให้ setError()
        if (validationError) {
            return setError(validationError);
        }
        setError({});
        register(input).catch(err => {
            toast.error(err.response?.data.message);
        });
    }


    return (
        <form className="grid grid-cols-2 gap-x-2 gap-y-3">
            <div>
                <RegisterInput
                    placeholder="First name"
                    value={input.firstName}
                    onChange={handleChangeInput}
                    name="firstName"
                    hasError={error.firstName}
                />
                {error.firstName && <InputErrorMessage message={error.firstName} />}
            </div>

            <div>
                <RegisterInput
                    placeholder="Last name"
                    value={input.lastName}
                    onChange={handleChangeInput}
                    name="lastName"
                    hasError={error.lastName}
                />
                {error.lastName && <InputErrorMessage message={error.lastName} />}
            </div>

            <div className="col-span-full">
                <RegisterInput
                    placeholder="Email address or mobile number"
                    value={input.emailOrMobile}
                    onChange={handleChangeInput}
                    name="emailOrMobile"
                    hasError={error.emailOrMobile}
                />
                {error.emailOrMobile && <InputErrorMessage message={error.emailOrMobile} />}
            </div>

            <div className="col-span-full">
                <RegisterInput
                    placeholder="Password" type="password"
                    value={input.password}
                    onChange={handleChangeInput}
                    name="password"
                    hasError={error.password}
                />
                {error.password && <InputErrorMessage message={error.password} />}
            </div>

            <div className="col-span-full">
                <RegisterInput
                    placeholder="Confirm password" type="password"
                    value={input.confirmPassword}
                    onChange={handleChangeInput}
                    name="confirmPassword"
                    hasError={error.confirmPassword}
                />
                {error.confirmPassword && <InputErrorMessage message={error.confirmPassword} />}
            </div>

            <div>
                <button className="bg-green-500 rounded-lg text-white px-3 py-1.5 text-lg font-bold min-w-[1--rem]"
                    onClick={handleSubmitForm}>
                    Sign up
                </button>
            </div>
        </form>
    )
}
