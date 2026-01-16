
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[#020202] overflow-hidden pointer-events-none">
      {/* Base Image */}
      <img 
        src="https://picsum.photos/id/10/1920/1080?grayscale&blur=10" 
        className="absolute inset-0 w-full h-full object-cover opacity-20 scale-125"
        alt="Dark background"
      />
      
      {/* Atmospheric Fog Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-[200%] h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-200/20 via-transparent to-transparent animate-[pulse_10s_infinite]" />
      </div>

      {/* Roving Darkness */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),_transparent_0%,_black_60%)] opacity-80" />
      
      {/* Grain Effect */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
};

export default Background;
