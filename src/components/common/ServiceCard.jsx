// src/components/common/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ icon, title1, title2 }) => {
    return (
        // These fixed pixel widths and heights will be scaled by the parent ScaleWrapper
        <div className="w-[250px] h-[140px] overflow-hidden rounded-xl border-2 border-[#124970] relative flex items-center p-3 bg-white">
            <div className="w-[70px] h-[70px] flex-shrink-0 relative mr-3">
                <div className="absolute inset-0 border-4 border-[#124970] rounded-full flex items-center justify-center">
                    {icon ? icon : <span className="text-xl text-[#124970]">[ICON]</span>}
                </div>
            </div>
            <div className="flex flex-col justify-center items-start flex-grow">
                {/* These fixed font sizes will be scaled by the parent ScaleWrapper */}
                <div className="text-black text-[20px] font-semibold font-['Inter'] leading-tight">{title1}</div>
                <div className="text-[#124970] text-[20px] font-semibold font-['Inter'] leading-tight">{title2}</div>
            </div>
        </div>
    );
};

export default ServiceCard;