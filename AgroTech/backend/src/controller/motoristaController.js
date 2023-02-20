const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const create = async (req, res) => {
    let motorista = await prisma.motorista.create({
        data: req.body
    });

    res.status(200).json(motorista).end();
}

const read = async (req, res) => {
    let motorista = await prisma.motorista.findMany();

    res.status(200).json(motorista).end();
}

const deletar = async (req, res) => {
    let motorista = await prisma.motorista.delete({
        where: {
            id_motorista: Number(req.params.id_motorista)
        },
    });

    res.status(200).json(motorista).end();
}

const update = async (req ,res) =>{
    const motorista = await prisma.motorista.update({
        where:{
            id_motorista:Number(req.params.id_motorista)
        },
        data:req.body
    })
    res.status(200).json(motorista).end()
}

module.exports = {
    create,
    read,
    deletar,
    update
}