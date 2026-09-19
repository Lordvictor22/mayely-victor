import "./Countdown.css";

function Countdown() {
  const hoje = new Date();
  const hojeZerado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  const reencontro = new Date(2026, 8, 29); // 29 de setembro de 2026 (mês 8 = setembro)

  const diferenca = reencontro - hojeZerado;
  const dias = Math.max(0, Math.round(diferenca / (1000 * 60 * 60 * 24)));

  return (
    <section className="countdown">
      <span>Faltan</span>

      <h2>{dias} {dias === 1 ? 'día' : 'días'}</h2>

      <p>para volver a abrazarte.</p>
    </section>
  );
}

export default Countdown;