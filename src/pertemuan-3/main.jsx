import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import UserForm from "./UserForm";
import './tailwind.css';
import HitungGajiForm from "./HitungGajiForm";
import Apotek from "./apotek";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <TailwindCSS/>
            <UserForm/>
            <HitungGajiForm/>
            <Apotek/>
            
        </div>
    )
