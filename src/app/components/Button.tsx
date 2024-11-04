import React from 'react'

const Button = ({type, variant = "default", text, btnType="button" }: {type: "primary" | "secondary", variant: "default" | "large" | "small", text: string, btnType: "submit" | "reset" | "button"}) => {
  return (
    <>
      <button className={type + " " + variant} type={btnType} >{text}</button>
    </>
  )
}

export default Button
