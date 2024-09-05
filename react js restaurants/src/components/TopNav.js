import React from 'react'

function TopNav() {
  return (
    <>
      <nav class="w-100 d-flex px-4 py-2 mb-4 shadow-sm">
              <button class="btn py-0 d-lg-none" id="open-sidebar">
                <span class="bi bi-list text-primary h3"></span>
              </button>
              <div class="dropdown ml-auto">
                <div class="message">
                    <div class="circle"></div>
                    <img src=
        "./images/notification.png" 
                         class="icn" 
                         alt=""/>
                    
                     <div class="dropdown">
                          <span class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><span class="flag-icon flag-icon-us me-1"></span> <span>English</span></span>
                      </div>

                    <div class="dp">
                      <img src=
        "./images/user.png"
                            class="dpicn" 
                            alt="dp"/>
                      </div>
                      <div class="prof">
                        <span><b>User Abc</b></span>
                        <span>Admin</span>                       
                      </div>
                      

                      <div class="dropdown profnav">
                        <button class="btn btn-md dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{border:"1px solid black"}}></button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" href="#">Profile</a>
                          <a class="dropdown-item" href="#">Logout</a>
                        </div>
                    </div>
                    </div>             
              </div>
            </nav>
      
    </>
  )
}

export default TopNav
