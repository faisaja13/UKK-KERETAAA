import Petugas from "../models/PetugasModel.js"
import User from "../models/UserModel.js";
import Pelanggan from "../models/PelangganModel.js";


const isUserIdUsed = async (userId) => {
    const pelanggan = await Pelanggan.findOne({ where: { userId } });
    const petugas = await Petugas.findOne({ where: { userId } });
    return pelanggan || petugas; // Jika ada data, berarti sudah digunakan
};

export const addPetugas = async (req, res) => {
    const { name_petugas, alamat, telepon, userId } = req.body;
    try {
        if (await isUserIdUsed(userId)) {
            return res.status(400).json({ msg: "UserId sudah digunakan!" });
        }
        const existingPetugas = await Petugas.findOne({
            where: {
                name_petugas: name_petugas,
                userId: userId,
            }
        });
        if (existingPetugas) return res.status(400).json({ msg: " sudah terdaftar." });
        await Petugas.create({
            name_petugas: name_petugas,
            alamat: alamat,
            telepon: telepon,
            userId: userId
        });
        res.json({ msg: "Berhasil menambahkan Petugas!" })
    } catch (error) {
        console.log(error);
    }
}

// export const addP = async (req, res) => {
//     const { name_petugas, alamat, telepon, userId } = req.body;
//     try{
//     await Petugas.create({
//         name_petugas: name_petugas,
//         alamat: alamat,
//         telepon: telepon,
//         userId: userId
//     });
//     res.json({ msg: "Berhasil menambahkan Petugas!" })
// } catch (error) {
//     console.log(error);
//     }
// ;}

export const getPetugas = async (req, res) => {
    try{
        const petugasList = await Petugas.findAll({
            include: {
                model: User,
                as: "user",
                where: { role: "petugas" },
                attributes: ["id", "username", "role"]
            }
        });
        res.json(petugasList);
    } catch (error){
        res.status(500).json({ msg: error.message});
    }
}


export const updatePetugas = async (req, res) => {
    try {
        const { id } = req.params;
        const {name_petugas} = req.body;
        const {alamat} = req.body;
        const {telepon} = req.body;

        const petugasToUpdate = await Petugas.findOne({
            where: {
                id: id
            }
        });

        if (!petugasToUpdate) {
            return res.status(404).json({ msg: 'Petugas tidak ditemukan' });
        }
        
        await Petugas.update({
            name_petugas: name_petugas,
            alamat: alamat,
            telepon: telepon
        },{
            where: {
                id: id
            }
        });
        res.json({ msg: 'Berhasil mengupdate data Petugas'});
    } catch (error) {
        console.log(error);
        console.error('Error updating Admin:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const deletePetugas = async (req, res) => {
    try {
        const { id } = req.params;
        const petugasToDelete = await Petugas.findOne({ id });

        if (!petugasToDelete) {
            return res.status(404).json({ msg: 'Petugas tidak ditemukan' });
        }

        await Petugas.destroy({
            where: {
                id: id
            }
        });

        res.json({ msg: 'Berhasil menghapus Petugas' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};