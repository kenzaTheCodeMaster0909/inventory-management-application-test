function validateRegister(req, res, next) {
  const { email, password } = req.body;

  // 1. Vérifie que l'email est valide
  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({ error: "Email invalide." });
  }

  // 2. Vérifie que le mot de passe est assez long
  if (password.length < 10) {
    return res
      .status(400)
      .json({ error: "Le mot de passe doit faire au moins 10 caractères." });
  }

  // 3. Si tout est OK, passe à la suite
  next();
}

module.exports = { validateRegister };
