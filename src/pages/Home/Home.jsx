import { useState } from "react";
import "./Home.css";

import SealedLetter from "../../components/Sealedletter/Sealedletter";
import Hero from "../../components/Hero/Hero";
import Countdown from "../../components/Countdown/Countdown";
import Button from "../../components/Button/Button";
import Timeline from "../../components/Timeline/Timeline";

function Home() {
  const [showLetter, setShowLetter] = useState(false);

  const handleStart = () => {
    setShowLetter(true);
  };

  const handleDiscover = () => {
    setShowLetter(false);

    setTimeout(() => {
      document
        .querySelector(".timeline-container")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 300);
  };

  return (
    <main className="home">
      <SealedLetter />

      <Hero />

      <Countdown />

      {/* Botão inicial */}
      <Button onClick={handleStart} />

      {/* Carta surpresa */}
      {showLetter && (
        <div className="surprise-overlay">
          <div className="surprise-letter">
            <span className="surprise-heart">❤️</span>

            <h2>Antes de continuar...</h2>

            <p>
              Quiero que sepas algo...
            </p>

            <p>
              Todo lo que encontrarás aquí fue hecho pensando en ti.
            </p>

            <p>
              Cada recuerdo, cada detalle y cada capítulo representa una
              pequeña parte de nuestra historia.
            </p>

            <p className="surprise-final">
              Bienvenida a nuestra historia, mi amor. ❤️
            </p>

            <button
              className="discover-button"
              onClick={handleDiscover}
            >
              ✨ Descubrir nuestra historia ✨
            </button>
          </div>
        </div>
      )}

      <Timeline />
    </main>
  );
}

export default Home;