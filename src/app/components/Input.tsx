import React from 'react'

const Input = ({ label, name, placeholder, data, select = true }: { label: string, name: string, placeholder: string, data?: string[], select?: boolean }) => {
    return (
        <>
            {select && data && <div className='input-area'>
                <label htmlFor={name}>{label}</label>
                <select name={name} >
                    <option defaultValue={placeholder} disabled>{placeholder}</option>
                    {data.map((info, index) => {
                        return (
                            <option key={index}>{info}</option>
                        )
                    })}
                </select>
            </div>}
            {!select &&
                <div className='input-area'>
                    <label htmlFor={name}>{label}</label>
                    <input name={name} placeholder={placeholder} >
                       
                    </input>
                </div>
            }
        </>
    )
}

export default Input
