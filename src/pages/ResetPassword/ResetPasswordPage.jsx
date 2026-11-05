import AuthLeftPanel from '../../components/AuthLeftPanel'
import ResetPasswordForm from './components/ResetPasswordForm'
import '../../styles/AuthPage.css'

export default function ResetPasswordPage() {
    return (
        <div className="auth-layout">
            <AuthLeftPanel />
            <div className="auth-form-side">
                <ResetPasswordForm />
            </div>
        </div>
    )
}

