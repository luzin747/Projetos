const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const create = async (req, res) => {
    let veiculos = await prisma.veiculos.create({
        data: req.body
    });

    res.status(200).json(veiculos).end();
}

const read = async (req, res) => {
    let veiculos = await prisma.veiculos.findMany();

    res.status(200).json(veiculos).end();
}

const deletar = async (req, res) => {
    let veiculos = await prisma.veiculos.delete({
        where: {
            id_veiculo: Number(req.params.id_veiculo)
        },
    });

    res.status(200).json(veiculos).end();
}

const update = async (req ,res) =>{
    const veiculos = await prisma.veiculos.update({
        where:{
            id_veiculo:Number(req.params.id_veiculo)
        },
        data:req.body
    })
    res.status(200).json(veiculos).end()
}

module.exports = {
    create,
    read,
    deletar,
    update
}