import bcrypt from 'bcryptjs';

export const hashPassword = async (senha) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(senha, salt);
};

export const isPasswordValid = async (senhaDigitada, senhaHash) => {
    return await bcrypt.compare(senhaDigitada, senhaHash);
};
