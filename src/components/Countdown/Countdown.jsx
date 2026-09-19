import "./Countdown.css";

function Countdown() {
  const hoje = new Date();

  const reencontro = new Date("2026-10-01");

  const diferenca = reencontro - hoje;

  const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

  return (
    <section className="countdown">
      <span>Faltan</span>

      <h2>{dias} días</h2>

      <p>para volver a abrazarte.</p>
    </section>
  );
}

export default Countdown;