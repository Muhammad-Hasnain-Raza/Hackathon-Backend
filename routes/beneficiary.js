const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const Beneficiary = require("../models/Beneficiary");

router.post("/register", async (req, res) => {
  try {
    const { cnic, name, phone, address, purpose } = req.body;

    const token = `TOKEN-${Date.now()}`;
    const qrCode = await QRCode.toDataURL(token);

    const beneficiary = new Beneficiary({
      cnic,
      name,
      phone,
      address,
      purpose,
      token,
      qrCode,
    });

    await beneficiary.save();
    res.status(201).json({ token, qrCode });
  } catch (err) {
    res.status(500).json({ message: "Error saving beneficiary data" });
  }
});

module.exports = router;
