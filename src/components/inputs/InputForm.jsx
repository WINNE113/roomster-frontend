import React, { memo } from 'react'
import clsx from 'clsx'
const InputForm = ({ label, fullWidth, type = 'text', register, errors, id, validate, placeholder }) => {

    return (
        <div className={clsx('flex flex-col gap-2', fullWidth && 'w-full')}>
            <label className='label' htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                className={clsx('form-input rounded-md border-gray-200 placeholder:text-xs placeholder:italic', fullWidth && 'w-full')}
                placeholder={placeholder}
            />
            {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default memo(InputForm)