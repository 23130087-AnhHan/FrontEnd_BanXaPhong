import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <>
      <Header cartCount={2} />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  )
}
