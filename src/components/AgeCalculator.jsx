import React, { useState } from "react";

const AgeCalculator = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!day || !month || !year) {
      return setMensagem("Preencha todos os campos.");
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
      return setMensagem("Data inválida.");
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

    setMensagem("Idade: " + anos + "a, " + meses + "m, " + dias + "d");
  };

  return (
    <div className="App">
      <h2>Calculadora de Idade</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Dia" value={day} onChange={(e) => setDay(e.target.value)} />
        <input type="number" placeholder="Mês" value={month} onChange={(e) => setMonth(e.target.value)} />
        <input type="number" placeholder="Ano" value={year} onChange={(e) => setYear(e.target.value)} />
        <button type="submit">Calcular</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
  
};


export default AgeCalculator;
