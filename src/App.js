import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const notifySuccess = () => {
    alert('Email enviado com sucesso!')
  }

  const sendEmail = async () => {
    setIsLoading(true);
    await axios
      .post("http://localhost:3001/send-email", {
        from,
        to,
        subject,
        text,
      })
      .then((r) => {
        setIsLoading(false);

        if (r.data.error) {
          setErrorMessage(r.data.errorMessage);
          setError(true);
        return
        }
        notifySuccess()
      })
      .catch((e) => {
        setIsLoading(false);

        setErrorMessage("Erro interno, tente novamente mais tarde...");
        setError(true);
      });
  };

  const validAll = () => {
    if (!from) {
      setErrorMessage("Seu nome é obrigatório");
      return true;
    }

    if (!to) {
      setErrorMessage("Email é obrigatório");
      return true;
    }

    return false;
  };

  const validate = () => {
    let hasError = false;

    hasError = validAll();
    setError(hasError);

    return hasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) return;

    sendEmail();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="from">Seu nome</label>
        <input
          id="from"
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="to">E-mail</label>
        <input
          id="to"
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="subject">Assunto</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="text">Texto</label>
        <input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {isLoading && <span>Enviando...</span>}
      {error && <span>{errorMessage}</span>}
      <div>
        <button type="submit">Enviar email</button>
      </div>
    </form>
  );
};

export default App;
