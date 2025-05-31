const { createUser, getUserByEmail } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// registration //
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Extraction dans la fonction

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, email, hashedPassword);
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.created_at,
    };
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: userResponse,
    });
  } catch (err) {
    res.status(500).json({
      error: "Erreur lors de l'inscription",
      details: err.message,
    });
  }
};
//login //
exports.login = async (req, res) => {
  // cherche utilisateur par email
  try {
    const { email, password } = req.body; // Extraction dans la fonction
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: " ou mot de passe incorrect",
      });
    }
    // comparer les mots de passes
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }
    // cree un token valabe 1h

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "connexion réussie",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
