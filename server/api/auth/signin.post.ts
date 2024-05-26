import { Argon2id } from "oslo/password";
import { useValidatedBody, z } from "h3-zod";

const validatedSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await useValidatedBody(event, validatedSchema);
  const db = useDrizzle();
  const argon2id = new Argon2id();

  // Attempt to find user by email
  const users = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, email));

  if (users.length === 0) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  const user = users[0];

  // verify password
  const validPassword = await argon2id.verify(user.password, password);
  if (!validPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  // create new user object without password
  const { password: _, ...userWithoutPassword } = user;

  await setUserSession(event, { user: userWithoutPassword });

  return userWithoutPassword;
});
