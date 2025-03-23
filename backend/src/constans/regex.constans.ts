export const regexConstant = {
  USERNAME: /^[a-zA-Z][a-zA-Z0-9._]{2,19}$/,
  EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
  CONTENT: /^[\p{L}\p{N}\p{P}\p{Zs}]{1,1000}$/u,
};
