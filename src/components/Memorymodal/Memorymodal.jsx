import React, { useEffect, useRef, useState } from 'react';
import './Memorymodal.css';

export default function MemoryModal({ memory, onClose }) {
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [currentLyric, setCurrentLyric] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setCurrentLyric(null);
    setIsFlipped(false);
    setIsRevealed(false);

    let timer;

    if (memory?.revealOnTimer || memory?.id === 3) {
      timer = setTimeout(() => {
        setIsRevealed(true);
      }, 1000);
    }

    // Vídeo local
    if (videoRef.current && memory?.video && !isYouTubeVideo(memory.video)) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;

      videoRef.current.play().catch((err) => {
        console.warn(
          'Autoplay do vídeo bloqueado pelo navegador:',
          err
        );
      });
    }

    // Música
    if (audioRef.current && memory?.audio) {
      audioRef.current.currentTime = 0;

      audioRef.current.play().catch((err) => {
        console.warn(
          'Autoplay bloqueado pelo navegador:',
          err
        );
      });
    }

    return () => {
      if (timer) clearTimeout(timer);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [memory]);

  const handleTimeUpdate = () => {
    if (!audioRef.current || !memory.lyrics) return;

    const currentTime = audioRef.current.currentTime;
    let activeLyric = null;

    for (let i = 0; i < memory.lyrics.length; i++) {
      const lyric = memory.lyrics[i];
      const nextLyric = memory.lyrics[i + 1];

      if (
        currentTime >= lyric.time &&
        (!nextLyric || currentTime < nextLyric.time)
      ) {
        activeLyric = lyric.text;
        break;
      }
    }

    setCurrentLyric(activeLyric);
  };

  // Detecta se a URL é do YouTube
  const isYouTubeVideo = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Extrai o ID do vídeo do YouTube
  const getYouTubeVideoId = (url) => {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : '';
  };

  if (!memory) return null;

  const youtubeUrl = (memory.video && isYouTubeVideo(memory.video))
    ? memory.video
    : (memory.linkUrl && isYouTubeVideo(memory.linkUrl))
      ? memory.linkUrl
      : '';
  const youtubeVideo = Boolean(youtubeUrl);
  const youtubeId = getYouTubeVideoId(youtubeUrl);
  const youtubeThumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '';

  return (
    <div
      className="memory-modal-overlay"
      onClick={onClose}
    >
      {/* Estrelas no Fundo */}
      <div className="side-stars-container">
        <div
          className="star"
          style={{
            top: '15%',
            left: '8%',
            width: '4px',
            height: '4px',
            '--duration': '2s'
          }}
        ></div>

        <div
          className="star"
          style={{
            top: '35%',
            left: '5%',
            width: '6px',
            height: '6px',
            '--duration': '3.5s'
          }}
        ></div>

        <div
          className="star"
          style={{
            top: '70%',
            left: '10%',
            width: '3px',
            height: '3px',
            '--duration': '1.8s'
          }}
        ></div>

        <div
          className="star"
          style={{
            top: '20%',
            right: '7%',
            width: '5px',
            height: '5px',
            '--duration': '2.2s'
          }}
        ></div>

        <div
          className="star"
          style={{
            top: '65%',
            right: '6%',
            width: '6px',
            height: '6px',
            '--duration': '2.5s'
          }}
        ></div>
      </div>

      <div
        className="memory-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor:
            memory.cardBackground || '#0d1527'
        }}
      >
        <button
          className="memory-close-btn"
          onClick={onClose}
        >
          ×
        </button>

        {/* Cabeçalho */}
        <div className="memory-header">
          <span className="memory-icon">
            {memory.icon}
          </span>

          <h2>{memory.label}</h2>

          {memory.date && (
            <span className="memory-date">
              {memory.date}
            </span>
          )}

          {memory.location && (
            <div className="memory-location-tag">
              📍 {memory.location}
            </div>
          )}
        </div>

        {/* Imagem / Vídeo */}
        {(memory.image || memory.video) && (
          <div
            className={`memory-image-container ${
              isRevealed ? 'is-revealed' : ''
            }`}
          >
            {/* Background desfocado */}
            {memory.background && (
              <div
                className="blurred-bg-layer"
                style={{
                  backgroundImage: `url(${
                    memory.background || memory.image
                  })`
                }}
              />
            )}

            {/* ============================= */}
            {/* VÍDEO DO YOUTUBE (CARD CLICÁVEL) */}
            {/* ============================= */}

            {youtubeVideo ? (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="memory-youtube-card"
                title="Haz clic para ver el video en YouTube"
              >
                <img
                  src={memory.image || youtubeThumbnail || '/Imagens/imagem5.jpeg'}
                  alt={memory.label || 'Video de YouTube'}
                  className="memory-youtube-thumb"
                />
                <div className="memory-youtube-overlay">
                  <div className="youtube-play-btn-circle">
                    <svg viewBox="0 0 24 24" className="youtube-play-icon" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span className="youtube-play-text">Ver en YouTube</span>
                  <span className="youtube-subtext">Haz clic para abrir el video</span>
                </div>
              </a>
            ) : memory.video ? (
              /* ============================= */
              /* VÍDEO LOCAL */
              /* ============================= */

              <video
                ref={videoRef}
                className="memory-video"
                src={memory.video}
                poster={memory.image}
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            ) : (
              /* ============================= */
              /* POLAROID */
              /* ============================= */

              <div
                className={`polaroid-card-3d ${
                  isFlipped ? 'flipped' : ''
                }`}
                onClick={() =>
                  memory.secretNote &&
                  setIsFlipped(!isFlipped)
                }
              >
                <div className="polaroid-inner">
                  {/* Frente */}
                  <div className="polaroid-front">
                    <div className="polaroid-photo-box">
                      <img
                        src={memory.image}
                        alt={memory.label}
                      />
                    </div>

                    <div className="polaroid-caption">
                      <span>
                        {memory.caption ||
                          memory.label}
                      </span>
                    </div>

                    {memory.secretNote && (
                      <div className="polaroid-flip-hint">
                        ✨ Gira la foto para ver un secreto
                      </div>
                    )}
                  </div>

                  {/* Verso */}
                  <div className="polaroid-back">
                    <div className="secret-note-content">
                      <span className="secret-icon">
                        💌
                      </span>

                      <h3>Dato curioso</h3>

                      <p>{memory.secretNote}</p>

                      <span className="click-back-hint">
                        (Haz clic para volver)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Frase sincronizada com a música */}
            {currentLyric && (
              <div className="memory-lyric">
                {currentLyric}
              </div>
            )}
          </div>
        )}

        {/* ============================= */}
        {/* PLAYER DE VINIL / MÚSICA */}
        {/* ============================= */}

        {memory.audio && (
          <div className="vinyl-player-widget">
            <div className="vinyl-disc spinning"></div>

            <span className="vinyl-text">
              Reproduciendo tema especial... 🎵
            </span>

            <audio
              ref={audioRef}
              src={memory.audio}
              autoPlay
              loop
              muted={false}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
        )}

        {/* Texto da memória */}
        {memory.text && (
          <p className="memory-text">
            {memory.text}
          </p>
        )}

        {(memory.linkUrl || youtubeVideo) && (
          <div className="memory-video-link-wrap">
            <a
              className="memory-video-link"
              href={memory.linkUrl || youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="youtube-badge-icon"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>{memory.linkLabel || 'Ver el video en YouTube'}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
