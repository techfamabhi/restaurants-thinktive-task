import React from 'react'
import Sidebar from './Sidebar'
import TopNav from './TopNav'

function Dashboard() {
  return (
    <>
      <div className="container-fluid">
  <div className="row">
    {/* sidebar */}
    <Sidebar/>
    <div
      className="w-100 vh-100 position-fixed overlay d-none"
      id="sidebar-overlay"
    />
    <div className="col-md-9 col-lg-10 ml-md-auto px-0">
      {/* top nav */}
     <TopNav/>
      {/* main content */}
      <main className="container-fluid">
        <section className="row">
        <h2 class="heading1"><span className='color1'>Demo</span>Book Dashboard</h2>
        </section>
      </main>
    </div>
  </div>
</div>

    </>
  )
}

export default Dashboard
