import { useRef } from "react";
import FormButton from "../profile/FormButton";
import { useState } from "react";

export default function PictureForm({ title, children }) {

    const [file, setFile] = useState(null);
    if (file) console.log(URL.createObjectURL(file)); // blob : <img file path>
    const inputEl = useRef(null);

    return (
        <div>
            <input
                type="file"
                className="hidden"
                ref={inputEl}   // {current: <input/>}
                onChange={e => {
                    // console.log(e.target.files[0]) //path ของ file ที่ user เลือก
                    if (e.target.files[0]) {
                        setFile(e.target.files[0])
                    }
                }}
            />

            <div className="flex justify-between items-center">
                <h5 className="text-xl font-bold">{title}</h5>
                <div>
                    {
                        file && (
                            <>
                                <FormButton>Save</FormButton>
                                <FormButton
                                    onClick={() => {
                                        inputEl.current.value = '';
                                        setFile(null);
                                    }} >
                                    Cancel
                                </FormButton>
                            </>
                        )}

                    <FormButton onClick={() => inputEl.current.click()}>Edit</FormButton>
                </div>
            </div>

            <div className="flex justify-center">
                {children(file ? URL.createObjectURL(file) : undefined, () => inputEl.current.click())}
            </div>
        </div >
    )
}
