-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Motorista` (
    `id_motorista` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(191) NOT NULL,
    `cnh` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Motorista_cpf_key`(`cpf`),
    UNIQUE INDEX `Motorista_cnh_key`(`cnh`),
    PRIMARY KEY (`id_motorista`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Veiculos` (
    `id_veiculo` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `disponivel` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Veiculos_placa_key`(`placa`),
    PRIMARY KEY (`id_veiculo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Manutencao` (
    `id_manutencao` INTEGER NOT NULL AUTO_INCREMENT,
    `id_veiculo` INTEGER NOT NULL,
    `data_inicio` VARCHAR(191) NOT NULL,
    `data_fim` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_manutencao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operacao` (
    `id_opeacao` INTEGER NOT NULL AUTO_INCREMENT,
    `id_motorista` INTEGER NOT NULL,
    `id_veiculo` INTEGER NOT NULL,
    `data_saida` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_retorno` DATETIME(3) NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_opeacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Manutencao` ADD CONSTRAINT `Manutencao_id_veiculo_fkey` FOREIGN KEY (`id_veiculo`) REFERENCES `Veiculos`(`id_veiculo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_id_motorista_fkey` FOREIGN KEY (`id_motorista`) REFERENCES `Motorista`(`id_motorista`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_id_veiculo_fkey` FOREIGN KEY (`id_veiculo`) REFERENCES `Veiculos`(`id_veiculo`) ON DELETE RESTRICT ON UPDATE CASCADE;
