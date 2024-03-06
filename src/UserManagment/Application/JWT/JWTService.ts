import jwt from 'jsonwebtoken';

export class JWTService {
    static generateToken(id:string, name:string): string | null {
        const payload = { userId: id, name: name };
        return jwt.sign(payload, 'miClaveSecretaSuperSegura123!$'!, { expiresIn: '1h' });
    }

    static verifyToken(token: string): jwt.JwtPayload {
        try {
            return jwt.verify(token, 'miClaveSecretaSuperSegura123!$'!) as jwt.JwtPayload;
        } catch (error) {
            throw new Error('Token inválido o expirado');
        }
    }
}