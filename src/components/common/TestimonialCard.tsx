// src/components/common/TestimonialCard.tsx
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string; // Changed from 'role' to 'title' to match TestimonialCarousel's interface
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, title }) => {
    return (
        <div style={{
            width: 428, // Fixed width as per original design
            height: 300, // Fixed height as per original design
            position: 'relative', // Relative for children absolute positioning
            overflow: 'hidden', // Ensures content stays within bounds
            borderRadius: 14,
            outline: '2px #124970 solid', // Border
            outlineOffset: '-2px', // Inset border
            backgroundColor: 'white', // Explicit background for clarity
            flexShrink: 0 // Prevents card from shrinking in flex container
        }}>
            {/* Quote icon */}
            <div style={{
                position: 'absolute',
                left: 22,
                top: -10,
                color: '#124970',
                fontSize: 160,
                fontFamily: 'Outfit',
                fontWeight: '200',
                wordWrap: 'break-word'
            }}>“</div>

            {/* Quote text */}
            <div style={{
                width: 369,
                left: 45,
                top: 105,
                position: 'absolute',
                color: 'rgba(0, 0, 0, 0.70)',
                fontSize: 20,
                fontFamily: 'Outfit',
                fontWeight: '400',
                wordWrap: 'break-word'
            }}>{quote}</div>

            {/* Author */}
            <div style={{
                left: 171,
                top: 215,
                position: 'absolute',
                color: '#124970',
                fontSize: 20,
                fontFamily: 'Outfit',
                fontWeight: '500',
                wordWrap: 'break-word'
            }}>{author}</div>

            {/* Title (or role) */}
            <div style={{
                left: 160,
                top: 240,
                position: 'absolute',
                color: '#124970',
                fontSize: 14,
                fontFamily: 'Outfit',
                fontWeight: '400',
                wordWrap: 'break-word'
            }}>{title}</div>
        </div>
    );
};

export default TestimonialCard;