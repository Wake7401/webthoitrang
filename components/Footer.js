import React from 'react'

function Footer() {
  return (
    <div className='bg-dark text-white'>
      <div className='row ml-2 mr-2'>
        <div className="col-md-6 pt-4">THÔNG TIN LIÊN HỆ
          <div className="dropdown-divider">
          </div>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li>
              <span>
                <i className="fas fa-map-marker-alt mr-2" aria-hidden></i>
                DNC
              </span>
            </li>
            <li>
              <span>
                <i className="fas fa-phone-alt mr-2">
                </i>0974128985</span>
            </li>
            <li>
              <span>
                <i className="fas fa-envelope mr-2"></i>
                anhkiet07042001@gmail.com
              </span>
            </li>
          </ul>
        </div>
        <div className='col-md-6 pt-4'>
          KẾT NỐI VỚI CHÚNG TÔI
          <div className='dropdown-divider'></div>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li>
              <span>
              <i className="fab fa-facebook-square mr-2" aria-hidden></i>
                Facebook
              </span>
            </li>
            <li>
              <span>
              <i className="fab fa-tiktok mr-2" aria-hidden></i>
              Tik Tok</span>
            </li>
            <li>
              <span>
              <i className="fab fa-instagram mr-2" aria-hidden></i>
              Instagram
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer_bot bg-dark d-flex align-items-center justify-content-center">
        <span className="p-4">Copyright © Nhóm 7</span>
      </div>
    </div>
  )
}

export default Footer