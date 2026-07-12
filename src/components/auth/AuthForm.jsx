import { useState } from "react";

function AuthForm({ login, register, isAuthLoading, authError }) {
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isLoginMode = mode === "login";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || password.length < 6) {
            return;
        }

        const credentials = {
            email: email.trim(),
            password,
        };

        if (isLoginMode) {
            await login(credentials);
        } else {
            await register(credentials);
        }
    };

    return (
        <section className="auth-card">
            <div className="auth-header">
                <h2>{isLoginMode ? "Login" : "Create account"}</h2>
                <p>
                    {isLoginMode
                        ? "Login to manage your personal tasks."
                        : "Create an account to start using Focus Todo."}
                </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                {authError && <p className="error-message">{authError}</p>}

                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isAuthLoading || !email.trim() || password.length < 6}
                >
                    {isAuthLoading
                        ? "Please wait..."
                        : isLoginMode
                            ? "Login"
                            : "Register"}
                </button>
            </form>

            <div className="auth-switch">
                <span>
                    {isLoginMode
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </span>

                <button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    onClick={() => setMode(isLoginMode ? "register" : "login")}
                >
                    {isLoginMode ? "Register" : "Login"}
                </button>
            </div>
        </section>
    );
}

export default AuthForm;