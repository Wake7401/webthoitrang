import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from "../store/GlobalState"
import Cookie from 'js-cookie'

function NavBar() {
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { auth, cart } = state

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active"
    } else {
      return ""
    }
  }

  const handleLogout = () => {
    Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: { success: 'Đã đăng xuất!' } })
    return router.push('/')
  }

  const adminRouter = () => {
    return(
        <>
        <Link href="/dashboard">
        <a className="dropdown-item">Dashboard</a>
        </Link>
        </>
    )
}

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown mt-2">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={auth.user.avatar} alt={auth.user.avatar}
            style={{
              borderRadius: '50%', width: '30px', height: '30px',
              transform: 'translateY(-3px)', marginRight: '3px'
            }} /> {auth.user.name}
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link href="/profile">
            <a className="dropdown-item">Thông tin</a>
          </Link>
          {
            auth.user.role === 'admin' && adminRouter()
          }
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button>
        </div>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
     <div className='container'>
     <Link href="/">
        <a className="navbar-brand">Nhóm 7</a>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul className="navbar-nav p-1">
          <Link href="/cart">
            <li className={"nav-link" + isActive('/cart')}>
              <a className="nav-link">
                <i className="fas fa-shopping-cart position-relative" aria-hidden="true">
                  <span className="position-absolute"
                    style={{
                      padding: '3px 6px',
                      background: '#ed143dc2',
                      borderRadius: '50%',
                      top: '-10px',
                      right: '-10px',
                      color: 'white',
                      fontSize: '14px'
                    }}>
                    {cart.length}
                  </span>
                </i> Giỏ Hàng
              </a>
            </li>
          </Link>

          {
            Object.keys(auth).length === 0
              ? <li className="nav-item mt-2">
                <Link href="/signin">
                  <a className={"nav-link" + isActive('/signin')}>
                    <i className="fas fa-user" aria-hidden="true"></i> Đăng nhập
                  </a>
                </Link>
              </li>
              : loggedRouter()
          }
        </ul>
      </div>
     </div>
    </nav>
  )
}

export default NavBar