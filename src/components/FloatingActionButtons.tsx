// components/FloatingButtons.js
export default function FloatingButtons() {
    return (
      <div className="fixed right-4 top-1/4 space-y-4">
        <FloatingButton icon={<span role="img" aria-label="pencil">📝</span>} label="Add Text" />
        <FloatingButton icon={<span role="img" aria-label="file">📄</span>} label="Add Modal" />
      </div>
    );
  }
  
  function FloatingButton({ icon: Icon, label }: { icon: JSX.Element; label: string }) {
    return (
      <button className="bg-blue-500 text-white p-4 rounded-full shadow-md flex items-center justify-center">
        {Icon}
      </button>
    );
  }
  