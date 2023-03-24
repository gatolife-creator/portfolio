import React from "react";

const Timeline = () => {
  return (
    <>
      <div className="container mx-auto w-full">
        <div className="left-[300px] border-2-2 absolute border-white h-screen border"></div>
        <div className="relative wrap overflow-hidden pt-[200px] h-screen">
          <div className="mb-8 flex justify-between w-full right-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="ml-48 z-20 flex items-center bg-gray-800 shadow-xl w-36 rounded-[8px]">
              <h1 className="mx-auto font-semibold text-lg text-white">2020</h1>
            </div>
            <div className="bg-white/60 rounded-lg shadow-xl w-full px-6 py-4 ml-24">
              <h3 className="font-bold text-gray-800 text-xl">
                Started learning Processing
              </h3>
            </div>
          </div>

          <div className="mb-8 flex justify-between w-full right-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="ml-48 z-20 flex items-center bg-gray-800 shadow-xl w-36 rounded-[8px]">
              <h1 className="mx-auto font-semibold text-lg text-white">2021</h1>
            </div>
            <div className="bg-white/60 rounded-lg shadow-xl w-full px-6 py-4 ml-24">
              <h3 className="font-bold text-gray-800 text-xl">
                Started learning p5.js and Web development
              </h3>
            </div>
          </div>

          <div className="mb-8 flex justify-between w-full right-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="ml-48 z-20 flex items-center bg-gray-800 shadow-xl w-36 rounded-[8px]">
              <h1 className="mx-auto font-semibold text-lg text-white">2022</h1>
            </div>
            <div className="bg-white/60 rounded-lg shadow-xl w-full px-6 py-4 ml-24">
              <h3 className="font-bold text-gray-800 text-xl">
                Started learning Node.js, TypeScript and React
              </h3>
            </div>
          </div>

          <div className="mb-8 flex justify-between w-full right-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="ml-48 z-20 flex items-center bg-gray-800 shadow-xl w-36 rounded-[8px]">
              <h1 className="mx-auto font-semibold text-lg text-white">2023</h1>
            </div>
            <div className="bg-white/60 rounded-lg shadow-xl w-full px-6 py-4 ml-24">
              <h3 className="font-bold text-gray-800 text-xl">
                Received the MIC Award
              </h3>
            </div>
          </div>

          <div className="mb-8 flex justify-between w-full right-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="ml-48 z-20 flex items-center bg-gray-800 shadow-xl w-36 rounded-[12px]">
              <h1 className="mx-auto font-semibold text-lg text-white">20XX</h1>
            </div>
            <div className="bg-white/60 rounded-lg shadow-xl w-full px-6 py-4 ml-24">
              <h3 className="font-bold text-gray-800 text-xl">
                Coming Soon...
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;
