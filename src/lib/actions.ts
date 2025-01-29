import db from "./db";
import { executeAction } from "./executeAction"
import { schema } from "./schema";

const signUp = async (formData: FormData) => {
    return executeAction({
        actionFn: async() => {
            const email = formData.get("email");
            const password = formData.get("password");
            const validateData = schema.parse({email, password});
            await db.user.create({
                data: {
                    email: validateData.email.toLocaleLowerCase(),
                    password: validateData.password,
                }
            })
        }
    })
}

export { signUp }