import React, { useState } from 'react';
import "./Sealedletter.css"; // ✅ Com "l" minúsculo (como está na sua pasta)

export default function SealedLetter() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="sealed-letter-badge" onClick={() => setShowModal(true)}>
        <span>📩</span>
        <span>No abrir hasta que estemos juntos</span>
      </div>

      {showModal && (
        <div className="letter-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="letter-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setShowModal(false)}>×</span>
            <div className="letter-icon">🔒</div>
            <h3>Todavía no...</h3>
            <p>Esta carta está reservada para el momento en que volvamos a estar juntos.</p>
            <button className="btn-modal-close" onClick={() => setShowModal(false)}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}