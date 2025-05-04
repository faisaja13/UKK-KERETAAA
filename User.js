import User from "../models/UserModel.js";
import argon2 from "argon2";

export const addUser = async (req, res) => {
    const { username, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "password dan confirm password tidak cocok" });
    try {
        const existingUser = await User.findOne({
            where: {
                username: username,
            }
        });

        if (!['petugas', 'pelanggan'].includes(role)) {
            return res.status(400).json({ msg: 'Role tidak valid' });
        }

        if (existingUser) return res.status(400).json({ msg: " sudah terdaftar." });
        const hashPassword = await argon2.hash(password);
        await User.create({
            username: username,
            password: hashPassword,
            role: role
        });
        res.json({ msg: "Berhasil menambahkan User!" })
    } catch (error) {
        console.log(error);
    }
}