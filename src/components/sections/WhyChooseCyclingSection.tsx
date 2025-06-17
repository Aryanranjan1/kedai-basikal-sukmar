'use client'; // This directive is crucial for client-side components in Next.js

import React from 'react';
// REMOVE the direct DOMPurify import: import DOMPurify from 'dompurify';
// Instead, import the custom hook we created:
import useSanitizeHtml from '../../hooks/useSanitizeHtml'; // Adjust this path if your 'hooks' folder is elsewhere

const WhyChooseCycling: React.FC = () => { // Explicitly type as React.FC
    // The entire content as a static HTML string.
    // Note: If this content were coming from an API, it would typically be a state variable or prop.
    const staticContentHTML = `
        <div style="width: 100%;">
            <span style="color: black; font-size: 20px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;">Why Choose Cycling?<br/></span>
            <span style="color: rgba(0, 0, 0, 0.70); font-size: 14px; font-family: Outfit, sans-serif; font-weight: 400; word-wrap: break-word;"><br/>Cycling is more than just a ride; it's an exhilarating escape and an adrenaline-filled journey that does wonders for your entire well-being. It's a fantastic stress-reliever, soothing your mind and energizing your body, taking you to cloud nine with every turn of the pedal. Imagine cruising through scenic paths, bustling city streets, or peaceful lanes, fully in control of your adventure. From conquering a challenging route to simply enjoying a leisurely spin with family, cycling offers unparalleled joy and freedom.<br/>From kids to adults, and everyone in between, hopping on a bike, grabbing the handles, hitting the pedals, and accelerating towards new horizons is a universal thrill. It’s about exploring paths less traveled and roads yet discovered, all while boosting your physical health and bringing an incredible lift to your mental state.<br/></span>
            <span style="color: black; font-size: 20px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;"><br/>Where to Find Your Perfect Ride?<br/></span>
            <span style="color: black; font-size: 14px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;"><br/></span>
            <span style="color: rgba(0, 0, 0, 0.70); font-size: 14px; font-family: Outfit, sans-serif; font-weight: 400; word-wrap: break-word;">So, when you're searching for that ideal companion for urban commutes, thrilling weekend adventures, or smooth strolls with loved ones, look no further than Kedai Basikal Sukmar. Whether your priority is exploring challenging routes or navigating city lanes with ease, we have the perfect ride for you.<br/><br/>With our diverse collection of modern electric bicycles and traditional bikes, finding your perfect match is simple. Experience the ease of Browse our selection online or visit our friendly shop at No3, Jalan 3/2, Taman Seri Jaromas, 42600 Jenjarom, Selangor. We're here to help you find a bike that's more than just transport—it's a friend for every journey.<br/></span>
            <span style="color: black; font-size: 14px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;"><br/></span>
            <span style="color: black; font-size: 20px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;"><br/>Explore Our Bicycle Collections<br/></span>
            <span style="color: black; font-size: 14px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;"><br/></span>
            <span style="color: rgba(0, 0, 0, 0.70); font-size: 14px; font-family: Outfit, sans-serif; font-weight: 400; word-wrap: break-word;">At Kedai Basikal Sukmar, we pride ourselves on offering a wide array of bicycles, each crafted to suit your unique needs and riding style.<br/><br/></span>
            <span style="color: rgba(0, 0, 0, 0.70); font-size: 14px; font-family: Outfit, sans-serif; font-weight: 400; word-wrap: break-word;">Electric Bicycles: Effortless power for longer commutes and fun adventures.<br/>Mountain Bicycles: Durable and sturdy, designed to conquer every rugged path.<br/>City Bicycles: Lightweight and easy to maneuver, perfect for urban exploration.<br/>Kids Bicycles: Safe and fun designs, built for young adventurers to explore confidently.<br/>Road Bicycles: Sleek and speedy, ideal for long-distance rides and flat terrains.<br/></span>
            <span style="color: rgba(0, 0, 0, 0.70); font-size: 14px; font-family: Outfit, sans-serif; font-weight: 400; word-wrap: break-word;"><br/><br/>Each category is expertly curated. Some bikes are lightweight and agile, designed to help you swift, sway, slay, and make your way through busy streets. Others are engineered for durability and sturdiness, ensuring your adventure never stops. And for the little ones, our cycles are perfect for safe exploration, allowing them to discover the joy of cycling early on.<br/></span>
            <span style="color: black; font-size: 14px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;"><br/></span>
            <span style="color: black; font-size: 20px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;">Find Your Perfect Match Online<br/></span>
            <span style="color: black; font-size: 14px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;"><br/></span>
            <span style="color: rgba(0, 0, 0, 0.70); font-size: 14px; font-family: Outfit, sans-serif; font-weight: 400; word-wrap: break-word;">Choosing the perfect bicycle that truly suits your riding style, offers ultimate comfort, and feels like it was made just for you is an exciting journey. We invite you to explore the plethora of options available on our website. Take your time, compare features, and discover the bike that speaks to your adventurous spirit.<br/>Whatever your preference, whether you're eyeing a powerful electric bike or a sturdy mountain companion, finding your ideal ride with Kedai Basikal Sukmar has never been simpler.<br/></span>
            <span style="color: black; font-size: 14px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;"><br/></span>
            <span style="color: black; font-size: 20px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;">Your Next Adventure Awaits!<br/></span>
            <span style="color: black; font-size: 14px; font-family: Outfit, sans-serif; font-weight: 600; word-wrap: break-word;"><br/></span>
            <span style="color: rgba(0, 0, 0, 0.70); font-size: 14px; font-family: Outfit, sans-serif; font-weight: 400; word-wrap: break-word;">Cycling is more than just a sport; it's a thrilling, soul-enriching experience that significantly enhances both physical and mental well-being. Whether you dream of conquering mountain trails, effortlessly cruising city streets on an electric bike, or exploring uncharted paths, cycling offers unparalleled joy and freedom. Our diverse range—from cutting-edge electric and robust mountain bikes to nimble city and safe kids' cycles—ensures there’s a perfect match for every rider.<br/><br/>Buying a bicycle online from Kedai Basikal Sukmar is incredibly convenient, saving you time and effort. With just a few clicks, you can explore a variety of options, compare features, and find the perfect ride, whether for rugged terrains or daily commutes. Plus, with our reliable delivery and easy repair services, we ensure a hassle-free experience from start to finish.<br/><br/>Explore our extensive collection and buy bicycles online today. With Kedai Basikal Sukmar, purchasing your next adventure has never been simpler or more exciting!<br/> Generate Audio Overview</span>
        </div>
    `;

    // Use the custom hook to sanitize the HTML content.
    // The hook handles the client-side import and execution of DOMPurify.
    const sanitizedHTML = useSanitizeHtml(staticContentHTML);

    return (
        <div style={{ width: '100%', position: 'relative', background: '#F7F7F7', overflow: 'hidden', padding: '6px 0' }}>
            <div style={{
                maxWidth: '1000px', // Adjusted for better readability, you can use 1235 if desired
                margin: '0 auto',
                padding: '0 20px', // Add horizontal padding for smaller screens
                boxSizing: 'border-box' // Include padding in element's total width
            }}>
                <div
                    // Using dangerouslySetInnerHTML to render HTML from the static string
                    dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                ></div>
            </div>
              {/* Bottom Line (Existing) */}
      <div
        style={{
          width: 'calc(100% - 196px)',
          maxWidth: '1240px',
          height: '0',
          margin: '30px auto 0',
          outline: '2px #124970 solid',
          outlineOffset: '-1px',
        }}
      ></div>
        </div>
    );
};

export default WhyChooseCycling;