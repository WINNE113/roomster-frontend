import { Banner, Card, Section } from '@/components'
import React from 'react'

const Home = () => {
    return (
        <section>
            <Banner />
            <div>Search</div>
            <Section
                className='w-main mx-auto'
                title='LỰA CHỌN NỔI BẬT'
                contentClassName='grid grid-cols-4 gap-4'
            >
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Section>
        </section>
    )
}

export default Home