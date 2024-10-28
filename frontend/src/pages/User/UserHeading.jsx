import React from 'react'

function UserHeading() {
  return (
    <div className='mt-16'>
        {/* UpperPicture */}
      <div className="upperProfile px-8 py-8 rounded-xl">
          <div className="relative bg-cover bg-center h-[500px] bg-[url('picture/userBg.avif')] rounded-xl">
              <div className="absolute backdrop-blur-lg bg-white/30 md:backdrop-filter-none bottom-0 w-full flex items-center py-5 justify-between">
                  {/* Left Info */}
                  <div className="userInfo flex flex-cols px-8 items-center">
                      <div className="profilePic bg-[url('picture/userAvt.jpg')] lg:w-[100px] lg:h-[100px] w-[75px] h-[75px] px-8 bg-cover">
                      </div>
                      <div className="information px-8 items-center">
                        <h1 className="text-orange-600 text-semibold">john doe</h1>
                        <h2>Tran Phu, Ho Chi Minh City</h2>
                      </div>
                        <div className="jobs">
                          <h1>Ui/Ux Designer</h1>
                          <h2>hello@gmail.com</h2>
                          <h2>email</h2>
                        </div>
                  </div>
                    {/* Right interaction */}
                  <div className="interact flex flex-row justify-end px-4 sm:px-4 sm:space-y-0 sm:space-x-5">
                      <div className="reviews justify-center bg-orange-500 lg:w-20 lg:h-20 w-14 h-14 rounded-lg flex-col items-center hidden md:flex">
                          <h1 className="text-semibold items-center text-white text-center">111</h1>
                          <h2 className=" items-center text-white text-center">review</h2>
                      </div>
                      <div className="photos justify-center bg-orange-500 lg:w-20 lg:h-20 w-14 h-14 rounded-lg flex-col items-center hidden md:flex">
                          <h1 className="text-semibold items-center text-white text-center">111</h1>
                          <h2 className="items-center text-white text-center">photos</h2>
                      </div>
                      <div className="followers justify-center bg-orange-500 lg:w-20 lg:h-20 w-14 h-14 rounded-lg flex-col items-center hidden md:flex">
                          <h1 className="text-semibold items-center text-white text-center">111</h1>
                          <h2 className="  text-white text-center">followers</h2>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default UserHeading