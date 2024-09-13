import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CanvasComponent = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

    const handleCanvasClick = (e: React.MouseEvent) => {
        // Get click coordinates and show the tooltip at that location
        const canvasRect = (e.target as HTMLElement).getBoundingClientRect();
        const x = e.clientX - canvasRect.left;
        const y = e.clientY - canvasRect.top;
        setPointerPosition({ x, y });
        setShowTooltip(true); // Show the tooltip when the canvas is clicked
      };
      
      const handleCloseTooltip = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the canvas click event from triggering
        setShowTooltip(false); // Hide the tooltip completely until user clicks on the canvas again
      };      


    return (
        <div className="canvas-container" onClick={handleCanvasClick}>
            {/* Show Tooltip only when showTooltip is true */}
            {showTooltip && (
                <motion.div
                    className="tooltip-container"
                    style={{ top: pointerPosition.y, left: pointerPosition.x }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Pointer */}
                    <div className="pointer-circle">
                        <div className="pointer-dot"></div>
                    </div>

                    {/* Tooltip */}
                    <div className="tooltip-box">
                        <div className="tooltip-arrow"></div>
                        <div className="tooltip-content">
                            <input type="text" value="Click to edit" className="edit-field" />
                            <div className="additional-controls">
                                <span>1 / 5</span>
                                <div className="toggle">
                                    <span>Highlight element</span>
                                    <input type="checkbox" />
                                </div>
                            </div>
                            {/* Close Button */}
                            <button className="close-button" onClick={handleCloseTooltip}>
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>

    );
};

export default CanvasComponent;
