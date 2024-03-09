import bcrypt from 'bcrypt';

//function to hash
export const hashPassword= async(password) => {
    try {
        const saltRounds =10;
        const hashedPassword =await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch(err){
        console.log(err);
    }
};


//function to compare and decrypt
export const comparePassword = async (password,hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);
}
