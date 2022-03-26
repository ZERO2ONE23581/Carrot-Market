import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const onValid = (data: LoginForm) => {
    console.log(`VALID!!`);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register("username", {
          required: "USERNAME IS REQUIRED!",
          minLength: {
            value: 5,
            message: "USERNAME SHOULD BE LONGER THAN 5!",
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", { required: "EMAIL IS REQUIRED!" })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", { required: "PASSWORD IS REQUIRED!" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
