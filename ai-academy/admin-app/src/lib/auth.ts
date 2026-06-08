import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const SECRET = process.env.NEXTAUTH_SECRET || "admin-secret-key-2024";

export async function login(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return null;

  const token = jwt.sign(
    { id: admin.id, email: admin.email, name: admin.name, role: "admin" },
    SECRET,
    { expiresIn: "7d" }
  );

  return { token, user: { id: admin.id, email: admin.email, name: admin.name, role: "admin" } };
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { id: string; email: string; name: string; role: string };
  } catch {
    return null;
  }
}
