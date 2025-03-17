import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Pour la navigation
import "../css/Login.css";
import axios from "axios";

function Login({ setUser }) {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Hook pour la navigation


  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://megamart-cm02.onrender.com/login/', {
        username,
        password,
      });
  
      // Récupérer l'utilisateur de la réponse
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user); 
      navigate("/home"); 
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      alert('Erreur de connexion');
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://megamart-cm02.onrender.com/register/', {
        username,
        email,
        password,
      });
  
      // Récupérer l'utilisateur de la réponse
      const user = response.data.user;
  
      setUser(user); // Mettre à jour l'utilisateur dans l'état global
      navigate("/home");
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert('Erreur d\'inscription');
    }
  };

  return (
    <div className="main-container">
<div className="login-body">
<div className={`container ${isActive ? "active" : ""}`}>
      {/* Formulaire de connexion */}
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Connexion</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">Se connecter</button>
        </form>
      </div>

      {/* Formulaire d'inscription */}
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Inscription</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">S'inscrire</button>
        </form>
      </div>

      {/* Boîte pour changer entre connexion et inscription */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1 style={{fontSize:26}}>Bon retour sur MegaMart !</h1>
          <p>Vous n'avez pas de compte ?</p>
          <button className="btn register-btn" onClick={() => setIsActive(true)}>S'inscrire</button>
        </div>

        <div className="toggle-panel toggle-right">
          <h1 style={{fontSize:26}}>Bienvenue sur MegaMart!</h1>
          <p>Vous avez déjà un compte ?</p>
          <button className="btn login-btn" onClick={() => setIsActive(false)}>Se connecter</button>
        </div>
      </div>
    </div>
    </div>
    </div>

    
    
  );
}

export default Login;
