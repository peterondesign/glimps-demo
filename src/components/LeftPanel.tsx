
export default function LeftPanel() {
  return (
    <aside className="bg-gray-100 h-screen pt-16 fixed top-0 left-0 w-1/6">
      <button className="bg-blue-500 text-white w-full p-2 rounded-md mb-2">+ Add lead page</button>
      <div className="space-y-4">
        {/* Example of a page item */}
        <PageItem number="1" />
        <PageItem number="2" />
        <PageItem number="3" />
        {/* Add more PageItems */}
      </div>
      <button className="bg-blue-500 text-white w-full p-2 rounded-md mt-4">+ Add end CTA</button>
    </aside>
  );
}

function PageItem({ number }: { number: string }) {
  return (
    <div className="flex items-center justify-between bg-white shadow p-2 rounded-md cursor-pointer">
      <div className="flex items-center space-x-2">
        <span className="text-red-500">{number}</span>
        <img src="/thumbnail.png" alt="Page Thumbnail" className="w-12 h-12" />
      </div>
      <div className="flex items-center space-x-2">
        <button className="bg-gray-200 p-1 rounded">🗑️</button>
        <button className="bg-gray-200 p-1 rounded">⋮</button>
      </div>
    </div>
  );
}
