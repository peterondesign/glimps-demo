// components/Canvas.js
export default function Canvas() {
    return (
      <main className="ml-1/6 pt-16 pl-4 pr-4 flex justify-center items-center h-screen">
        <div className="bg-white w-4/5 h-5/6 border border-gray-300 rounded-lg shadow-lg">
          {/* Simulating a browser window inside the canvas */}
          <div className="bg-gray-100 h-10 flex items-center px-4 rounded-t-lg">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="p-4">[Insert Page Content Here]</div>
        </div>
      </main>
    );
  }
  