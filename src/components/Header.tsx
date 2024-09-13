// components/Header.js
export default function Header() {
    return (
        <header className="z-10 fixed top-0 left-0 right-0 bg-white shadow-md h-12 flex items-center justify-between px-4">
            <div className="Button h-9 p-2 bg-white rounded-lg shadow border border-[#cfd4dc] justify-center items-center gap-2 inline-flex">
                <div className="ChevronLeft text-slate-900 w-5 h-5 py-[5px] justify-center items-center flex" />
            </div>
            <h1 className="text-lg text-slate-900 font-semibold">Name of demo flow</h1>
            <div className="space-x-4">
                <button className="bg-gray-200 p-2 rounded">Preview</button>
                <button className="bg-red-500 text-white p-2 rounded">Share</button>
            </div>
        </header>
    );
}
