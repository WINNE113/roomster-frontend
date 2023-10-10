import React, { memo } from 'react'
import clsx from 'clsx'

const Button = ({ children, fullWidth, disabled, onClick, type = 'button', bgColor = 'bg-main', textColor = 'text-white' }) => {
    return (
        <button
            type={type}
            className={clsx(
                'px-4 py-2 text-base font-semibold rounded-md outline-none',
                fullWidth && 'w-full',
                bgColor,
                textColor
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default memo(Button)