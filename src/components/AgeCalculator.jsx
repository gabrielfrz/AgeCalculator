import React, { useState } from "react";

const AgeCalculator = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [exibirResultado, setExibirResultado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!day || !month || !year) {
      setMensagem("Preencha todos os campos.");
      setExibirResultado(false);
      return;
    }

    const dia = parseInt(day);
    const mes = parseInt(month);
    const ano = parseInt(year);
    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia);

    if (
      dia < 1 || dia > 31 ||
      mes < 1 || mes > 12 ||
      nascimento.getDate() !== dia ||
      nascimento.getMonth() + 1 !== mes ||
      nascimento.getFullYear() !== ano ||
      nascimento > hoje
    ) {
      setMensagem("Data inválida.");
      setExibirResultado(false);
      return;
    }

    let anos = hoje.getFullYear() - ano;
    let meses = hoje.getMonth() - (mes - 1);
    let dias = hoje.getDate() - dia;

    if (dias < 0) {
      meses -= 1;
      dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    }

    if (meses < 0) {
      anos -= 1;
      meses += 12;
    }

    setMensagem({ anos, meses, dias });
    setExibirResultado(true);
  };

  const handleReset = () => {
    setDay("");
    setMonth("");
    setYear("");
    setMensagem(null);
    setExibirResultado(false);
  };

  return (
    <div className="App">
      <h2>Calculadora de Idade</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Dia" value={day} onChange={(e) => setDay(e.target.value)} min="1" max="31" />
        <input type="number" placeholder="Mês" value={month} onChange={(e) => setMonth(e.target.value)} min="1" max="12" />
        <input type="number" placeholder="Ano" value={year} onChange={(e) => setYear(e.target.value)} min="1" />
        <button type="submit">Calcular</button>
      </form>

      {mensagem && exibirResultado && (
        <div className="resultado-container">
          <div className="resultado">
            <div><strong>{mensagem.anos}</strong> Years</div>
            <div><strong>{mensagem.meses}</strong> Months</div>
            <div><strong>{mensagem.dias}</strong> Days</div>
          </div>
          <button className="reset-button" onClick={handleReset}>Calcular novamente</button>
        </div>
      )}

      {typeof mensagem === "string" && <p>{mensagem}</p>}
    </div>
  );
};

export default AgeCalculator;
