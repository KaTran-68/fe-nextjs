'use client'

import { CrownOutlined } from "@ant-design/icons"
import { Button, Result } from "antd"
import { useRouter } from "next/navigation"

const HomePage = () => {
    const router = useRouter()
    return (
        <div style={{ padding: 20, textAlign: 'center'}}>
            <Result
                icon={<CrownOutlined />}
                title="Fullstack Next/Nest - createdBy @KaTran"
            />
            <Button type="primary" size="large"
                onClick={() => {router.push('/auth/login')}}
            >Login</Button>
            <Button type="primary" size="large" style={{marginLeft: '10px'}}
                onClick={() => {router.push('/dashboard')}}
            >Main Page</Button>
        </div>
    )
}

export default HomePage;

