const jwt = require("jsonwebtoken");

// Vérifie si le token JWT est valide
function verifyToken(req, res, next) {
  // 1. Récupère le token dans les headers (format : "Bearer TOKEN")
  const token = req.headers.authorization?.split(" ")[1];

  // 2. Si pas de token → Erreur 401 (Non autorisé)
  if (!token) {
    return res.status(401).json({ error: "Accès refusé. Token manquant." });
  }

  // 3. Vérifie le token avec la clé secrète (stockée dans .env)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token invalide." }); // Erreur 403 (Interdit)
    }

    // 4. Si OK, ajoute l'ID utilisateur à la requête (pour les routes suivantes)
    req.userId = decoded.userId;
    next(); // Passe au prochain middleware/route
  });
}

module.exports = verifyToken;
