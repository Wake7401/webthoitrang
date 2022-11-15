import React from 'react'
import Link from 'next/link'

function DashboardSlidebar() {
    return (
        <div className="col-3">
            <div className="card border-left-primary shadow py-2" style={{ margin: "20px" }}>
                <div className="card-body">
                    <Link href="/dashboard">
                        <a className="dropdown-item">
                            <i className='fas fa-fw fa-tachometer-alt'></i>
                            Dashboard</a>
                    </Link>
                </div>
            </div>

            <div className="card border-left-primary shadow py-2" style={{ margin: "20px" }}>
                <div className="card-body">
                    <Link href="/users">
                        <a className="dropdown-item">
                        <i className="fas fa-user"></i>
                            Tài khoản</a>
                    </Link>
                </div>
            </div>
            <div className="card border-left-primary shadow py-2" style={{ margin: "20px" }}>
                <div className="card-body">
                    <Link href="/categories">
                        <a className="dropdown-item">
                        <i className="fas fa-list-ul"></i>
                            Danh mục</a>
                    </Link>
                </div>
            </div>
            <div className="card border-left-primary shadow py-2" style={{ margin: "20px" }}>
                <div className="card-body">
                    <Link href="/ ">
                        <a className="dropdown-item">
                        <i className="fab fa-product-hunt"></i>
                            Sản phẩm</a>
                    </Link>
                </div>
            </div>

            <div className="card border-left-primary shadow py-2" style={{ margin: "20px" }}>
                <div className="card-body">
                    <Link href="/orders">
                        <a className="dropdown-item">
                        <i className="fab fa-first-order"></i>
                            Đơn hàng</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DashboardSlidebar