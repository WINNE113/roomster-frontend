import React, { useCallback, useEffect, useState } from 'react'
import { InputForm, Button } from '../../components'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import * as actions from '../../redux/actions'
import withBaseTopping from '@/hocs/withBaseTopping'

const Login = ({ navigate, dispatch, location }) => {
    const { accessToken, message } = useSelector(state => state.user)
    const [variant, setVariant] = useState(() => location.state?.mode || 'LOGIN')
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    useEffect(() => {
        reset()
    }, [variant])
    useEffect(() => {
        if (message) Swal.fire('Oops!', message, 'error').then(() => dispatch(actions.clearMessage()))
    }, [message])
    const onSubmit = async (payload) => {
        const { name, ...data } = payload
        if (variant === 'LOGIN') {

        }
        if (variant === 'REGISTER') {
        }
    }
    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') setVariant('REGISTER')
        else setVariant('LOGIN')
    }, [variant])
    useEffect(() => {
        if (accessToken) navigate('/')
    }, [accessToken])
    return (
        <div className='w-full bg-gray-100 h-screen flex items-center justify-center'>
            <div className='w-full gap-10 flex flex-col items-center justify-center'>
                <h1 className='text-5xl font-bold tracking-tighter text-main'>TRỌ MỚI</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)} className='rounded-lg border shadow-sm inset-0 p-4 flex flex-col gap-6 w-[500px] bg-white'
                >
                    <h2 className='text-3xl tracking-tight font-bold m-auto py-4'>
                        {variant === 'LOGIN' ? 'Đăng nhập thành viên' : 'Tạo tài khoản'}
                    </h2>
                    <InputForm
                        label='Email'
                        register={register}
                        errors={errors}
                        id='email'
                        validate={{
                            required: 'Trường này không được bỏ trống.',
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Email không hợp lệ.'
                            }
                        }}
                        placeholder='Nhập địa chỉ email của bạn'
                        fullWidth
                    />
                    <InputForm
                        label='Mật khẩu'
                        register={register}
                        errors={errors}
                        id='password'
                        validate={{
                            required: 'Trường này không được bỏ trống.',
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu bắt buộc tối thiểu 6 ký tự.'
                            }
                        }}
                        type='password'
                        fullWidth
                        placeholder='Mật khẩu tối thiểu 6 ký tự'
                    />
                    {variant === 'REGISTER' && <InputForm
                        label='Tên của bạn'
                        register={register}
                        errors={errors}
                        id='name'
                        validate={{ required: 'Trường này không được bỏ trống.' }}
                        fullWidth
                        placeholder={'Họ và tên của bạn'}
                    />}
                    <Button
                        type='submit'
                        fullWidth
                    >
                        {variant === 'LOGIN' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
                    </Button>
                    <div className='flex gap-2'>
                        <span>
                            {variant === 'LOGIN' ? 'Bạn chưa có tài khoản?' : 'Đã có tài khoản?'}
                        </span>
                        <span
                            className='text-main  cursor-pointer hover:underline'
                            onClick={toggleVariant}
                        >
                            {variant === 'LOGIN' ? 'Tạo tài khoản' : 'Đi tới đăng nhập'}
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withBaseTopping(Login)