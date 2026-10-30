import AuthLeftPanel from '../../components/AuthLeftPanel'
import LoginForm from './components/LoginForm'
import '../../styles/AuthPage.css'

export default function LoginPage() {
    return (
        <div className="auth-layout">
            <AuthLeftPanel />
            <div className="auth-form-side">
                <LoginForm />
            </div>
        </div>
    )
}
