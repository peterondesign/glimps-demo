"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  Share,
  Eye,
  AlignJustify,
  MessageCircle,
  ChevronLeft,
  Menu,
} from "lucide-react";
import Image from "next/image";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import uploadedImage from "../app/ImageDemo.jpg";
import uploadedImage2 from "../app/ImageDemo2.png"; // Use your uploaded image
import CanvasComponent from "../components/CanvasComponent";

interface TooltipProps {
  content: string;
  position: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, position }) => {
  return (
    <div
      className={`fixed ${position} bg-black text-white text-xs rounded-md py-1 px-3 z-50 shadow-lg`}
    >
      {content}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-black"></div>
    </div>
  );
};

interface Slide {
  id: number;
  content: string;
}

interface DraggableSlideProps {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  deleteSlide: (id: number) => void;
  selectedSlide: number;
  setSelectedSlide: (id: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableSlide: React.FC<DraggableSlideProps> = ({
  slide,
  index,
  moveSlide,
  deleteSlide,
  selectedSlide,
  setSelectedSlide,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<DragItem>({
    accept: "SLIDE",
    hover(item: DragItem) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveSlide(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: () => ({ id: slide.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`mb-2 p-1 rounded-lg cursor-move ${selectedSlide === slide.id
          ? "bg-[#FF4D26] bg-opacity-10 border border-[#FF4D26]"
          : "border border-gray-100"
        }`}
      onClick={() => setSelectedSlide(slide.id)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor:
          selectedSlide === slide.id ? "#FF4D26" : "rgba(41, 37, 36, 0.50)",
        filter:
          selectedSlide !== slide.id
            ? "drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))"
            : "none",
      }}
    >
      <div className="relative">
        <Image
          src={uploadedImage}
          alt={`Slide ${slide.id}`}
          className="w-[240px] h-auto rounded-md"
          width={240}
          height={140}
        />
        <div
          className="absolute top-2 left-2 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold"
          style={{
            backgroundColor:
              selectedSlide === slide.id
                ? "#FF4D26"
                : "rgba(41, 37, 36, 0.50)",
            filter:
              selectedSlide !== slide.id
                ? "drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))"
                : "none",
          }}
        >
          {slide.id}
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            className="p-1 rounded-full"
            style={{
              backgroundColor: "rgba(41, 37, 36, 0.50)",
              filter:
                selectedSlide !== slide.id
                  ? "drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))"
                  : "none",
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle more options
            }}
          >
            <AlignJustify className="w-4 h-4" />
          </button>
          <button
            className="p-1 rounded-full"
            style={{
              backgroundColor: "rgba(41, 37, 36, 0.50)",
              filter:
                selectedSlide !== slide.id
                  ? "drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))"
                  : "none",
            }}
            onClick={(e) => {
              e.stopPropagation();
              deleteSlide(slide.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const DemoFlow: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, content: "Slide 1" },
    { id: 2, content: "Slide 2" },
    { id: 3, content: "Slide 3" },
  ]);
  const [selectedSlide, setSelectedSlide] = useState<number>(1);
  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(256);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [isMobileLeftPanelOpen, setIsMobileLeftPanelOpen] = useState<boolean>(
    false
  );
  const [isModalTooltipVisible, setIsModalTooltipVisible] =
    useState<boolean>(false);
  const [isTooltipTooltipVisible, setIsTooltipTooltipVisible] =
    useState<boolean>(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if screen is mobile on component mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  const resize = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX;
      setLeftPanelWidth(Math.max(200, Math.min(newWidth, 320)));
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  const addSlide = () => {
    const newSlide: Slide = {
      id: slides.length + 1,
      content: `Slide ${slides.length + 1}`,
    };
    setSlides([...slides, newSlide]);
  };

  const deleteSlide = (id: number) => {
    setSlides(slides.filter((slide) => slide.id !== id));
    if (selectedSlide === id) {
      setSelectedSlide(slides[0]?.id || 0);
    }
  };

  const moveSlide = (fromIndex: number, toIndex: number) => {
    const updatedSlides = [...slides];
    const [movedSlide] = updatedSlides.splice(fromIndex, 1);
    updatedSlides.splice(toIndex, 0, movedSlide);
    setSlides(updatedSlides);
  };

  const togglePreviewMode = () => {
    setIsPreview((prev) => !prev);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Header */}
        <header className="custom-header items-center p-4 bg-white border-b">
          <div className="flex items-center">
            <button className="mr-4 p-2 border border-gray-300 rounded-md hover:bg-gray-50 md:block">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            <button
              className="mr-4 p-2 border border-gray-300 rounded-md hover:bg-gray-50 md:hidden"
              onClick={() => setIsMobileLeftPanelOpen((prev) => !prev)}
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>

            <h1 className="text-xl text-slate-900 font-semibold">
              Name of demo flow
            </h1>
          </div>
          <div className="flex gap-4">
            {/* Toggle button */}
            <motion.button
              className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={togglePreviewMode}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </motion.button>
            <motion.button
              className="flex items-center px-4 py-2 bg-[#FF4D26] text-sm font-medium rounded-md text-white hover:bg-[#E63E1C]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </motion.button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Animate visibility based on isPreview */}
          <motion.div
            className={`bg-white overflow-y-auto fixed md:relative z-10`}
            animate={{
              x: isPreview ? -leftPanelWidth : 0,  // Move left panel out of view when in preview mode
            }}
            transition={{ duration: 0.5 }}
            style={{
              width: `${leftPanelWidth}px`,
            }}
          >
            <div className="p-4">
              <button className="w-full mb-4 py-2 px-4 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center justify-center">
                Edit lead form
              </button>
              <button
                onClick={addSlide}
                className="w-full mb-4 py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center"
              >
                <span className="mr-2">+</span>
                Add slide
              </button>
              {slides.map((slide, index) => (
                <DraggableSlide
                  key={slide.id}
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                  deleteSlide={deleteSlide}
                  selectedSlide={selectedSlide}
                  setSelectedSlide={setSelectedSlide}
                />
              ))}
              <button className="w-full mb-4 py-2 px-4 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center justify-center">
                Edit end CTA
              </button>
            </div>
          </motion.div>



          {/* Canvas */}
          <div className="bg-dotted flex-1 bg-gray-100 p-4 overflow-auto">
            <motion.div
              className="bg-white rounded-lg shadow-lg h-full"
              animate={{
                scale: isPreview ? 1.1 : 1,
                transition: { duration: 0.3 },
              }}
            >
              {/* Simulating browser window with buttons and search bar */}
              <div className="flex items-center space-x-2 mb-4 rounded-t-lg border-b border-gray-100 py-4 px-8 bg-gray-50">
                <div className="flex items-center space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <input
                  type="text"
                  placeholder="https://example.com"
                  className="flex-grow p-1 pl-3 border-none rounded-md text-gray-700 focus:outline-none bg-gray-100"
                  readOnly
                />
              </div>

              {/* Canvas content */}
              <div className="relative w-full h-[calc(100%-3rem)]">
                <CanvasComponent/>
                <Image
                  src={uploadedImage2}
                  alt="Canvas Content"
                  className="w-[240px] h-auto rounded-md"
                  layout="responsive"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Animate visibility based on isPreview */}
          <motion.div
            className="right-panel-holder border-l border-gray-200 fixed md:relative z-10"
            animate={{
              x: isPreview ? 500 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4 right-panel-custom space-y-4 relative">
              <div
                className="relative"
                onMouseEnter={() => setIsModalTooltipVisible(true)}
                onMouseLeave={() => setIsModalTooltipVisible(false)}
              >
                <motion.button
                  className="bg-white flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4D26] rounded-full border-gray-300 border"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlignJustify className="w-6 h-6" />
                </motion.button>
                {isModalTooltipVisible && (
                  <Tooltip content="Modal" position="top-24 right-16" />
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => setIsTooltipTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipTooltipVisible(false)}
              >
                <motion.button
                  className="bg-white flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4D26] rounded-full border-gray-300 border"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.button>
                {isTooltipTooltipVisible && (
                  <Tooltip content="Tooltip" position="top-36 right-16" />
                )}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Custom Scrollbar and Dotted Background Styles */}
        <style jsx global>{`
          ::-webkit-scrollbar {
            width: 4px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #f9fafb;
            border-radius: 2px;
          }
          ::-webkit-scrollbar-track {
            background-color: #f2f4f7;
          }

          .bg-dotted {
            background-image: radial-gradient(circle, #c1c1c1 1px, transparent 1px);
            background-size: 20px 20px;
            z-index: 0;
          }

          right-panel-holder {
            width: 84px;
          }

          .custom-header {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
          }

          @media (max-width: 768px) {
            .custom-header {
              flex-direction: column;
              width: 100%;
              gap: 16px;
            }
            .right-panel {
              position: fixed;
              bottom: 10px;
              left: 50%;
              transform: translateX(-50%);
              width: auto;
              z-index: 20;
            }

            .right-panel .p-4 {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              space-y: 4;
            }
            .right-panel-custom {
              display: flex;
              justify-content: end;
              align-items: center;
              gap: 8px;
              width: 100%;
            }
            .space-y-4 > :not([hidden]) ~ :not([hidden]) {
              --tw-space-y-reverse: 0;
              margin-top: 0 !important;
              margin-bottom: 0 !important;
            }
            .right-panel-holder {
              width: 100%;
              bottom: 24px;
            }
          }
        `}</style>
      </div>
    </DndProvider>
  );
};

export default DemoFlow;
