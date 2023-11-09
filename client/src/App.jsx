import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Records from "./pages/Records.jsx";
import Body from "./pages/Body.jsx";
import Exercises from "./pages/Exercises.jsx";
import History from "./pages/History.jsx";
import Layout from "./components/Layout.jsx";
import BodyPart from "./components/body/BodyPart.jsx";
import {AuthProvider} from "./context/authProvider.jsx";
import Missing from "./pages/Missing.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import PersistLogin from "./components/PersistLogin.jsx";
import Profile from "./pages/Profile.jsx";
import WorkoutPlans from "./pages/WorkoutPlans.jsx";
import Goals from "./pages/Goals.jsx";
import AddWorkoutRoutine from "./pages/AddWorkoutRoutine.jsx";
import Workout from "./pages/Workout.jsx";
import WorkoutDetails from "./pages/WorkoutDetails.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<PersistLogin/>}>
            <Route path='/' element={<Layout/>}>
                <Route index element={<History/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='exercises' element={<Exercises />} />
                <Route element={<RequireAuth/>}>
                    <Route path='records' element={<Records />} />
                    <Route path='goals' element={<Goals />} />
                    <Route path='body' element={<Body/>}>
                        <Route index element={<BodyPart/>}/>
                        <Route path=':bodyPart' element={<BodyPart/>}/>
                    </Route>
                    <Route path='addRoutine' element={<AddWorkoutRoutine/>}/>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='workoutPlans' element={<WorkoutPlans />} />
                    <Route path='workout' element={<Workout />} />
                    <Route path='workout/details' element={<WorkoutDetails />} />
                </Route>
                <Route path='*' element={<Missing/>}/>
            </Route>
        </Route>
    )
)

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    )
}

export default App
