import { FormEvent, useState } from "react"
import { useAuthSession } from "./AuthSessionContext"
import { Navigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
import styles from "../utils/utils.module.css"

export const Auth = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const { session } = useAuthSession()

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email })
            if (error) throw error
            alert("Check your email for the login link")
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    if (session) {
        return <Navigate to="/" />
    }

    return (
        <div
         className={styles.centeredFlex}
         >
            <div>
                <h1>TowerNote</h1>
                <p>Sign in via link with your email below</p>
                {loading ? ("Sending link...") : (
                    <form onSubmit={handleLogin}>
                        <label>Email: </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            placeholder="Your email"
                        />
                        <button>
                            Send email link
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}