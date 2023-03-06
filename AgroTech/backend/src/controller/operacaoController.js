const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const create = async (req, res) => {
    let operacao = await prisma.operacao.create({
        data: req.body
    });

    res.status(200).json(operacao).end();
}

const read = async (req, res) => {
    let operacao = await prisma.operacao.findMany();

    res.status(200).json(operacao).end();
}

const deletar = async (req, res) => {
    let operacao = await prisma.operacao.delete({
        where: {
            id_opeacao: Number(req.params.id_opeacao)
        },
    });

    res.status(200).json(operacao).end();
}

const update = async (req ,res) =>{
    const operacao = await prisma.operacao.update({
        where:{
            id_opeacao:Number(req.params.id_opeacao)
        },
        data:req.body
    })
    res.status(200).json(operacao).end()
}

module.exports = {
    create,
    read,
    deletar,
    update
}