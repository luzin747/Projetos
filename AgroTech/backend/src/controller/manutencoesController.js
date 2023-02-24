const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const create = async (req, res) => {
    let manutencao = await prisma.manutencao.create({
        data: req.body
    });

    res.status(200).json(manutencao).end();
}

const read = async (req, res) => {
    let manutencao = await prisma.manutencao.findMany();

    res.status(200).json(manutencao).end();
}

const deletar = async (req, res) => {
    let manutencao = await prisma.manutencao.delete({
        where: {
            id_manutencao: Number(req.params.id_manutencao)
        },
    });

    res.status(200).json(manutencao).end();
}

const update = async (req ,res) =>{
    const manutencao = await prisma.manutencao.update({
        where:{
            id_manutencao:Number(req.params.id_manutencao)
        },
        data:req.body
    })
    res.status(200).json(manutencao).end()
}

module.exports = {
    create,
    read,
    deletar,
    update
}