import React from 'react';
import GlassCard from './GlassCard';
import { useTheme } from '../context/ThemeContext';

const ExampleUsage: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Basic Card */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold mb-2">Basic Card</h2>
          <p className="text-gray-600 dark:text-gray-300">
            A simple glass card with default opacity and hover effects.
          </p>
        </GlassCard>

        {/* Card with Custom Opacity */}
        <GlassCard className="p-6" opacity={0.1}>
          <h2 className="text-xl font-semibold mb-2">More Transparent</h2>
          <p className="text-gray-600 dark:text-gray-300">
            This card uses a lower opacity value of 0.1
          </p>
        </GlassCard>

        {/* Interactive Card */}
        <GlassCard 
          className="p-6 cursor-pointer" 
          opacity={0.3}
          onClick={() => alert('Card clicked!')}
        >
          <h2 className="text-xl font-semibold mb-2">Interactive Card</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Click me! I'm an interactive card with higher opacity.
          </p>
        </GlassCard>

        {/* Card with Image */}
        <GlassCard className="overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg" 
            alt="Mountain landscape" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Card with Image</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Glass effect works great with images too!
            </p>
          </div>
        </GlassCard>

        {/* Static Card */}
        <GlassCard className="p-6" hover={false}>
          <h2 className="text-xl font-semibold mb-2">Static Card</h2>
          <p className="text-gray-600 dark:text-gray-300">
            This card has hover effects disabled.
          </p>
        </GlassCard>

        {/* Card with Custom Content */}
        <GlassCard className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
            <div>
              <h2 className="text-xl font-semibold">Custom Layout</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Flexible content arrangement
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ExampleUsage;