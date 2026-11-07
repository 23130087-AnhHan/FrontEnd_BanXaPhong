import AuthLeftPanel from '../../components/AuthLeftPanel'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import '../../styles/AuthPage.css'

export default function ForgotPasswordPage() {
    return (
        <div className="auth-layout">
            <AuthLeftPanel />
            <div className="auth-form-side">
                <ForgotPasswordForm />
            </div>
        </div>
    )
}

