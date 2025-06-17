'use client';

import React, { useState } from 'react';
import styles from './FAQSection.module.css';

function FAQSection() {
  const [openItemId, setOpenItemId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'What size bicycle should I get?',
      answer: 'The right bicycle size depends on your height and inseam. A bike shop or size chart can help you find the perfect fit.',
    },
    {
      id: 2,
      question: 'What is the difference between road bikes and mountain bikes?',
      answer: 'Road bikes are built for speed and paved surfaces, while mountain bikes are designed for rough terrain and off-road cycling.',
    },
    {
      id: 3,
      question: 'Do I need gears on my bicycle?',
      answer: 'Gears help make pedaling easier on hills and at different speeds. They are ideal for variable terrain, but not always necessary for flat commuting.',
    },
    {
      id: 4,
      question: 'How often should I service my bike?',
      answer: 'You should service your bike every 3–6 months depending on usage. Regular maintenance includes checking brakes, tires, and chain lubrication.',
    },
    {
      id: 5,
      question: 'Is wearing a helmet really necessary?',
      answer: 'Yes, wearing a helmet greatly reduces the risk of head injuries and is strongly recommended for all cyclists, regardless of experience.',
    },
  ];

  const toggleFAQ = (itemId) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqHeader}>
        <h2 className={styles.faqTitle}>FAQ</h2>
      </div>

      <div className={styles.faqList}>
        {faqs.map((faq) => (
          <div key={faq.id} className={styles.faqItem}>
            <button
              className={styles.faqQuestionButton}
              onClick={() => toggleFAQ(faq.id)}
              aria-expanded={openItemId === faq.id}
              aria-controls={`faq-answer-${faq.id}`}
              id={`faq-question-${faq.id}`}
            >
              <span className={styles.questionText}>{faq.question}</span>
              <span
                className={`${styles.arrowIcon} ${
                  openItemId === faq.id ? styles.arrowUp : ''
                }`}
              ></span>
            </button>

            <div
              id={`faq-answer-${faq.id}`}
              role="region"
              aria-labelledby={`faq-question-${faq.id}`}
              className={`${styles.faqAnswerContainer} ${
                openItemId === faq.id ? styles.open : ''
              }`}
            >
              <div className={styles.faqAnswerContent}>{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
