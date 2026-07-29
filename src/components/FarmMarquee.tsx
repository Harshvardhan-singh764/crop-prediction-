import React from 'react';

const FARM_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Tractor in Field'
  },
  {
    src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Rice Paddy Field'
  },
  {
    src: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Wheat Harvest'
  },
  {
    src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Green Crops'
  },
  {
    src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Farm Landscape'
  },
  {
    src: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Cultivator'
  },
  {
    src: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Harvester'
  },
  {
    src: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Sugarcane Farm'
  },
  // Added uploaded photos replacements
  {
    src: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Farmer Spraying'
  },
  {
    src: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Millet Stalk'
  },
  {
    src: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=800&h=500&q=80',
    label: 'Green Harvester'
  }
];

export const FarmMarquee: React.FC = () => {
  // Duplicate images for seamless infinite loop
  const allImages = [...FARM_IMAGES, ...FARM_IMAGES];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-[#0a1406]/90 via-[#0c1a2a]/60 to-[#0a1406]/90 border-b border-[#a3e635]/15 relative">

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a1406] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a1406] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Row */}
      <div className="farm-marquee flex gap-6 py-6 px-4">
        {allImages.map((img, idx) => (
          <div
            key={idx}
            className="flex-none w-80 h-48 sm:w-96 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#a3e635]/30 hover:border-[#38bdf8]/60 transition-all group relative shadow-xl hover:shadow-[#38bdf8]/30"
          >
            <img
              src={img.src}
              alt={img.label}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Dark gradient overlay with label */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
              <span className="text-[10px] font-mono font-bold text-white/90 drop-shadow-md">
                {img.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
