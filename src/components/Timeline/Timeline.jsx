import React, { useState } from 'react';
import MemoryModal from "../Memorymodal/Memorymodal"; // ✅ Com "m" minúsculo
import './Timeline.css';

const memoryPoints = [
  {
    id: 1,
    label: 'Cómo nos conocimos',
    date: 'Capítulo I — Arbor Hills', 
    icon: '❤️',
    unlocked: true,
    image: '/Imagens/primeirafoto800.jpeg',
    background: '/Imagens/arborhills.jpg',
    audio: '/Musicas/fundo.mp3',
    text: `Mi amor, ¡falta tan poco para que podamos vernos! ❤️

¿Recuerdas que esta semana estabas pensando en hacer un video sobre nosotros? Yo también estuve pensando en hacer algo especial para ti... y hasta pensé: “Uy, ¿será que le digo que estoy creando esto para ella?” jajajaja. Pero decidí guardarlo como una sorpresa. ❤️

Este fue el primer lugar donde nos encontramos. ¿Todavía recuerdas que nuestras iniciales, M+V, siguen allí? 🥹❤️

Y esta canción también nos representa muchísimo. Hice todo esto con mucho amor y cariño.

Los próximos capítulos de nuestra historia serán perfectos; esto es solo el primero...

En fin, solo quería decirte que te amo muchísimo. ❤️`,
    cardBackground: '#1a1025'
  },
  {
    id: 2,
    label: 'El día del primer beso',
    caption: 'Te amo ❤️', // 👈 Legenda específica para o Cap II
    date: '5/3/2023 — Carrolton, TX',
    icon: '📷',
    unlocked: true,
    // 📸 'image' mantido no singular para o MemoryModal renderizar
    image: '/Imagens/Primeirobeijo.jpeg',
    // 🎵 'audio' mantido direto para o áudio tocar
    audio: '/Musicas/darteunbeso.mp3',
    location: '📍 Parque Courtland Carrolton,',
    secretNote: 'Dato curioso: ¡Estaba súper nervioso antes de darte ese beso! 🙈',
    text: '"Este día fue súper especial, el día del beso jajaja (o en realidad uno de los besos jajaja). Esos días en los parques fueron muy lindos, te amo <3 —Por cierto, esta fue una de las primeras canciones que me mostraste. ❤️"',
    cardBackground: '#000000be',
    background: '/Imagens/background2.webp'
  },
 {
    id: 3,
    label: 'La llamada de su cumpleaños',
    date: 'Dallas / Curitiba',
    icon: '📞',
    unlocked: true,
    image: '/Imagens/chamada.jpeg',
    background: '/Imagens/hopefull3.jpg',
    caption: 'Siempre deciamos "muito conectados" ahora eso hace mas sentido✨',
    revealOnTimer: true, // 👈 MUDADO PARA true PARA ATIVAR O EFEITO!
    audio: '/Musicas/googoodolls3.mp3',
    text: '"Honestamente este día fue uno de los más difíciles para mí... Pero cuando miro al lado, veo el sacrificio que hicimos para poder estar juntos, junto con el sacrificio de Jesús por nosotros. ¡Así que Él nos eligió!"❤️',
    cardBackground: '#3d2500'
  },
  {
    id: 4,
    label: 'El mundo Amarillo',
    date: 'Capítulo IV - Dallas',
    icon: '🌻',
    unlocked: true,
    image: '/Imagens/fotoid4.jpeg',
    background: '/Imagens/yellow.jpg',
    caption:' Mi mundo contigo es Amarillo✨', // 👈 Legenda específica para o Cap IV!
    revealOnTimer: true, // 👈 Ativa o efeito de sumir a Polaroid e florescer o fundo!
    audio: '/Musicas/yellow.mp3',
    text: 'Esa canción nos marcó muchísimo. Creo que cada vez que estábamos juntos sonaba esa canción, y honestamente, siempre que la escucho me acuerdo de ti. Mi mundo sin ti era gris y vacío; hoy, contigo, es amarillo y lleno de luz. Dentre tantas flores, tú eres la más hermosa.',
    cardBackground: '#b99309'
  },
  {
    id: 5,
    label: 'Cuando nos enamoramos',
    date: 'Capítulo V',
    icon: '❤️',
    unlocked: true,
    image: '/Imagens/imagem5.jpeg',
    background: '/Imagens/thenight5.jpg',
    audio: '/Musicas/thenightwemet.mp3',
    video: 'https://youtu.be/gvQRhSSvAEE?si=S-6AYP_FSNWB79Pa',
    text: 'Te amo muchísimo, mi amor. Cada momento contigo me hace sentir que el mundo tiene más sentido, más brillo y más amor. Este video es un pequeño recuerdo de lo lindo que fue enamorarnos y de lo mucho que te quiero. Gracias por ser mi persona favorita y por llenar mi vida de alegría, paz y sueños compartidos. ❤️',
    linkLabel: '▶ Ver el video en YouTube',
    linkUrl: 'https://youtu.be/gvQRhSSvAEE?si=S-6AYP_FSNWB79Pa',
    cardBackground: '#000625'
  },
  {
    id: 6,
    label: 'La distancia',
    date: 'Capítulo VI',
    icon: '🌎',
    unlocked: false,
    image: '/Imagens/primeirafoto800.jpeg',
    background: '/Imagens/background1.jpg',
    cardBackground: '#0d222a'
  },
  {
    id: 7,
    label: 'El viaje',
    date: 'Capítulo VII',
    icon: '✈️',
    unlocked: false,
    image: '/Imagens/Primeirobeijo.jpeg',
    background: '/Imagens/background1.jpg',
    cardBackground: '#281a0d'
  },
  {
    id: 8,
    label: 'Nuestro futuro',
    date: 'Capítulo VIII',
    icon: '🤍',
    unlocked: false,
    image: '/Imagens/primeirafoto.jpeg',
    background: '/Imagens/background1.jpg',
    cardBackground: '#1d1d1d'
  },
];

export default function Timeline() {
  const [selectedMemory, setSelectedMemory] = useState(null);

  const handleItemClick = (item) => {
    if (item.unlocked) {
      setSelectedMemory(item);
    }
  };

  return (
    <div className="timeline-container">
      <h3 className="timeline-title">Nuestra Línea del Tiempo</h3>

      <div className="timeline-track">
        {memoryPoints.map((item) => (
          <div
            key={item.id}
            className={`timeline-item ${item.unlocked ? 'unlocked' : 'locked'}`}
            onClick={() => handleItemClick(item)}
          >
            <div className="timeline-node">
              {item.unlocked ? item.icon : '🔒'}
            </div>

            <span className="timeline-label">
              {item.unlocked ? item.label : "???"}
            </span>
          </div>
        ))}
      </div>

      {selectedMemory && (
        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      )}
    </div>
  );
}