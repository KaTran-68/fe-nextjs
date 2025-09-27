'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Ka Web ©{new Date().getFullYear()} Created by @KaTran
            </Footer>
        </>
    )
}

export default AdminFooter;