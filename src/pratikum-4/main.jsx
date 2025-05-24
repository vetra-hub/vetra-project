import { createRoot } from "react-dom/client";
import './tailwind.css';
import ObatListAdmin from "./ObatListAdmin";

createRoot(document.getElementById("root"))
    .render(
        <div>
           <ObatListAdmin/> 
        </div>
    )