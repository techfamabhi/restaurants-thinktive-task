import React from 'react'

function Sidebar() {
  return (
    <>
      <div
      className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar"
      id="sidebar"
    >
      <h4 className=" d-flex my-4 justify-content-center" ><b><span className='color1'>Restaurant</span></b></h4>

      <div className="list-group rounded-0">
        <a
          href="/"
          className="list-group-item list-group-item-action active border-0 d-flex align-items-center"
        >
          <span className="bi bi-border-all" />
          <span className="ml-2">Dashboard</span>
        </a>
        <a
          href="/category"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <span className="bi bi-box" />
          <span className="ml-2">All Category</span>
        </a>
        <a
          href="/"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <span className="bi bi-box" />
          <span className="ml-2">All Restaurant</span>
        </a>

        
      
        
      </div>
    </div>
    </>
  )
}

export default Sidebar
