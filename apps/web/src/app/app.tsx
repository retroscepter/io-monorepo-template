import { Suspense, lazy } from 'react'

const Game = lazy(() => import('./game/game'))

function App() {
    return (
        <Suspense>
            <Game />
        </Suspense>
    )
}

export default App
