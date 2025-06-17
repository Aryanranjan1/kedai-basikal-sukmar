// src/components/sections/ContactSection.tsx
'use client';

import React, { useState } from 'react';

interface FormData {
    name: string;
    number: string;
    message: string;
}

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        number: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        if (!formData.name || !formData.number || !formData.message) {
            setErrorMessage('All fields are required.');
            setSubmitStatus('error');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/send-contact-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', number: '', message: '' });
            } else {
                setErrorMessage(result.message || 'An unknown error occurred while sending the message.');
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setErrorMessage('Failed to connect to the server. Please check your internet connection.');
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // Main container now has fixed pixel dimensions
        <div style={{
            width: '1440px',   // Fixed width in pixels
            height: '1080px',  // Fixed height in pixels (adjust as needed for your content)
            position: 'relative',
            background: '#F7F7F7',
            overflow: 'hidden'
        }}>
            {/* Left Section - Contact Info */}
            <div style={{ left: 100, top: 82, position: 'absolute', color: 'black', fontSize: 96, fontFamily: 'Outfit', fontWeight: '300', wordWrap: 'break-word' }}>Reach</div>
            <div style={{ left: 377, top: 82, position: 'absolute', color: '#124970', fontSize: 96, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }}>Us</div>
            <div style={{ left: 100, top: 486, position: 'absolute', color: 'rgba(0, 0, 0, 0.70)', fontSize: 32, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word' }}>+60 12-345 6789<br />+60 11-2233 4455<br />kedaibasikalsukmar@gmail.com</div>
            <div style={{ width: 317, left: 100, top: 252, position: 'absolute', color: 'rgba(0, 0, 0, 0.70)', fontSize: 32, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word' }}>No3, Jalan 3/2, Taman Seri Jaromas,<br /> 42600 Jenjarom, Selangor</div>

            {/* Google Maps Embed */}
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.7805579130713!2d101.5030893!3d2.8795565999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdaf5002df7279%3A0x54e798ff077e5825!2sKedai%20Basikal%20Sukmar!5e0!3m2!1sen!2sin!4v1750158697651!5m2!1sen!2sin"
                width="498"
                height="252"
                style={{ border: 0, position: 'absolute', left: 100, top: 705, borderRadius: 14 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
            ></iframe>

            {/* Right Section - Contact Form */}
            <div style={{ width: 689, height: 890, left: 651, top: 67, position: 'absolute', background: 'rgba(18, 73, 112, 0.70)', overflow: 'hidden', borderRadius: 14 }}>
                <form onSubmit={handleSubmit} style={{ padding: '75px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <label htmlFor="name" style={{ left: 0, top: 0, position: 'relative', color: 'white', fontSize: 32, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', display: 'block', marginBottom: '10px' }}>Your Name</label>
                        <div style={{ width: 556, height: 74, background: 'white', overflow: 'hidden', borderRadius: 12 }}>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="enter your name here"
                                style={{
                                    width: '100%', height: '100%', border: 'none', background: 'transparent',
                                    paddingLeft: '29px', fontSize: 32, fontFamily: 'Outfit', fontWeight: '600',
                                    color: 'rgba(0, 0, 0, 0.70)', outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <label htmlFor="number" style={{ left: 0, top: 0, position: 'relative', color: 'white', fontSize: 32, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', display: 'block', marginBottom: '10px' }}>Your Number</label>
                        <div style={{ width: 556, height: 74, background: 'white', overflow: 'hidden', borderRadius: 12 }}>
                            <input
                                type="text"
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="enter your number here"
                                style={{
                                    width: '100%', height: '100%', border: 'none', background: 'transparent',
                                    paddingLeft: '21px', fontSize: 32, fontFamily: 'Outfit', fontWeight: '600',
                                    color: 'rgba(0, 0, 0, 0.70)', outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <label htmlFor="message" style={{ left: 0, top: 0, position: 'relative', color: 'white', fontSize: 32, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', display: 'block', marginBottom: '10px' }}>Message</label>
                        <div style={{ width: 556, height: 243, background: 'white', overflow: 'hidden', borderRadius: 12 }}>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="enter your message here"
                                style={{
                                    width: '100%', height: '100%', border: 'none', background: 'transparent',
                                    paddingLeft: '25px', paddingTop: '17px', fontSize: 32, fontFamily: 'Outfit',
                                    fontWeight: '600', color: 'rgba(0, 0, 0, 0.70)', outline: 'none',
                                    resize: 'none'
                                }}
                            ></textarea>
                        </div>
                    </div>

                    <div style={{ width: 556, height: 79, background: '#124970', overflow: 'hidden', borderRadius: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                background: 'transparent', border: 'none', color: 'white',
                                fontSize: 32, fontFamily: 'Outfit', fontWeight: '600',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                    </div>

                    {submitStatus === 'success' && (
                        <p style={{ color: 'lightgreen', fontSize: '20px', fontFamily: 'Outfit', fontWeight: '500', marginTop: '20px', textAlign: 'center' }}>
                            Message sent successfully!
                        </p>
                    )}
                    {submitStatus === 'error' && (
                        <p style={{ color: 'red', fontSize: '20px', fontFamily: 'Outfit', fontWeight: '500', marginTop: '20px', textAlign: 'center' }}>
                            Error: {errorMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContactSection;