import { Argon2id } from "oslo/password";
import { useValidatedBody, z } from "h3-zod";

const validatedSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export default defineEventHandler(async (event) => {
  const { firstName, lastName, email, password } = await useValidatedBody(
    event,
    validatedSchema
  );
  const db = useDrizzle();
  const argon2id = new Argon2id();

  // Attempt to find user by email
  const users = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, email));

  if (users.length > 0) {
    throw createError({
      statusCode: 401,
      statusMessage: "User with this email already exists",
    });
  }

  // hash password
  const hashedPassword = await argon2id.hash(password);

  const user = await db
    .insert(tables.users)
    .values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })
    .returning({ id: tables.users.id });

  return user;
});
