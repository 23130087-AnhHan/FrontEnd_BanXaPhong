import AuthLeftPanel from '../components/AuthLeftPanel'
import '../styles/LoginPage.css'

export default function LoginPage() {
    return (
        <div className="auth-layout">
            <AuthLeftPanel />
            <div className="auth-form-side">
            </div>
        </div>
    )
}

