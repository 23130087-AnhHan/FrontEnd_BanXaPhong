import AuthLeftPanel from '../../components/AuthLeftPanel'
import RegisterForm from './components/RegisterForm'
import '../../styles/AuthPage.css'

export default function RegisterPage() {
    return (
        <div className="auth-layout">
            <AuthLeftPanel />
            <div className="auth-form-side">
                <RegisterForm />
            </div>
        </div>
    )
}
