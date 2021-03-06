import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    resetField,
  } = useForm<LoginForm>({ mode: "onChange" });

  const onValid = (data: LoginForm) => {
    console.log(`VALID!!`);
    setError("username", {
      message: "YOU STILL SEE THIS ERROR BY LOGIC EVEN AFTER VALIDATION!",
    });
    resetField("password");
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  setValue("username", "Junwoo");

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
        className={`${Boolean(errors.username) ? "outline-red-500" : ""}`}
      />
      {errors.username?.message}
      <input
        {...register("email", {
          required: "EMAIL IS REQUIRED!",
          validate: {
            gmailRestrict: (value) =>
              !value.includes("@gmail.com") || "GMAIL IS NOW ALLOWED!",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email) ? "outline-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "PASSWORD IS REQUIRED!" })}
        type="password"
        placeholder="Password"
        className={`${Boolean(errors.password) ? "outline-red-500" : ""}`}
      />
      {errors.password?.message}
      <input type="submit" value="Create Account" />
    </form>
  );
}
